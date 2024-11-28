from flask import request, jsonify, g
from flask_restful import Resource
from database.database import database
from database.models import User, Professional, ProfessionalRequest, Service, ServiceRequest, Review
from server.utils.authentication_utils import generateTokens
from server.utils.uid_utils import generateUID, generateReqID, generateRevID, generateSID
from datetime import datetime
import base64
import os


SUCCESS, FAILURE = "success", "failure"
JSON = "application/json"
USER, PROFESSIONAL = "user", "professional"
ACTIVE, PENDING = "active", "pending"
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))


class SignIn(Resource):
    def post(self):
        response = None
        try:
            email = request.form.get("email")
            password = request.form.get("password")
            if (email and password):
                user = User.query.filter(User.email == email).first()
                if (user and user.password == password):
                    tokens = generateTokens(user.uid)
                    response = jsonify({
                        "result": SUCCESS,
                        "data": {
                            "message": "Sign In successful - Signing In",
                            "uid": user.uid
                        }
                    })
                    response.status_code = 200
                    response.set_cookie(key="emat", value=tokens["accessToken"], max_age=(24*60*60))
                    response.set_cookie(key="emrt", value=tokens["refreshToken"], max_age=(24*60*60))
                elif (user and user.password != password):
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Sign In failed - Incorrect password",
                        }
                    })
                    response.status_code = 200
                else:
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Sign In failed - User not found",
                        }
                    })
                    response.status_code = 200
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Sign In failed - Invalid credentials",
                    }
                })
        except:
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Sign-in failed - Internal Server Error",
                }
            })
            response.status_code = 500
        finally:
            return response
        

class SignUp(Resource):
    def post(self):
        response = None
        try:
            name = request.form.get("name")
            email = request.form.get("email")
            password = request.form.get("password")
            userType = request.form.get("userType")
            service = request.form.get("service")
            experience = request.form.get("experience")
            location = request.form.get("location")
            pincode = request.form.get("pincode")
            duration = request.form.get("duration")
            price = request.form.get("price")
            
            if (userType == PROFESSIONAL):
                experience = float(experience)
                price = float(price)
                duration = float(duration)
            description = request.form.get("description")

            userWithSameEmail = User.query.filter(User.email == email).first()

            if (userWithSameEmail):
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Sign Up failed - Email already exist",
                    }
                })
                response.status_code = 200
            elif (userType == USER and name and email and password and location and pincode):
                uid = generateUID()
                user = User(
                    uid=uid,
                    name=name,
                    email=email,
                    password=password,
                    role=userType,
                    location=location,
                    pincode=pincode,
                    status=ACTIVE,
                    created_at=str(int(datetime.now().timestamp() * 1000))
                )
                database.session.add(user)

                tokens = generateTokens(uid)
                response = jsonify({
                    "result": SUCCESS,
                    "data": {
                        "message": "Sign Up successful - User account created",
                        "uid": uid
                    }
                })
                response.status_code = 200
                response.set_cookie(key="emat", value=tokens["accessToken"], max_age=(24*60*60))
                response.set_cookie(key="emrt", value=tokens["refreshToken"], max_age=(24*60*60))
            elif (userType == PROFESSIONAL and name and email and password and service and location and pincode and experience >= 0 and description and duration > 0 and price > 0):
                uid = generateUID()
                user = User(
                    uid=uid,
                    name=name,
                    email=email,
                    password=password,
                    role=userType,
                    status=ACTIVE,
                    location=location,
                    pincode=pincode,
                    created_at=str(int(datetime.now().timestamp() * 1000))
                )
                _service = Service.query.filter(Service.sid == service).first()
                professional = Professional(
                    uid=uid,
                    sid=_service.sid,
                    description=description,
                    experience=experience,
                    rating=0,
                    duration=duration,
                    price=price
                )
                professionalRequest = ProfessionalRequest(
                    uid=uid,
                    status=PENDING,
                    status_info="Professional request under verification",
                    created_at=str(int(datetime.now().timestamp() * 1000)),
                    closed_at=""
                )

                database.session.add(user)
                database.session.add(professional)
                database.session.add(professionalRequest)

                tokens = generateTokens(uid)
                response = jsonify({
                    "result": SUCCESS,
                    "data": {
                        "message": "Sign Up successful - Professional Account created",
                        "uid": user.uid
                    }
                })
                response.status_code = 200
                response.set_cookie(key="emat", value=tokens["accessToken"], max_age=(24*60*60))
                response.set_cookie(key="emrt", value=tokens["refreshToken"], max_age=(24*60*60))
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Sign-up failed - Invalid credentials",
                    }
                })
                response.status_code = 401
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Sign-up failed - Internal Server Error",
                }
            })
            response.status_code = 500
        finally:
            database.session.commit()
            return response
        
    
