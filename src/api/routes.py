"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import datetime
from datetime import timedelta

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post,Fav
from api.utils import generate_sitemap, APIException
from werkzeug.security import safe_str_cmp, generate_password_hash, check_password_hash
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

#jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

# Api Key de sendGrid
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
    
    body = request.get_json() # get the request body content

    if body is None:
        return jsonify({'msg':'El body está vacío', 'status':'failed'}), 400
    if 'password' not in body:
        return jsonify({'msg':'Necesita especificar una contraseña', 'status':'failed'}),400
    if 'email' not in body:
        return jsonify({'msg':'Necesita especificar un email', 'status':'failed'}), 400
    if 'lastName' not in body:
        return jsonify({'msg':'Necesita especificar un apellido', 'status':'failed'}), 400
    if 'firstName' not in body:
        return jsonify({'msg':'Necesita especificar un nombre', 'status':'failed'}), 400
    
    user = User.query.filter_by(email=body['email']).first()

    if user:
        return jsonify({'msg':'El usuario ya existe','status':'failed'}), 200


    user = User()
    user.email = body['email']
    user.password = body['password']
    user.lastName = body['lastName']
    user.firstName = body['firstName']
    user.is_active =True

    # agrega user a la base de datos
    db.session.add(user)
    # guarda los cambios
    db.session.commit()

    response_body = {
        "msg": "Usuario Creado",
        "status":"succesful"
    }

    return jsonify(response_body), 200


# post información de cultivos
@api.route('/user/cultivo', methods=['POST'])
def create_cultivo():
   
    body = request.get_json() # get the request body content

    if body is None:
        return jsonify({'msg':"El body está vacio", 'status':'failed'}), 400
    if 'nombre' not in body:
        return jsonify({'msg':'Necesita especificar un nombre', 'status':'failed'}),400
    if 'epoca_siembra' not in body:
        return jsonify({'msg':'Necesita especificar epoca_siembra ', 'status':'failed'}), 400
    if 'clima' not in body:
        return jsonify({'msg':'Necesita especificar clima', 'status':'failed'}), 400
    if 'cosecha' not in body:
        return jsonify({'msg':'Necesita especificar cosecha', 'status':'failed'}), 400
    if 'tipo_de_suelo' not in body:
        return jsonify({'msg':'Necesita especificar tipo_de_suelo', 'status':'failed'}), 400
    if 'preparacion_del_suelo' not in body:
        return jsonify({'msg':'Necesita especificar preparacion_del_suelo', 'status':'failed'}), 400
    if 'plagas' not in body:
        return jsonify({'msg':'Necesita especificar plagas', 'status':'failed'}), 400
    if 'descripcion' not in body:
        return jsonify({'msg':'Necesita especificar descripción', 'status':'failed'}), 400

    body_nombre = body['nombre']
    cultivo = Post.query.filter_by(name= body_nombre).first()

    if cultivo:
        return jsonify({'msg':'El cultivo ya existe', 'status':'failed'}), 200
        
    post = Post()
    post.nombre = body['nombre']  
    post.epoca_siembra = body['epoca_siembra'] 
    post.cosecha = body['cosecha'] 
    post.clima = body['clima'] 
    post.tipo_de_suelo = body['tipo_de_suelo'] 
    post.preparacion_del_suelo = body['preparacion_del_suelo'] 
    post.plagas = body['plagas']
   
    # agrega user a la base de datos
    db.session.add(post)
    # guarda los cambios
    db.session.commit()

    response_body = {
        "msg": "Cultivo creado",
        "status":"succesful"
    }

    return jsonify(response_body), 200
    

