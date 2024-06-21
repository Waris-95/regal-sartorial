from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


# Product reviews
class Review (db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product_types.id')), nullable=False)
    description = db.Column(db.String(450))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    product_type = db.relationship('ProductType', back_populates="reviews")
    user = db.relationship('User',back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'productTypeId': self.product_type_id,
            'description': self.description,
            'rating': self.rating,
            'createdAt': self.created_at
        }