class ServiceRequestApi(Resource):
    def post(self):
        response = None
        try:
            if (g.config["authorized"]):
                cid = request.form.get("cid")
                pid = request.form.get("pid")
                sid = request.form.get("sid")
                reqid = request.form.get("reqid")
                mode = request.form.get("mode")
                if (mode):
                    if (mode == "request"):
                        if (g.config["userInfo"]["isUser"]):
                            professional = Professional.query.filter(Professional.uid == pid, Professional.sid == sid).first()
                            service = Service.query.filter(Service.sid == sid).first()
                            
                            if (professional and service):
                                reqid = generateReqID()
                                serviceRequest = ServiceRequest(
                                    reqid=reqid,
                                    cid=g.config["userInfo"]["uid"],
                                    pid=pid,
                                    sid=sid,
                                    status="pending",
                                    status_info="Service request is waiting for professional approval",
                                    created_at=str(int(datetime.now().timestamp() * 1000)),
                                    closed_at=""
                                )
                                database.session.add(serviceRequest)
                                response = jsonify({
                                    "result": SUCCESS,
                                    "data": {
                                        "message": "Service request raised successfully",
                                        "serviceRequest": {
                                            "reqid": serviceRequest.reqid,
                                            "cid": serviceRequest.cid,
                                            "pid": serviceRequest.pid,
                                            "sid": serviceRequest.sid,
                                            "status": serviceRequest.status,
                                            "statusInfo": serviceRequest.status_info,
                                            "createdAt": serviceRequest.created_at,
                                            "closedAt": serviceRequest.closed_at,
                                        }
                                    }
                                })
                                response.status_code = 200
                            elif (not service):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not professional):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Professional not found",
                                    }
                                })
                                response.status_code = 200
                        else:
                            response = jsonify({
                                "result": FAILURE,
                                "data": {
                                    "message": "Service request failed - Only user can request a service",
                                }
                            })
                            response.status_code = 200
                    elif (mode == "accept"):
                        if (g.config["userInfo"]["isProfessional"]):
                            serviceRequest = ServiceRequest.query.filter(ServiceRequest.reqid == reqid, ServiceRequest.pid == pid, ServiceRequest.cid == cid, ServiceRequest.sid == sid).first()
                            user = User.query.filter(User.uid == cid).first()
                            service = Service.query.filter(Service.sid == sid).first()
                            if (serviceRequest and user and service):
                                serviceRequest.status = "inprogress"
                                serviceRequest.status_info = "Service request is inprogress"
                                response = jsonify({
                                    "result": SUCCESS,
                                    "data": {
                                        "message": "Service request accepted successfully",
                                        "data": {
                                            "reqid": serviceRequest.reqid,
                                            "cid": serviceRequest.cid,
                                            "pid": serviceRequest.pid,
                                            "sid": serviceRequest.sid,
                                            "status": serviceRequest.status,
                                            "statusInfo": serviceRequest.status_info,
                                            "createdAt": serviceRequest.created_at,
                                            "closedAt": serviceRequest.closed_at,
                                        }
                                    }
                                })
                                response.status_code = 200
                            elif (not serviceRequest):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service request not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not user):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - User who requested the service not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not service):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service not found",
                                    }
                                })
                                response.status_code = 200
                        else:
                            response = jsonify({
                                "result": FAILURE,
                                "data": {
                                    "message": "Service request failed - Only Professional can accept a service request",
                                }
                            })
                            response.status_code = 200
                    elif (mode == "cancel" and reqid and pid and sid):
                        if (g.config["userInfo"]["isProfessional"] or g.config["userInfo"]["isUser"]):
                            serviceRequest = ServiceRequest.query.filter(ServiceRequest.reqid == reqid, ServiceRequest.pid == pid, ServiceRequest.cid == cid, ServiceRequest.sid == sid).first()
                            user = User.query.filter(User.uid == cid).first()
                            service = Service.query.filter(Service.sid == sid).first()
                            professional = Professional.query.filter(Professional.uid == pid, Professional.sid == sid).first()
                            if (serviceRequest and user and service and professional):
                                serviceRequest.status = "cancelled"
                                serviceRequest.status_info = "Service request is cancelled"
                                serviceRequest.closed_at = str(int(datetime.now().timestamp() * 1000))
                                database.session.commit()
                                response = jsonify({
                                    "result": SUCCESS,
                                    "data": {
                                        "message": "Service request cancelled",
                                        "data": {
                                            "reqid": serviceRequest.reqid,
                                            "cid": serviceRequest.cid,
                                            "pid": serviceRequest.pid,
                                            "sid": serviceRequest.sid,
                                            "status": serviceRequest.status,
                                            "statusInfo": serviceRequest.status_info,
                                            "createdAt": serviceRequest.created_at,
                                            "closedAt": serviceRequest.closed_at,
                                        }
                                    }
                                })
                                response.status_code = 200
                            elif (not serviceRequest):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service request not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not user):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - User who requested the service not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not service):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not professional):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Professional not found",
                                    }
                                })
                                response.status_code = 200
                        else:
                            response = jsonify({
                                "result": FAILURE,
                                "data": {
                                    "message": "Service request failed - Only user or professional can cancel a service request",
                                }
                            })
                            response.status_code = 200
                    elif (mode == "complete" and reqid and pid and sid):
                        if (g.config["userInfo"]["isProfessional"] or g.config["userInfo"]["isUser"]):
                            serviceRequest = ServiceRequest.query.filter(ServiceRequest.reqid == reqid, ServiceRequest.pid == pid, ServiceRequest.cid == cid, ServiceRequest.sid == sid).first()
                            user = User.query.filter(User.uid == cid).first()
                            service = Service.query.filter(Service.sid == sid).first()
                            professional = Professional.query.filter(Professional.uid == pid, Professional.sid == sid).first()
                            if (serviceRequest and user and service and professional):
                                serviceRequest.status = "completed"
                                serviceRequest.status_info = "Service request is completed"
                                serviceRequest.closed_at = str(int(datetime.now().timestamp() * 1000))
                                database.session.commit()
                                response = jsonify({
                                    "result": SUCCESS,
                                    "data": {
                                        "message": "Service request completed",
                                        "data": {
                                            "reqid": serviceRequest.reqid,
                                            "cid": serviceRequest.cid,
                                            "pid": serviceRequest.pid,
                                            "sid": serviceRequest.sid,
                                            "status": serviceRequest.status,
                                            "statusInfo": serviceRequest.status_info,
                                            "createdAt": serviceRequest.created_at,
                                            "closedAt": serviceRequest.closed_at,
                                        }
                                    }
                                })
                                response.status_code = 200
                            elif (not serviceRequest):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service request not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not user):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - User who requested the service not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not service):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Service not found",
                                    }
                                })
                                response.status_code = 200
                            elif (not professional):
                                response = jsonify({
                                    "result": FAILURE,
                                    "data": {
                                        "message": "Service request failed - Professional not found",
                                    }
                                })
                                response.status_code = 200
                        else:
                            response = jsonify({
                                "result": FAILURE,
                                "data": {
                                    "message": "Service request failed - Only user or professional can complete a service request",
                                }
                            })
                            response.status_code = 200
                else:
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Service request failed - Mode is missing",
                        }
                    })
                    response.status_code = 200
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Service request failed - UnAuthenticated request",
                    }
                })
                response.status_code = 200
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Service request failed - Internal Server Error",
                }
            })
            response.status_code = 500
        finally:
            database.session.commit()
            return response
        

