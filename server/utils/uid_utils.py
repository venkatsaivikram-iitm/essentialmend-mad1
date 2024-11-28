from database.models import User, ServiceRequest, Review, Service
from server.utils.common_utils import generateID


def generateUID ():
    uid = generateID()
    if (User.query.filter(User.uid == uid).first()):
        return generateUID()
    return uid

def generateReqID ():
    reqid = generateID()
    if (ServiceRequest.query.filter(ServiceRequest.reqid == reqid).first()):
        return generateUID()
    return reqid

def generateRevID ():
    revid = generateID()
    if (Review.query.filter(Review.revid == revid).first()):
        return generateUID()
    return revid

def generateSID ():
    sid = generateID()
    if (Service.query.filter(Service.sid == sid).first()):
        return generateSID()
    return sid