from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Order, db
from app.forms import OrderForm
from datetime import datetime
from .utils import validation_errors_to_error_messages

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

#GET/current user's order
@orders_bp.route('current/pending', methods=['GET'])
@login_required
def curr_user_order():
    order = Order.query.filter_by(user_id=current_user.id, status='pending').first()
    if order is None:
        return {}
    else:
        return order.to_dict()
    
# GET/all of curr user's orders
@orders_bp.route('/current')
@login_required
def user_ord():
    orders = Order.query.filter_by(user_id=current_user.id).order_by(
        Order.created_at
    ).all()
    return jsonify({'user_orders': [order.to_dict() for order in orders]})

# POST/New Order
@orders_bp.route('/', methods=['POST'])
@login_required
def post_order():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order(
            status=form.data['status'],
            user_id=current_user.id
        )
        db.session.add(order)
        db.session.commit()
        return order.to_dict()
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 401

# PUT/Order placement
@orders_bp.route('/<int:order_id>/shipping', methods=['PUT'])
@login_required
def order_placement(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({'error': "Unable to find the order you're looking for"}), 404
    order_status = "confirmed"
    db.session.commit()
    return order.to_dict()

# PUT/Edit the order itself
@orders_bp.route('/<int:order_id>', methods=['PUT'])
@login_required
def order_edits(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({'error': "Unable to find the order you're looking for"}), 404
    if current_user.id != order.user_id:
        return jsonify({'error': 'Sorry, but you are unauthorized to edit this order'}), 400
    
    data = request.get_json()

    def update_order_price(operation, amount):
        if operation == "delete":
            order.price -= amount
        elif operation == "add":
            order.price += amount
        elif operation == "minus":
            order.price -= amount
        order.tax = (order.price * 7.5) / 100
        order.total_price = order.price + order.tax
     
    operations = {"delete": "delete", "add": "add", "minus": "minus"}

    for key, operation in operations.items():
        if key in data:
            update_order_price(operation, data[key])
            db.session.commit()
            return order.to_dict()

    if 'total_price' in data:
        if order.price is None:
            order.price = data["total_price"]
        else:
            order.price += data["total_price"]

        order.tax = (order.price * 7.5) / 100
        order.total_price = order.price + order.tax

        db.session.commit()
    
    return order.to_dict()

# DELETE/Entire Order
@orders_bp.route('<int:order_id>', methods=['DELETE'])
@login_required
def order_deletion(order_id):
    order = Order.query.get(order_id)
    if order is None:
        return jsonify({'error': "Unable to find the order you're looking for"}), 404
    if current_user.id != order.user_id:
        return jsonify({'error': "Sorry, but you are unauthorized to delete this order"}), 400
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': "Order cancelled successfully."})