class ReviewApi(Resource):
    def post(self):
        response = None
        try:
            reviewerUid = request.form.get("reviewerUid")
            revieweeUid = request.form.get("revieweeUid")
            reviewText = request.form.get("reviewText")
            reviewType = request.form.get("reviewType")
            reviewRating = request.form.get("reviewRating")
            reqid = request.form.get("reqid")
            if (reviewerUid and revieweeUid and reviewText and reviewType and reqid):
                reviewer = User.query.filter(User.uid == reviewerUid).first()
                reviewee = User.query.filter(User.uid == revieweeUid).first()
                serviceRequest = ServiceRequest.query.filter(ServiceRequest.reqid == reqid).first()
                if (reviewer and reviewee and serviceRequest):
                    revid = generateRevID()
                    review = Review(
                        revid=revid,
                        reqid=serviceRequest.reqid,
                        reviewer_uid=reviewerUid,
                        reviewee_uid=revieweeUid,
                        review=reviewText,
                        rating=float(reviewRating),
                        type=reviewType,
                        created_at=str(int(datetime.now().timestamp() * 1000))
                    )
                    database.session.add(review)
                    
                    professional = Professional.query.filter(Professional.uid == revieweeUid).first()
                    if professional:
                        reviews = Review.query.filter(Review.reviewee_uid == revieweeUid).all()
                        total_rating = sum([r.rating for r in reviews])
                        professional.rating = total_rating / len(reviews)

                    response = jsonify({
                        "result": SUCCESS,
                        "data": {
                            "message": "Review posted successfully",
                            "review": {
                                "revid": review.revid,
                                "reqid": review.reqid,
                                "reviewer_uid": review.reviewer_uid,
                                "reviewee_uid": review.reviewee_uid,
                                "review": review.review,
                                "rating": review.rating,
                                "type": review.type,
                                "created_at": review.created_at
                            }
                        }
                    })
                    response.status_code = 200
                elif (not reviewer):
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Review failed - Reviewer user not found",
                        }
                    })
                    response.status_code = 200
                elif (not reviewee):
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Review failed - Reviewee user not found",
                        }
                    })
                    response.status_code = 200
                elif (not serviceRequest):
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Review failed - Service request not found",
                        }
                    })
                    response.status_code = 200
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Review failed - Required info missing",
                    }
                })
                response.status_code = 200
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Review failed - Internal Server Error",
                }
            })
            response.status_code = 500
        finally:
            database.session.commit()
            return response


