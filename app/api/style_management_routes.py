from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Style, db, StyleItem
from app.forms import StyleItemForm
from datetime import datetime

style_item_bp = Blueprint('style_items', __name__)

"""
--------->Style Item Routes<---------
"""

# GET all items within a style
@style_item_bp.route('/styles/<int:style_id>/style_items', methods=['GET'])
def all_style_items(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Wardrobe your looking for does not exist'}), 404
    style_items = StyleItem.query.filter_by(style_id=style_id)
    return jsonify({'style_items': [style_item.to_dict() for style_item in style_items]})

# POST/Item to style
@style_item_bp.route('/styles/<int:style_id>/style_items', methods=['POST'])
@login_required
def new_item_to_style(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Wardrobe you are looking for does not exist'}), 404

    # Get the product_type_id from the request data
    data = request.get_json()
    product_type_id = data.get('product_type_id')

    if not product_type_id:
        return jsonify({'error': 'No product type provided'}), 400

    # Check if item already exists in style
    for item in style.style_items:
        if item.product_type_id == product_type_id:
            return jsonify({'error': "This item has already been saved in your wardrobe, please try a different one"}), 400

    # Create a new style item
    style_item = StyleItem(
        product_type_id=product_type_id,
        style_id=style_id
    )
    
    db.session.add(style_item)
    db.session.commit()

    return style_item.to_dict(), 201

# DELETE A STYLE ITEM
@style_item_bp.route('/<int:style_item_id>', methods=['DELETE'])
@login_required
def delete_style_item(style_item_id):
    style_id = request.args.get('style_id')
    if not style_id:
        return jsonify({'error': 'Style ID is required'}), 400

    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Style not found'}), 404

    style_item = StyleItem.query.filter_by(id=style_item_id, style_id=style_id).first()
    if style_item is None:
        return jsonify({'error': 'Style item not found'}), 404

    db.session.delete(style_item)
    db.session.commit()
    return {'message': 'Item has been removed from your style.'}
