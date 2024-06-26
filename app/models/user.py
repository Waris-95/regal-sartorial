from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime, timezone

class User(db.Model, UserMixin): 
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    orders = db.relationship('Order', cascade="all, delete-orphan", lazy="joined", back_populates="user")
    favorites = db.relationship('Favorite', cascade="all, delete-orphan", lazy="joined", back_populates="user")
    reviews = db.relationship('Review', cascade="all, delete-orphan", lazy="joined", back_populates="user")
    styles = db.relationship('Style', cascade="all, delete-orphan", lazy="joined", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
        }
    
    def user_orders(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'orders': [order.to_dict() for order in self.orders]
        }

    def user_favorites(self):
        return {
            'id': self.id,
            'favorites': [favorite.to_dict() for favorite in self.favorites]
    }

    def user_reviews(self):
        return {
            'id': self.id,
            'reviews': [review.to_dict() for review in self.reviews]
        }