from flask import Flask
from flask.ext.login import LoginManager

app = Flask(__name__)

app.secret_key = 'abrakadabra'
lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'

from app import views
from app import scrape