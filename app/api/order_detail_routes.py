from flask import Blueprint, request, jsonify
from app.models import OrderItem, db
from app.forms import order_item_form
from flask_login import login_required, current_user
from datetime import datetime

order_item_bp = Blueprint('order_items', __name__)

"""
--------->Order Item Routes<---------
"""

# GET/Order's Order_items
@order_item_bp.route('/orders/<int:order_id>/order_items', methods=['GET'])
def all_order_items(order_id):
    order_items = OrderItem.query.filter_by(order_id=order_id)
    # return them in a list od order item dictionaries 
    return jsonify({'order_items': [order_item.to_dict() for order_item in order_items]})
