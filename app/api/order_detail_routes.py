from flask import Blueprint, request, jsonify
from app.models import OrderItem, db
from app.forms import OrderItemForm
from flask_login import login_required, current_user
from datetime import datetime
from .utils import validation_errors_to_error_messages

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

# POST/Add a product to an order
@order_item_bp.route('/<int:order_id>/order_items', methods=['POST'])
@login_required
def add_order_item(order_id):
    form = OrderItemForm()
    
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        order_item = OrderItem(
            order_id=order_id,
            product_id=form.data['product_id'],
            product_type_id=form.data['product_type_id'],
            price=form.data['price'],
            quantity=form.data['quantity'],
            total_price=form.data['total_price'],
            color=form.data['color'],
            size=form.data['size'],
            image=form.data['image'],  
            name=form.data['name']
        )
        db.session.add(order_item)
        db.session.commit()
        return order_item.to_dict()
    return jsonify({'error': validation_errors_to_error_messages(form.errors)}), 401



# PUT/Order Item
@order_item_bp.route('/order_items/<int:order_item_id>', methods=['PUT'])
@login_required  # Ensure the user is logged in
def put_order_product(order_item_id):  # Ensure the function parameter name matches the route parameter name
    order_product = OrderItem.query.get(order_item_id)
    if order_product is None:
        return jsonify({'error': "Unable to find the order item you're looking for"}), 404
    # Put an order product
    data = request.get_json()
    if 'quantity' in data:
        order_product.quantity = data['quantity']
    if 'total_price' in data:
        order_product.total_price = data['total_price']
    
    db.session.commit()
    return order_product.to_dict()

# DELETE/ A product item
@order_item_bp.route('/order_items/<int:order_item_id>', methods=['DELETE'])
@login_required
def delete_order_prod(order_item_id):
    order_item = OrderItem.query.get(order_item_id)
    if order_item is None:
        return jsonify({'error': "Unable to find the order item you're looking for"}), 404
    db.session.delete(order_item)
    db.session.commit()
    return jsonify({'message': "Successfully removed"})