class ServicesApi(Resource):
    def get(self):
        response = None
        try:
            services = Service.query.all()
            services_list = [{
                "sid": service.sid,
                "name": service.name,
                "description": service.description,
                "price": service.price
            } for service in services]
            
            response = jsonify({
                "result": SUCCESS,
                "data": {
                    "services": services_list
                }
            })
            response.status_code = 200
        except:
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Failed to retrieve services - Internal Server Error"
                }
            })
            response.status_code = 500
        finally:
            return response

    def delete(self):
        response = None
        try:
            sid = request.form.get("sid")
            if sid:
                service = Service.query.filter(Service.sid == sid).first()
                if service:
                    database.session.delete(service)
                    database.session.commit()
                    response = jsonify({
                        "result": SUCCESS,
                        "data": {
                            "message": "Service deleted successfully"
                        }
                    })
                    response.status_code = 200
                else:
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Service not found"
                        }
                    })
                    response.status_code = 404
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Service ID is missing"
                    }
                })
                response.status_code = 400
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Failed to delete service - Internal Server Error"
                }
            })
            response.status_code = 500
        finally:
            return response

    def post(self):
        response = None
        try:
            name = request.form.get("name")
            description = request.form.get("description")
            price = request.form.get("price")
            if name and description and price:
                service = Service(
                    sid=generateSID(),
                    name=name,
                    description=description,
                    price=float(price)
                )
                database.session.add(service)
                database.session.commit()
                response = jsonify({
                    "result": SUCCESS,
                    "data": {
                        "message": "Service created successfully",
                        "service": {
                            "sid": service.sid,
                            "name": service.name,
                            "description": service.description,
                            "price": service.price
                        }
                    }
                })
                response.status_code = 201
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Service creation failed - Missing required fields"
                    }
                })
                response.status_code = 400
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Service creation failed - Internal Server Error"
                }
            })
            response.status_code = 500
        finally:
            return response

