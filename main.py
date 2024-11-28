import os
from flask import Flask
from flask_restful import Api
from database.database import database
from server.routes.route import initAppRoutes
from server.routes.api import initApiRoutes


app = Flask(__name__)
api = Api(app)

app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

currentDir = os.path.abspath(os.path.dirname(__file__))
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(currentDir, "./database/essentialmend.sqlite3")

database.init_app(app)

initAppRoutes(app)
initApiRoutes(api)

app.app_context().push()

with app.app_context():
    if not os.path.exists(os.path.join(currentDir, "./database/essentialmend.sqlite3")):
        database.create_all()

if (__name__ == '__main__'):
    app.run(
        debug=True,
        port=2025
    )


# prof req decline
# admin blocking prof and user
# user blocking prof