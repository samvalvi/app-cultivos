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
    descripcion = db.Column(db.String(120), nullable=False)
    epoca_siembra = db.Column(db.String(120), nullable=False)
    clima = db.Column(db.String(120), nullable=False)
    cosecha = db.Column(db.String(120), nullable=False)
    plagas = db.Column(db.String(120), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "epoca_siembra": self.epoca_siembra,
            "clima": self.clima,
            "cosecha": self.cosecha,
            "plagas": self.plagas,
            # do not serialize the password, its a security breach
        }

class Fav(db.Model):
    __table__name = 'fav'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    veg_fav = db.Column(db.Integer, db.ForeignKey('post.id'))
    user = db.relationship(User)
    veg = db.relationship(Post)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "veg_fav": self.veg_fav,
            # do not serialize the password, its a security breach
        }
    