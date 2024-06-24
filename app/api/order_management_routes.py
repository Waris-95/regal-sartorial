from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Order, db
from app.forms import order_form
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

"""
--------->Order Routes<---------
"""

#GET/orders
@orders_bp.route('/', methods=['GET'])
def all_orders():
    # queries for all records from the database
    orders = Order.query.all()
    # convert each order to a dictionary using the to_dict() method used in the order_details models
    return jsonify({'orders': [order.to_dict() for order in orders]})
