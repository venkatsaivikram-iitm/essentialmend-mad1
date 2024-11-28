from flask import make_response, render_template, redirect, request, g
from server.utils.authentication_utils import isValidRequest
# from database.database import database
from server.utils.data_util import getServices, getProfessionals, getUsers, getUserConfig, getServiceRequests, getDashboardData, getReviews
from datetime import datetime
# import base64
import os


PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))

def initAppRoutes (app):

    @app.template_filter()
    def to_datetime(timestamp):
        if (type(timestamp) != "int"):
            timestamp = int(timestamp) / 1000
        return datetime.fromtimestamp(timestamp)
    

    @app.template_filter()
    def hasProfessionals(professionals, type):
        if (type == "all"):
            return len(professionals) > 0
        else:
            hasItems = False
            for prof in professionals:
                if (prof[type]):
                    hasItems = True
                    break
            return hasItems
    
    @app.template_filter()
    def hasServiceRequests(serviceRequests, type):
        if (type == "all"):
            return len(serviceRequests) > 0
        else:
            hasItems = False
            for sr in serviceRequests:
                if (sr[type]):
                    hasItems = True
                    break
            return hasItems


    @app.before_request
    def validateRequest():
        g.cookies = []
        if (
            request.endpoint == "index" or 
            request.endpoint == "static" or 
            request.path.startswith("/api/signin") or 
            request.path.startswith("/api/signup") or
            request.path.startswith("/api/services") or
            request.path.startswith("/api/user")
        ):
            pass
        else:
            validationObj = isValidRequest({
                "emat": request.cookies.get("emat"),
                "emrt": request.cookies.get("emrt")
            })

            g.cookies = validationObj["cookies"]

            if (validationObj["isValid"]):
                g.uid = validationObj["uid"]
                g.config = getUserConfig(validationObj["uid"])
                if (request.endpoint == "accountBlocked" and g.config["userInfo"]["status"] != "blocked"):
                    return redirect("/", 302)
                if (not g.config["authorized"] and request.endpoint != "professionalRequestPending" and request.endpoint != "professionalServiceNotFound") and request.endpoint != "professionalRequestDeclined" and request.endpoint != "accountBlocked":
                    if (g.config["userInfo"]["status"] == "blocked"):
                        return redirect("/account-blocked")
                    if (g.config["isServiceNotFound"]):
                        return redirect("/professional-service-not-found")
                    if (g.config["userInfo"]["isProfessional"] and g.config["professionalRequestInfo"]["status"] == "declined"):
                        return redirect("/professional-request-declined")
                    if (g.config["userInfo"]["isProfessional"]):
                        return redirect("/professional-request-pending")
                    else:
                        return redirect("/")
                if (request.endpoint == "register" or (request.endpoint == "professionalRequestPending" and g.config["authorized"])):
                    return redirect("/dashboard", 302)
            elif (request.endpoint != "register"):
                return redirect("/register", 302)


    @app.route("/")
    def index():
        response = make_response(render_template(
            "index.html",
            title="EssentialMend"
        ))
        return response


    @app.route("/register")
    def register():
        config = { "authorised": 0 }
        response = make_response(render_template(
            "register.html",
            title="EM - Register",
            config=config,
            services=getServices()
        ))
        return response


    @app.route("/dashboard")
    def dashboard():
        dashboardData = getDashboardData(g.config["userInfo"]["uid"])
        response = make_response(render_template(
            "main.html",
            title="EM - Dashboard",
            module="dashboard",
            config=(g.config or {}),
            dashboardData=dashboardData
        ))
        return response
    

    @app.route("/services")
    def services():
        professionals = getProfessionals({"onlyApproved": True, "uid": g.config["userInfo"]["uid"]})
        response = make_response(render_template(
            "main.html",
            title="EM - Services",
            module="services",
            professionals=professionals,
            config=(g.config or {})
        ))
        return response
    

    @app.route("/service-requests")
    def serviceRequests():
        serviceRequests = getServiceRequests({"uid": g.config["userInfo"]["uid"]})
        response = make_response(render_template(
            "main.html",
            title="EM - Service Requests",
            module="service-requests",
            serviceRequests=serviceRequests,
            config=(g.config or {})
        ))
        return response
    

    # @app.route("/professional-requests")
    # def professionalRequests():
    #     professionals = getProfessionals()
    #     response = make_response(render_template(
    #         "main.html",
    #         title="EM - Professional Requests",
    #         module="professional-requests",
    #         config=(g.config or {}),
    #         professionals=professionals
    #     ))
    #     return response

    @app.route("/reviews")
    def reviews():
        response = make_response(render_template(
            "main.html",
            title="EM - Reviews",
            module="reviews",
            config=(g.config or {}),
            reviews=getReviews({"uid": g.config["userInfo"]["uid"]})
        ))
        return response
    
    @app.route("/account-blocked")
    def accountBlocked():
        response = make_response(render_template(
            "main.html",
            title="EM - Account Blocked",
            module="account-blocked",
            config=(g.config or {})
        ))
        return response
    
    @app.route("/professional-request-declined")
    def professionalRequestDeclined():
        response = make_response(render_template(
            "main.html",
            title="EM - Prof Req Declined",
            module="professional-request-declined",
            config=(g.config or {})
        ))
        return response

    @app.route("/professional-request-pending")
    def professionalRequestPending():
        response = make_response(render_template(
            "main.html",
            title="EM - Prof Req Pending",
            module="professional-request-pending",
            config=(g.config or {})
        ))
        return response
    
    @app.route("/professional-service-not-found")
    def professionalServiceNotFound():
        response = make_response(render_template(
            "main.html",
            title="EM - Prof Service Not Found",
            module="professional-service-not-found",
            config=(g.config or {})
        ))
        return response

    @app.route("/admin-panel")
    def adminPanel():
        response = make_response(render_template(
            "main.html",
            title="EM - Admin Panel",
            module="admin-panel",
            services = getServices(),
            professionals = getProfessionals(),
            users = getUsers(),
            config=(g.config or {})
        ))
        return response
    

    @app.route("/account")
    def account():
        response = make_response(render_template(
            "main.html",
            title="EM - Account",
            module="account",
            config=(g.config or {})
        ))
        return response


    @app.errorhandler(404)
    def error(e):
        return render_template(
            "error.html",
            title="EssentialMend - PageNotFound"
        )
    
    
    @app.after_request
    def afterRequestCallback(response):
        for cookie in (g.cookies or []):
            response.set_cookie(key=cookie["key"], value=cookie["value"], max_age=cookie["maxAge"])
        
        return response