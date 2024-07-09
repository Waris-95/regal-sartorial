from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Style, StyleItem, db
from app.forms import StyleItemForm
from .utils import validation_errors_to_error_messages

style_item_bp = Blueprint('style_items', __name__)

# GET all items within a style
@style_item_bp.route('/styles/<int:style_id>/style_items', methods=['GET'])
def all_style_items(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Wardrobe you are looking for does not exist'}), 404
    style_items = StyleItem.query.filter_by(style_id=style_id)
    return jsonify({'style_items': [style_item.to_dict() for style_item in style_items]})

# POST/Item to style
@style_item_bp.route('/styles/<int:style_id>/style_items', methods=['POST'])
@login_required
def new_item_to_style(style_id):
    form = StyleItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Wardrobe you are looking for does not exist'}), 404

    if form.validate_on_submit():
        # Get the product_type_id from the form data
        product_type_id = form.data['product_type_id']

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
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

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