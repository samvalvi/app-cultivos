from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    # def __repr__(self):
    #     return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstName": self.firstName,
            "lastName": self.lastName,
            # do not serialize the password, its a security breach
        }

class Post(db.Model):
    __tablename__ = 'post'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(120), nullable=False)
    epoca_siembra = db.Column(db.String(), nullable=False)
    clima = db.Column(db.String(), nullable=False)
    cosecha = db.Column(db.String(), nullable=False)
    plagas = db.Column(db.String(), nullable=False)
    tipo_de_suelo = db.Column(db.String(), nullable=False)
    preparacion_del_suelo = db.Column(db.String(), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "epoca_siembra": self.epoca_siembra,
            "clima": self.clima,
            "cosecha": self.cosecha,
            "tipo_de_suelo": self.tipo_de_suelo,
            "preparacion_del_suelo": self.preparacion_del_suelo
            # do not serialize the password, its a security breach
        }

class Fav(db.Model):
    __table__name = 'fav'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    veg_fav = db.Column(db.Integer, db.ForeignKey('post.id'))
    name = db.Column(db.String(50), nullable=False)
    user = db.relationship(User)
    veg = db.relationship(Post)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "veg_fav": self.veg_fav,
            # do not serialize the password, its a security breach
        }
    