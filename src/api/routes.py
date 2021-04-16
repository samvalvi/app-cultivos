"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

#jwt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

# post user
@api.route('/user', methods=['POST'])
def create_user():
    body = request.get_json() # get the request body content
    if body is None:
         return "The request body is null", 400
    if 'password' not in body:
        return 'You need to specify the password',400
    if 'email' not in body:
        return 'You need to specify the email', 400
    if 'lastName' not in body:
        return 'You need to specify the lastName', 400
    if 'firstName' not in body:
        return 'You need to specify the firstName', 400
 
   
        
    user = User()
        
    user.email = body['email']
    user.password = body['password']
    user.lastName = body['lastName']
    user.firstName = body['firstName']
    user.is_active =True
    #agrega user a la base de datos
    db.session.add(user)
    #guarda los cambios
    db.session.commit()

    response_body = {
        "msg": "Usuario Creado"
        }

    return jsonify(response_body), 200