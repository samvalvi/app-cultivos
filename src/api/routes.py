"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import datetime
from datetime import timedelta

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post,Fav
from api.utils import generate_sitemap, APIException
from werkzeug.security import safe_str_cmp
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

#jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

API_KEY = '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'

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200
    

# post user
@api.route('/user/register', methods=['POST'])
def create_user():
    
    try:
        body = request.get_json() # get the request body content

        if body is None:
            return "El body está vacío", 400
        if 'password' not in body:
            return 'Necesita especificar una contraseña',400
        if 'email' not in body:
            return 'Necesita especificar un email', 400
        if 'lastName' not in body:
            return 'Necesita especificar un apellido', 400
        if 'firstName' not in body:
            return 'Necesita especificar un nombre', 400
        
        body_email = body['email']
        user = User.query.filter_by(email == body_email).first()

        if user:
             jsonify({'msg':'El usuario ya existe','status':'failed'}), 400

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
            "msg": "Usuario Creado",
            "status":"succesful"
            }

        return jsonify(response_body), 200

    except:
        return jsonify({"msg":"El usuario no pudo ser creado", "status":"failed"}), 400

#post información de cultivos

@api.route('/user/cultivo', methods=['POST'])
def create_cultivo():
    try:
        body = request.get_json() # get the request body content
        if body is None:
             return "El body está vacio", 400
        if 'nombre' not in body:
            return 'necesitas especificar un nombre',400
        if 'epoca_siembra' not in body:
            return 'necesitas especificar epoca_siembra ', 400
        if 'clima' not in body:
            return 'necesitas especificar clima', 400
        if 'cosecha' not in body:
            return 'necesitas especificar cosecha', 400
        if 'tipo_de_suelo' not in body:
            return 'necesitas especificar tipo_de_suelo', 400
        if 'preparacion_del_suelo' not in body:
            return 'necesitas especificar preparacion_del_suelo', 400
        if 'plagas' not in body:
            return 'necesitas especificar plagas', 40

        body_nombre = body['nombre']
        cultivo = Post.query.filter_by(name == body_nombre).first()

        if cultivo:
            return jsonify({'msg':'El cultivo ya existe', 'status':'failed'}), 400
        
        post = Post()
        post.nombre = body['nombre']  
        post.epoca_siembra = body['epoca_siembra'] 
        post.cosecha = body['cosecha'] 
        post.clima = body['clima'] 
        post.tipo_de_suelo = body['tipo_de_suelo'] 
        post.preparacion_del_suelo = body['preparacion_del_suelo'] 
        post.plagas = body['plagas']
   
        #agrega user a la base de datos
        db.session.add(post)
        #guarda los cambios
        db.session.commit()

        response_body = {
            "msg": "Cultivo creado",
            "status":"succesful"
            }

        return jsonify(response_body), 200
    except:
        return jsonify({"msg":"El cultivo no fue creado", "status":"failed"}), 400

#login
@api.route('/user/login', methods=['POST'])
def login_user():
    try:
        try:
            email = request.json.get("email", None)
            password = request.json.get("password", None)
            # Query your database for username and password
            user = User.query.filter_by(email=email, password=password).first()
            if user is None:
                # the user was not found on the database
                return jsonify({"msg": "Email o contraseña incorrecta"}), 401
            if email is None:
                return jsonify({'msg':'Debe ingresar su email'}), 400
            if password is None:
                return jsonify({'msg':'Debe ingresar su contraseña'}), 400

            
    
            # create a new token with the user id inside
            access_token = create_access_token(identity=user.id)

            response = {
                "access_token": access_token,
                "user": user.serialize(),
                "msg":"Sesión iniciada",
                "status":"succesful"
            }
    
        return jsonify(response), 200
    
    except:
        return jsonify({'msg':'No fue posible iniciar sesión'}), 400



# recuperar contraseña
@api.route('/user/recover', methods=['POST'])
def get_password():

    body = request.get_json()
    if body is None:
        return jsonify({"message":"The request body is empty"}), 400
    if 'email' not in body:
        return jsonify({"message": "You have to specify an email"}), 400

    user = User()
    user = User.query.filter_by(email=body['email']).first()

    message = Mail(from_email='samuelvalerin@protonmail.com',
                to_emails=user.email,
                subject='Recuperación de contraseña',
                html_content='<strong>Su contraseña: </strong>' + user.password)

    try:
        sg = SendGridAPIClient(API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return jsonify({'message':'password sended'}), 200
    
    except Exception as e:
        print(e)


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
