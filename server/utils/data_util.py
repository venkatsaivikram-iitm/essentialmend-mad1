from database.models import Service, Professional, ProfessionalRequest, Review, User, ServiceRequest


def getServices():
    services = []
    _services = Service.query.all() or []

    for _service in _services:
        service = {
            "sid": _service.sid,
            "name": _service.name,
            "description": _service.description,
            "price": float(_service.price or 0)
        }
        services.append(service)
    
    return services


def getProfessionals(opts = {}):
    if (not opts.get("onlyApproved")):
        opts["onlyApproved"] = False
    if (not opts.get("uid")):
        opts["uid"] = ""
    professionals = []
    _professionals = Professional.query.all() or []

    for _professional in _professionals:
        user = User.query.filter(User.uid == _professional.uid).first()
        service = Service.query.filter(Service.sid == _professional.sid).first()
        professionalRequest = ProfessionalRequest.query.filter(ProfessionalRequest.uid == _professional.uid).first()
        reviews = Review.query.filter(Review.reviewee_uid == _professional.uid).all() or []

        if (opts["onlyApproved"] and professionalRequest.status != "approved"):
            continue

        professional = {
            "uid": _professional.uid,
            "sid": _professional.sid,
            "description": _professional.description,
            "experience": _professional.experience,
            "rating": float(_professional.rating),
            "duration": float(_professional.duration),
            "price": float(_professional.price),
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "location": user.location,
            "pincode": user.pincode,
            "status": user.status,
            "createdAt": user.created_at
        }
        if (service):
            professional["service"] = {
                "sid": service.sid,
                "name": service.name,
                "description": service.description,
                "price": float(service.price)
            }
        if (professionalRequest):
            professional["isApproved"] = professionalRequest.status == "approved"
            professional["isPending"] = professionalRequest.status == "pending"
            professional["isDeclined"] = professionalRequest.status == "declined"
            professional["professionalRequest"] = {
                "status": professionalRequest.status,
                "statusInfo": professionalRequest.status_info,
                "createdAt": professionalRequest.created_at,
                "closedAt": professionalRequest.closed_at
            }
        if (reviews):
            _reviews = []
            for review in reviews:
                reviewer = User.query.filter(User.uid == review.reviewer_uid).first()
                reviewee = User.query.filter(User.uid == review.reviewee_uid).first()
                if (not reviewer or not reviewee):
                    continue
                _review = {
                    "revid": review.revid,
                    "reviewerName": reviewer.name,
                    "reviewerEmail": reviewer.email,
                    "revieweeName": reviewee.name,
                    "revieweeEmail": reviewee.email,
                    "reviewerUid": review.reviewer_uid,
                    "revieweeUid": review.reviewee_uid,
                    "reqid": review.reqid,
                    "review": review.review,
                    "rating": float(review.rating),
                    "type": review.type,
                    "createdAt": review.created_at
                }
                _reviews.append(_review)
            professional["reviews"] = _reviews

        serviceRequests = ServiceRequest.query.filter(ServiceRequest.cid == opts["uid"], ServiceRequest.pid == _professional.uid).all()
        if (serviceRequests):
            requestPending = False
            for serviceRequest in serviceRequests:
                if (serviceRequest.status == "pending" or serviceRequest.status == "inprogress"):
                    professional["serviceRequest"] = {
                        "cid": serviceRequest.cid,
                        "pid": serviceRequest.pid,
                        "sid": serviceRequest.sid,
                        "status": serviceRequest.status,
                        "status_info": serviceRequest.status_info,
                        "created_at": serviceRequest.created_at,
                        "closed_at": serviceRequest.closed_at
                    }
                    requestPending = True
                    break
            professional["requestPending"] = requestPending
        
        professionals.append(professional)
    
    return professionals


def getUsers():
    users = []
    _users = User.query.filter(User.role == "user").all()

    for _user in _users:
        user = {
            "uid": _user.uid,
            "name": _user.name,
            "email": _user.email,
            "role": _user.role,
            "location": _user.location,
            "pincode": _user.pincode,
            "status": _user.status,
            "createdAt": _user.created_at
        }
        users.append(user)


    return users