# Inicio de sesión
@api.route('/user/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if email is None:
        return jsonify({'msg':'Debe ingresar un email', 'status':'failed'}), 400
    if password is None:
        return jsonify({'msg':'Debe igresar una contraseña', 'status':'failed'}), 401

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({'msg': 'El usuario no está registrado', 'status':'failed'}), 401
    if password != user.password:
        return jsonify({'msg':'Contraseña incorrecta', 'status':'failed'}), 401

    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    getfavs  = Fav.query.filter_by(user_id = user.id)
    getfavs = list(map(lambda x: x.serialize(), getfavs))
   

    response = {
        "access_token": access_token,
        "user": user.serialize(),
        "msg":"Sesión iniciada",
        "status":"succesful",
        "list_fav" : getfavs
    }

    return jsonify(response), 200


# Recuperar contraseña
@api.route('/user/recover', methods=['POST'])
def recover_password():
    body = request.get_json()
    if body is None:
        return jsonify({'msg':'El body está vacío', 'status':'failed'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'Debe especificar un email'}), 400

    user = User()
    user = User.query.filter_by(email=body['email']).first()

    if user is None:
        return jsonify({'msg':'El email es incorrecto', 'status':'failed'}), 401

    message = Mail(from_email='cultivacostarica@gmail.com',
                to_emails=user.email,
                subject='Recuperación de contraseña',
                html_content='<strong>Su contraseña: </strong>' + user.password)

    try:
        sg = SendGridAPIClient(API_KEY)
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return jsonify({'msg':'Correo enviado', 'status':'succesful'}), 200
    
    except Exception as e:
        print(e)


# Actuaización de contraseña
@api.route('/user/password_update', methods=['PUT'])
@jwt_required()
def update_password():
    current_user_id = get_jwt_identity()
    
    body = request.get_json()
    if body is None:
        return jsonify({'msg':'El body está vacío', 'status':'failed'}), 400
    if 'oldPassword' not in body:
        return jsonify({'msg':'Debe especificar su contraseña antigua', 'status':'failed'}), 400
    if 'newPassword'not in body:
        return jsonify({'msg':'Debe especificar una nueva contraseña', 'status':'failed'}), 400

    user = User()
    user = User.query.filter_by(id=current_user_id).first()

    # No guarda la nueva contraseña
    if user.password == body['oldPassword']:
        user.password = body['newPassword']

        db.session.add(user)
        db.session.commit()
        
        return jsonify({'msg':'Contraseña actualizada', 'status':'succesful'}), 200

    if user.password != body['oldPassword']:
        return jsonify({'msg':'No se pudo actualizar la contraseña, contraseña actual incorrecta', 'status':'failed'}), 400

    response_body = {
        "msg":"Contraseña actualizada",
        "status":"sucessful"
    }
    
    return jsonify(response_body), 200

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
         return jsonify({'msg':'El body está vacío', 'status':'failed'}), 400
    if 'name' not in body:
        return jsonify({'msg':'Debe especificar el nombre de un favorito', 'status':'failed'}),400

    validate = Fav.query.filter_by(name = body['name']).first()
    if validate is None:

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
    else:
        return jsonify({'msg':'El favorito ya existe', 'status':'failed'}), 200

# delete favorites 
@api.route('/favorites', methods=['DELETE'])
@jwt_required()
def delete_favorite():
    current_user_id = get_jwt_identity()
   
    body = request.get_json() # get the request body content
    if body is None:
         return jsonify({'msg':'El body está vacío', 'status':'failed'}), 400
    if 'id' not in body:
        return jsonify({'msg':'Debe especificar el id del favorito', 'status':'failed'}),400
    
    favorites = Fav()
    getfavs  = favorites.query.filter_by(user_id = current_user_id , id = body['id']).first()
  
    #agrega user a la base de datos
    db.session.delete(getfavs)
    #guarda los cambios
    db.session.commit()

    getfavs  = favorites.query.filter_by(user_id = current_user_id)
    getfavs = list(map(lambda x: x.serialize(), getfavs))
    
    return jsonify(getfavs), 200


# delete user
@api.route('/user/delete', methods=['DELETE'])
@jwt_required()
def delete_User():
    current_user_id = get_jwt_identity()
    
    body = request.get_json() # get the request body content
    if body is None:
         return jsonify({'msg':'El body está vacío', 'status':'failed'}), 400
    if 'password' not in body:
        return jsonify({'msg':'Debe especificar su contraseña', 'status':'failed'}),400
    if 'email' not in body:
        return jsonify({'msg':'Debe especificar su email', 'status':'succesful'}), 400
  
    user = User()
    # getUser  = user.query.filter_by(id = current_user_id , email = body['email'], password = body['password']).first()
    
    getUser  = user.query.filter_by(id = current_user_id).first()

    if getUser.email != body['email'] and getUser.password != body['password']:
        return jsonify({'msg':'El correo y la contraseña son incorrectos', 'status':'failed'}), 400
    if getUser.email != body['email']:
        return jsonify({'msg':'El email es incorrecto', 'status':'failed'}), 400
    if getUser.password != body['password']:
        return jsonify({'msg':'La contraseña es incorrecta', 'status':'failed'}), 400
  
    #agrega user a la base de datos
    db.session.delete(getUser)
    #guarda los cambios
    db.session.commit()

    response_body = {
        "msg": "Usuario Eliminado",
        "status":"succesful"
    }
    
    return jsonify(response_body), 200
