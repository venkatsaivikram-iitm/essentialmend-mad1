from database.models import User, ProfessionalRequest
from server.utils.common_utils import generateID
import os
from dotenv import load_dotenv
import jwt
import datetime


load_dotenv()
JWT_SECRET = os.getenv("JWT_SECRET")
ACCESS_TOKEN_EXPIRATION = datetime.timedelta(minutes=15)
REFRESH_TOKEN_EXPIRATION = datetime.timedelta(days=7) 

def generateTokens(userId):
    # access token
    access_token = jwt.encode(
        {
            'uid': userId,
            'exp': datetime.datetime.now(datetime.UTC) + ACCESS_TOKEN_EXPIRATION
        },
        JWT_SECRET,
        algorithm="HS256"
    )
    
    # refresh token
    refresh_token = jwt.encode(
        {
            'uid': userId,
            'exp': datetime.datetime.now(datetime.UTC) + REFRESH_TOKEN_EXPIRATION
        },
        JWT_SECRET,
        algorithm="HS256"
    )
    
    return {
        "accessToken": access_token,
        "refreshToken": refresh_token
    }

def decodeToken(token):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        return {
            "isValid": True,
            "payload": payload
        }
    except jwt.ExpiredSignatureError:
        return {
            "isValid": False,
            "isSignatureExpired": True
        }
    except jwt.InvalidTokenError:
        return {
            "isValid": False,
            "isInvalidToken": True
        }


def isAccessTokenValid(accessToken):
    accessTokenInfo = decodeToken(accessToken)
    return bool(accessTokenInfo["isValid"])


def generateAccessToken(refreshToken):
    refreshTokenInfo = decodeToken(refreshToken)
    if (refreshTokenInfo["isValid"] and isValidUser(refreshTokenInfo["payload"]["uid"])):
        accessToken = jwt.encode(
            {
                'uid': refreshTokenInfo["payload"]["uid"],
                'exp': datetime.datetime.now(datetime.UTC) + ACCESS_TOKEN_EXPIRATION
            },
            JWT_SECRET,
            algorithm="HS256"
        )
        return {
            "isValid": True,
            "accessToken": accessToken,
            "uid": refreshTokenInfo["payload"]["uid"]
        }
    else:
        return {
            "isValid": False
        }
    

def isValidRequest (tokens = {}):
    validationObj = {
        "isValid": False,
        "cookies": [
            {
                "key": "emat",
                "value": "",
                "maxAge": -1
            },
            {
                "key": "emrt",
                "value": "",
                "maxAge": -1
            }
        ]
    }

    if (not tokens["emat"] or not tokens["emrt"]):
        return validationObj

    accessTokenInfo = decodeToken(tokens["emat"])
    if (accessTokenInfo["isValid"]):
        validationObj["isValid"] = bool(isValidUser(accessTokenInfo["payload"]["uid"]))
        validationObj["uid"] = accessTokenInfo["payload"]["uid"]
        validationObj["cookies"] = []
    elif (accessTokenInfo["isSignatureExpired"]):
        newAccessTokenInfo = generateAccessToken(tokens["emrt"])
        _isValidUser = bool(isValidUser(newAccessTokenInfo["uid"]))
        validationObj["isValid"] = _isValidUser
        validationObj["uid"] = newAccessTokenInfo["uid"]
        if (_isValidUser):
            validationObj["cookies"] = [
                {
                    "key": "emat",
                    "value": newAccessTokenInfo["accessToken"],
                    "maxAge": (24*60*60)
                }
            ]
    
    return validationObj


def generateUID ():
    UID = generateID()
    if (User.query.filter(User.uid == UID).first()):
        return generateUID()
    return UID

def isValidUser (UID):
    user = User.query.filter(User.uid == UID).first()
    return bool(user)

def isAdmin (UID):
    admin = User.query.filter(User.uid == UID, User.role == "admin").first()
    return bool(admin)

def isProfessional (UID):
    professional = User.query.filter(User.uid == UID, User.role == "professional").first()
    return bool(professional)

def isUser (UID):
    user = User.query.filter(User.uid == UID, User.role == "user").first()
    return bool(user)