def getUserConfig (uid):
    user = User.query.filter(User.uid == uid).first()
    if (not user):
        return
    
    info = {
        "userInfo": {
            "uid": user.uid,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "location": user.location,
            "pincode": user.pincode,
            "status": user.status,
            "createdAt": user.created_at,
            "isAdmin": user.role == "admin",
            "isProfessional": user.role == "professional",
            "isUser": user.role == "user"
        },
        "authorized": user.status == "active"
    }

    if (user.role == "professional"):
        professionalInfo = Professional.query.filter(Professional.uid == uid).first()
        if (professionalInfo):
            info["professionalInfo"] = {
                "description": professionalInfo.description,
                "experience": professionalInfo.experience,
                "rating": professionalInfo.rating,
                "price": professionalInfo.price,
                "duration": professionalInfo.duration
            }
            
            professionalRequest = ProfessionalRequest.query.filter(ProfessionalRequest.uid == uid).first()
            if (professionalRequest):
                info["professionalRequestInfo"] = {
                    "status": professionalRequest.status,
                    "statusInfo": professionalRequest.status_info,
                    "createdAt": professionalRequest.created_at,
                    "closedAt": professionalRequest.closed_at
                }
                info["authorized"] = professionalRequest.status == "approved"
            service = Service.query.filter(Service.sid == professionalInfo.sid).first()
            if (service):
                info["service"] = {
                    "name": service.name,
                    "description": service.description,
                    "price": service.price
                }
            info["authorized"] = info["authorized"] and bool(service)
            info["isServiceNotFound"] = not bool(service)
        

    return info


def getServiceRequests(opts = {}):
    if (not opts.get("uid")):
        opts["uid"] = ""
    
    serviceRequests = []

    user = User.query.filter(User.uid == opts["uid"]).first()
    if (user):
        _serviceRequests = []
        if (user.role == "admin"):
            _serviceRequests = ServiceRequest.query.all()
        elif (user.role == "professional"):
            _serviceRequests = ServiceRequest.query.filter(ServiceRequest.pid == user.uid)
        elif (user.role == "user"):
            _serviceRequests = ServiceRequest.query.filter(ServiceRequest.cid == user.uid)
        
        for _serviceRequest in _serviceRequests:
            userInfo = User.query.filter(User.uid == _serviceRequest.cid).first()
            professionalUserInfo = User.query.filter(User.uid == _serviceRequest.pid).first()
            professionalInfo = Professional.query.filter(Professional.uid == _serviceRequest.pid).first()
            serviceInfo = Service.query.filter(Service.sid == _serviceRequest.sid).first()

            if (not (userInfo and professionalUserInfo and professionalInfo and serviceInfo)):
                continue

            serviceRequest = {
                "reqid": _serviceRequest.reqid,
                "cid": _serviceRequest.cid,
                "pid": _serviceRequest.pid,
                "sid": _serviceRequest.sid,
                "status": _serviceRequest.status,
                "statusInfo": _serviceRequest.status_info,
                "createdAt": _serviceRequest.created_at,
                "closedAt": _serviceRequest.closed_at,
                "isPending": _serviceRequest.status == "pending",
                "isInProgress": _serviceRequest.status == "inprogress",
                "isCompleted": _serviceRequest.status == "completed",
                "isCancelled": _serviceRequest.status == "cancelled",
            }

            serviceRequest["userInfo"] = {
                "uid": userInfo.uid,
                "name": userInfo.name,
                "email": userInfo.email,
                "role": userInfo.role,
                "location": userInfo.location,
                "pincode": userInfo.pincode,
                "status": userInfo.status,
                "createdAt": userInfo.created_at
            }

            serviceRequest["professionalInfo"] = {
                "uid": professionalInfo.uid,
                "sid": professionalInfo.sid,
                "description": professionalInfo.description,
                "experience": professionalInfo.experience,
                "rating": float(professionalInfo.rating),
                "duration": float(professionalInfo.duration),
                "price": float(professionalInfo.price),
                "name": professionalUserInfo.name,
                "email": professionalUserInfo.email,
                "role": professionalUserInfo.role,
                "location": professionalUserInfo.location,
                "pincode": professionalUserInfo.pincode,
                "status": professionalUserInfo.status,
                "createdAt": professionalUserInfo.created_at
            }

            serviceRequest["serviceInfo"] = {
                "sid": serviceInfo.sid,
                "name": serviceInfo.name,
                "description": serviceInfo.description,
                "price": float(serviceInfo.price or 0)
            }

            serviceRequestReviews = Review.query.filter(Review.reqid == _serviceRequest.reqid).all() or  []
            if (serviceRequestReviews):
                _serviceRequestReviews = []
                for serviceRequestReview in serviceRequestReviews:
                    reviewer = User.query.filter(User.uid == serviceRequestReview.reviewer_uid).first()
                    reviewee = User.query.filter(User.uid == serviceRequestReview.reviewee_uid).first()
                    if (not reviewer or not reviewee):
                        continue
                    _review = {
                        "revid": serviceRequestReview.revid,
                        "reviewerName": reviewer.name,
                        "reviewerEmail": reviewer.email,
                        "revieweeName": reviewee.name,
                        "revieweeEmail": reviewee.email,
                        "reviewerUid": serviceRequestReview.reviewer_uid,
                        "revieweeUid": serviceRequestReview.reviewee_uid,
                        "reqid": serviceRequestReview.reqid,
                        "review": serviceRequestReview.review,
                        "rating": float(serviceRequestReview.rating),
                        "type": serviceRequestReview.type,
                        "createdAt": serviceRequestReview.created_at
                    }
                    _serviceRequestReviews.append(_review)
                serviceRequest["reviews"] = _serviceRequestReviews

            serviceRequests.append(serviceRequest)
    return serviceRequests


