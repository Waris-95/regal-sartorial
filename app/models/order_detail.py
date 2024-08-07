from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timezone


# Order details
class OrderItem (db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=True)
    product_type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product_types.id')), nullable=True)
    total_price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    image = db.Column(db.String(225), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    updated_at = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    product = db.relationship('Product', back_populates="order_items")
    product_type = db.relationship('ProductType', back_populates="order_items")
    order = db.relationship('Order', back_populates="order_items")


    def to_dict(self):
        return {
            'id': self.id,
            'orderId': self.order_id,
            'productId': self.product_id,
            'product_type_id': self.product_type_id,
            'price': self.price,
            'quantity': self.quantity,
            'total_price': self.total_price,
            'color': self.color,
            'size': self.size,
            'image': self.image,
            'name': self.name
        }
    