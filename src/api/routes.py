"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from datetime import timedelta
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post,Fav
from api.utils import generate_sitemap, APIException
from werkzeug.security import safe_str_cmp
import sendgrid
import os
from sendgrid.helpers.mail import *

#jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager


api = Blueprint('api', __name__)

API_KEY = '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'


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

# post user
@api.route('/user/register', methods=['POST'])
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

#login
@api.route('/user/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    
    return jsonify({ "token": access_token})


# get para recuperar contraseña
@api.route('/user/recover', methods=['POST'])
def get_password():

    body = request.get_json()
    if body is None:
        return jsonify({"message":"The request body is empty"}), 400
    if 'email' not in body:
        return jsonify({"message": "You have to specify an email"}), 400
    
    user = User()
    user = User.query.filter_by(email=body['email']).first()
    print("Hello World")
    print(user.email)

    sg = sendgrid.SendGridAPIClient(api_key=API_KEY)
    from_email = Email("test@example.com")
    to_email = To(user.email)
    subject = "Sending with SendGrid is Fun"
    content = Content("text/plain", user.password)
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    print(response.status_code)
    print(response.body)
    print(response.headers)

    return jsonify({"message":"mail sended to " + user.email}),200


# get de informacion de cultivos
@api.route('/post', methods=['GET'])
def list_vegetables():
    all_vegetables = Post.query.all()
    all_vegetables = list(map(lambda x: x.serialize(), all_vegetables))
    return jsonify(all_vegetables), 200


# post favorites crea favorito
@api.route('/favorites', methods=['POST'])
@jwt_required()
def create_favorite():
    current_user_id = get_jwt_identity()
   
    body = request.get_json() # get the request body content
    if body is None:
         return "The request body is null", 400
    if 'name' not in body:
        return 'You need to specify the favorite name',400
  
 
        
    favorites = Fav()
    favorites.user_id = current_user_id
    favorites.name = body['name']
  
    #agrega user a la base de datos
    db.session.add(favorites)
    #guarda los cambios
    db.session.commit()

    getfavs  = Fav.query.filter_by(user_id = current_user_id)
    getfavs = list(map(lambda x: x.serialize(), getfavs))
    
    return jsonify(getfavs), 200

#delete favorites 
@api.route('/favorites', methods=['DELETE'])
@jwt_required()
def delete_favorite():
    current_user_id = get_jwt_identity()
    
   
    body = request.get_json() # get the request body content
    if body is None:
         return "The request body is null", 400
    if 'id' not in body:
        return 'You need to specify the favorite id',400
  
    favorites = Fav()
    getfavs  = favorites.query.filter_by(user_id = current_user_id , id = body['id']).first()
    
        
    
  
    #agrega user a la base de datos
    db.session.delete(getfavs)
    #guarda los cambios
    db.session.commit()

    getfavs  = favorites.query.filter_by(user_id = current_user_id)
    getfavs = list(map(lambda x: x.serialize(), getfavs))
    

    
    
    return jsonify(getfavs), 200


#delete user
@api.route('/user/delete', methods=['DELETE'])
@jwt_required()
def delete_User():
    current_user_id = get_jwt_identity()
    
   
    body = request.get_json() # get the request body content
    if body is None:
         return "The request body is null", 400
    if 'password' not in body:
        return 'You need to specify the password',400
    if 'email' not in body:
        return 'You need to specify the email', 400
  
    user = User()
    getUser  = user.query.filter_by(id = current_user_id , email = body['email'], password = body['password']).first()
    
        
    
  
    #agrega user a la base de datos
    db.session.delete(getUser)
    #guarda los cambios
    db.session.commit()

   
    

    
    
    return jsonify({
        "msg": "Usuario Eliminado"
        }), 200


# #endpoint log out
# @api.route("/protected", methods=["PUT"])
# @jwt_required()
# def protected():
#     # Access the identity of the current user with get_jwt_identity
#     current_user_id = get_jwt_identity()
#     user = User.filter.get(current_user_id)
#     user.is_active = False

#     return jsonify({"id": user.id, "msg": "user is logout" }), 200