def getReviews(opts={}):
    if not opts.get("uid"):
        return []

    user = User.query.filter(User.uid == opts["uid"]).first()
    if not user:
        return []

    reviews = []
    if user.role == "admin":
        user_reviews = Review.query.filter(Review.reviewee_uid.in_(
            [u.uid for u in User.query.filter(User.role == "user").all()])).all()
        professional_reviews = Review.query.filter(Review.reviewee_uid.in_(
            [p.uid for p in Professional.query.all()])).all()
        reviews = {
            "userReviews": [review_to_dict(review) for review in user_reviews],
            "professionalReviews": [review_to_dict(review) for review in professional_reviews]
        }
    elif user.role == "user" or user.role == "professional":
        user_reviews = Review.query.filter(Review.reviewee_uid == user.uid).all()
        reviews = [review_to_dict(review) for review in user_reviews]

    return reviews

def review_to_dict(review):
    reviewer = User.query.filter(User.uid == review.reviewer_uid).first()
    reviewee = User.query.filter(User.uid == review.reviewee_uid).first()
    return {
        "revid": review.revid,
        "reviewerName": reviewer.name if reviewer else None,
        "reviewerEmail": reviewer.email if reviewer else None,
        "revieweeName": reviewee.name if reviewee else None,
        "revieweeEmail": reviewee.email if reviewee else None,
        "reviewerUid": review.reviewer_uid,
        "revieweeUid": review.reviewee_uid,
        "reqid": review.reqid,
        "review": review.review,
        "rating": float(review.rating),
        "type": review.type,
        "createdAt": review.created_at
    }