class UpdateAccountInfo(Resource):
    def post(self):
        response = None
        try:
            if g.config["authorized"]:
                uid = g.config["userInfo"]["uid"]
                user = User.query.filter(User.uid == uid).first()
                if user:
                    name = request.form.get("name")
                    location = request.form.get("location")
                    pincode = request.form.get("pincode")

                    if name:
                        user.name = name
                    if location:
                        user.location = location
                    if pincode:
                        user.pincode = pincode

                    if user.role == PROFESSIONAL:
                        description = request.form.get("description")
                        experience = request.form.get("experience")
                        duration = request.form.get("duration")
                        price = request.form.get("price")
                        professional = Professional.query.filter(Professional.uid == uid).first()
                        if description:
                            professional.description = description
                        if experience:
                            professional.experience = float(experience)
                        if duration:
                            professional.duration = float(duration)
                        if price:
                            professional.price = float(price)
                    response = jsonify({
                        "result": SUCCESS,
                        "data": {
                            "message": "Account information updated successfully",
                            "userInfo": {
                                "uid": user.uid,
                                "name": user.name,
                                "email": user.email,
                                "location": user.location,
                                "pincode": user.pincode,
                                "description": professional.description if user.role == PROFESSIONAL else None,
                                "experience": professional.experience if user.role == PROFESSIONAL else None,
                                "duration": professional.duration if user.role == PROFESSIONAL else None,
                                "price": professional.price if user.role == PROFESSIONAL else None
                            }
                        }
                    })
                    response.status_code = 200
                else:
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Update failed - User not found"
                        }
                    })
                    response.status_code = 404
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Update failed - Unauthorized request"
                    }
                })
                response.status_code = 401
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Update failed - Internal Server Error"
                }
            })
            response.status_code = 500
        finally:
            database.session.commit()
            return response

class UserApi(Resource):
    def delete(self):
        response = None
        try:
            mode = request.form.get("mode")
            uid = request.form.get("uid")
            if uid:
                user = User.query.filter(User.uid == uid).first()
                if user:
                    if mode == "delete":
                        database.session.delete(user)
                        database.session.commit()
                        response = jsonify({
                            "result": SUCCESS,
                            "data": {
                                "message": "User deleted successfully"
                            }
                        })
                        response.status_code = 200
                    elif mode == "block":
                        user.status = "blocked"
                        database.session.commit()
                        response = jsonify({
                            "result": SUCCESS,
                            "data": {
                                "message": "User blocked successfully"
                            }
                        })
                        response.status_code = 200
                    elif mode == "unblock":
                        user.status = "active"
                        database.session.commit()
                        response = jsonify({
                            "result": SUCCESS,
                            "data": {
                                "message": "User unblocked successfully"
                            }
                        })
                        response.status_code = 200
                    else:
                        response = jsonify({
                            "result": FAILURE,
                            "data": {
                                "message": "Invalid mode"
                            }
                        })
                        response.status_code = 400
                else:
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "User not found"
                        }
                    })
                    response.status_code = 404
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "User ID is missing"
                    }
                })
                response.status_code = 400
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Failed to process request - Internal Server Error"
                }
            })
            response.status_code = 500
        finally:
            return response

class ProfessionalRequestApi(Resource):
    def post(self):
        response = None
        try:
            if g.config["authorized"] and g.config["userInfo"]["isAdmin"]:
                uid = request.form.get("uid")
                mode = request.form.get("mode")
                professionalRequest = ProfessionalRequest.query.filter(ProfessionalRequest.uid == uid).first()
                
                if professionalRequest and mode in ["approve", "decline"]:
                    if mode == "approve":
                        professionalRequest.status = "approved"
                        professionalRequest.status_info = "Professional request approved"
                    elif mode == "decline":
                        professionalRequest.status = "declined"
                        professionalRequest.status_info = "Professional request declined"
                    
                    database.session.commit()
                    response = jsonify({
                        "result": SUCCESS,
                        "data": {
                            "message": f"Professional request {mode}d successfully",
                            "status": professionalRequest.status,
                            "statusInfo": professionalRequest.status_info
                        }
                    })
                    response.status_code = 200
                else:
                    response = jsonify({
                        "result": FAILURE,
                        "data": {
                            "message": "Invalid request or mode"
                        }
                    })
                    response.status_code = 400
            else:
                response = jsonify({
                    "result": FAILURE,
                    "data": {
                        "message": "Unauthorized request"
                    }
                })
                response.status_code = 401
        except:
            database.session.rollback()
            response = jsonify({
                "result": FAILURE,
                "data": {
                    "message": "Internal Server Error"
                }
            })
            response.status_code = 500
        finally:
            database.session.commit()
            return response

def initApiRoutes(api):
    api.add_resource(SignIn, "/api/signin")
    api.add_resource(SignUp, "/api/signup")
    api.add_resource(ServiceRequestApi, "/api/servicerequest")
    api.add_resource(ReviewApi, "/api/review")
    api.add_resource(ServicesApi, "/api/services")
    api.add_resource(UpdateAccountInfo, "/api/updateaccountinfo")
    api.add_resource(UserApi, "/api/user")
    api.add_resource(ProfessionalRequestApi, "/api/professionalrequest")