def getDashboardData(uid):
    dashboardData = {}
    user = User.query.filter(User.uid == uid).first()
    if (user):
        if (user.role == "user" or user.role == "professional"):
            dashboardData["serviceRequests"] = [
                ["Pending", ServiceRequest.query.filter(ServiceRequest.cid == uid if user.role == "user" else ServiceRequest.pid == uid, ServiceRequest.status == "pending").count()],
                ["InProgress", ServiceRequest.query.filter(ServiceRequest.cid == uid if user.role == "user" else ServiceRequest.pid == uid, ServiceRequest.status == "inprogress").count()],
                ["Cancelled", ServiceRequest.query.filter(ServiceRequest.cid == uid if user.role == "user" else ServiceRequest.pid == uid, ServiceRequest.status == "cancelled").count()],
                ["Completed", ServiceRequest.query.filter(ServiceRequest.cid == uid if user.role == "user" else ServiceRequest.pid == uid, ServiceRequest.status == "completed").count()],
            ]
            dashboardData["reviews"] = [
                ["0 - 1", Review.query.filter(Review.reviewee_uid == uid, Review.rating >= 0, Review.rating < 1).count()],
                ["1 - 2", Review.query.filter(Review.reviewee_uid == uid, Review.rating >= 1, Review.rating < 2).count()],
                ["2 - 3", Review.query.filter(Review.reviewee_uid == uid, Review.rating >= 2, Review.rating < 3).count()],
                ["3 - 4", Review.query.filter(Review.reviewee_uid == uid, Review.rating >= 3, Review.rating < 4).count()],
                ["4 - 5", Review.query.filter(Review.reviewee_uid == uid, Review.rating >= 4, Review.rating <= 5).count()],
            ]
            serviceRequests = ServiceRequest.query.filter(ServiceRequest.cid == uid if user.role == "user" else ServiceRequest.pid == uid, ServiceRequest.status == "completed").all() or []
            lastServiceRequest = serviceRequests[len(serviceRequests) - 1] if len(serviceRequests) > 0 else None
            currentServiceRequest = ServiceRequest.query.filter(ServiceRequest.cid == uid if user.role == "user" else ServiceRequest.pid == uid, ServiceRequest.status == "inprogress").first()

            if (lastServiceRequest):
                userInfo = User.query.filter(User.uid == lastServiceRequest.cid).first()
                professionalUserInfo = User.query.filter(User.uid == lastServiceRequest.pid).first()
                professionalInfo = Professional.query.filter(Professional.uid == lastServiceRequest.pid).first()
                serviceInfo = Service.query.filter(Service.sid == lastServiceRequest.sid).first()
                dashboardData["lastServiceRequest"] = {
                    "reqid": lastServiceRequest.reqid,
                    "cid": lastServiceRequest.cid,
                    "pid": lastServiceRequest.pid,
                    "sid": lastServiceRequest.sid,
                    "status": lastServiceRequest.status,
                    "statusInfo": lastServiceRequest.status_info,
                    "createdAt": lastServiceRequest.created_at,
                    "closedAt": lastServiceRequest.closed_at,
                    "isPending": lastServiceRequest.status == "pending",
                    "isInProgress": lastServiceRequest.status == "inprogress",
                    "isCompleted": lastServiceRequest.status == "completed",
                    "isCancelled": lastServiceRequest.status == "cancelled"
                }
                if (userInfo):
                    dashboardData["lastServiceRequest"]["userInfo"] = {
                        "uid": userInfo.uid,
                        "name": userInfo.name,
                        "email": userInfo.email,
                        "role": userInfo.role,
                        "location": userInfo.location,
                        "pincode": userInfo.pincode,
                        "status": userInfo.status,
                        "createdAt": userInfo.created_at
                    }
                if (professionalInfo):
                    dashboardData["lastServiceRequest"]["professionalInfo"] = {
                        "uid": professionalInfo.uid,
                        "sid": professionalInfo.sid,
                        "description": professionalInfo.description,
                        "experience": professionalInfo.experience,
                        "rating": float(professionalInfo.rating),
                        "duration": float(professionalInfo.duration),
                        "price": float(professionalInfo.price),
                        "name": professionalUserInfo.name,
                        "email": professionalUserInfo.email,
                        "role": professionalUserInfo.role,
                        "location": professionalUserInfo.location,
                        "pincode": professionalUserInfo.pincode,
                        "status": professionalUserInfo.status,
                        "createdAt": professionalUserInfo.created_at
                    }
                if (serviceInfo):
                    dashboardData["lastServiceRequest"]["serviceInfo"] = {
                        "sid": serviceInfo.sid,
                        "name": serviceInfo.name,
                        "description": serviceInfo.description,
                        "price": float(serviceInfo.price or 0)
                    }
            if (currentServiceRequest):
                userInfo = User.query.filter(User.uid == currentServiceRequest.cid).first()
                professionalUserInfo = User.query.filter(User.uid == currentServiceRequest.pid).first()
                professionalInfo = Professional.query.filter(Professional.uid == currentServiceRequest.pid).first()
                serviceInfo = Service.query.filter(Service.sid == currentServiceRequest.sid).first()
                dashboardData["currentServiceRequest"] = {
                    "reqid": currentServiceRequest.reqid,
                    "cid": currentServiceRequest.cid,
                    "pid": currentServiceRequest.pid,
                    "sid": currentServiceRequest.sid,
                    "status": currentServiceRequest.status,
                    "statusInfo": currentServiceRequest.status_info,
                    "createdAt": currentServiceRequest.created_at,
                    "closedAt": currentServiceRequest.closed_at,
                    "isPending": currentServiceRequest.status == "pending",
                    "isInProgress": currentServiceRequest.status == "inprogress",
                    "isCompleted": currentServiceRequest.status == "completed",
                    "isCancelled": currentServiceRequest.status == "cancelled"
                }
                if (userInfo):
                    dashboardData["currentServiceRequest"]["userInfo"] = {
                        "uid": userInfo.uid,
                        "name": userInfo.name,
                        "email": userInfo.email,
                        "role": userInfo.role,
                        "location": userInfo.location,
                        "pincode": userInfo.pincode,
                        "status": userInfo.status,
                        "createdAt": userInfo.created_at
                    }
                if (professionalInfo):
                    dashboardData["currentServiceRequest"]["professionalInfo"] = {
                        "uid": professionalInfo.uid,
                        "sid": professionalInfo.sid,
                        "description": professionalInfo.description,
                        "experience": professionalInfo.experience,
                        "rating": float(professionalInfo.rating),
                        "duration": float(professionalInfo.duration),
                        "price": float(professionalInfo.price),
                        "name": professionalUserInfo.name,
                        "email": professionalUserInfo.email,
                        "role": professionalUserInfo.role,
                        "location": professionalUserInfo.location,
                        "pincode": professionalUserInfo.pincode,
                        "status": professionalUserInfo.status,
                        "createdAt": professionalUserInfo.created_at
                    }
                if (serviceInfo):
                    dashboardData["currentServiceRequest"]["serviceInfo"] = {
                        "sid": serviceInfo.sid,
                        "name": serviceInfo.name,
                        "description": serviceInfo.description,
                        "price": float(serviceInfo.price or 0)
                    }
        elif (user.role == "admin"):
            dashboardData["serviceRequests"] = [
                ["Pending", ServiceRequest.query.filter(ServiceRequest.status == "pending").count()],
                ["InProgress", ServiceRequest.query.filter(ServiceRequest.status == "inprogress").count()],
                ["Cancelled", ServiceRequest.query.filter(ServiceRequest.status == "cancelled").count()],
                ["Completed", ServiceRequest.query.filter(ServiceRequest.status == "completed").count()],
            ]
            dashboardData["professionals"] = [
                ["Active", ProfessionalRequest.query.filter(ProfessionalRequest.status == "approved").count()],
                ["Pending", ProfessionalRequest.query.filter(ProfessionalRequest.status == "pending").count()],
                ["Declined", ProfessionalRequest.query.filter(ProfessionalRequest.status == "declined").count()],
            ]
            dashboardData["professionalRatings"] = [
                ["0 - 1", Professional.query.filter(Professional.rating >= 0, Professional.rating < 1).count()],
                ["1 - 2", Professional.query.filter(Professional.rating >= 1, Professional.rating < 2).count()],
                ["2 - 3", Professional.query.filter(Professional.rating >= 2, Professional.rating < 3).count()],
                ["3 - 4", Professional.query.filter(Professional.rating >= 3, Professional.rating < 4).count()],
                ["4 - 5", Professional.query.filter(Professional.rating >= 4, Professional.rating <= 5).count()],
            ]
            dashboardData["professionalReviews"] = [
                ["0 - 1", Review.query.filter(Review.reviewee_uid.in_([p.uid for p in Professional.query.all()]), Review.rating >= 0, Review.rating < 1).count()],
                ["1 - 2", Review.query.filter(Review.reviewee_uid.in_([p.uid for p in Professional.query.all()]), Review.rating >= 1, Review.rating < 2).count()],
                ["2 - 3", Review.query.filter(Review.reviewee_uid.in_([p.uid for p in Professional.query.all()]), Review.rating >= 2, Review.rating < 3).count()],
                ["3 - 4", Review.query.filter(Review.reviewee_uid.in_([p.uid for p in Professional.query.all()]), Review.rating >= 3, Review.rating < 4).count()],
                ["4 - 5", Review.query.filter(Review.reviewee_uid.in_([p.uid for p in Professional.query.all()]), Review.rating >= 4, Review.rating <= 5).count()],
            ]
    return dashboardData