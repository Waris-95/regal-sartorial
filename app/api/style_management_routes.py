from flask import Blueprint, request, jsonify 
from flask_login import login_required, current_user
from app.models import Style, db, StyleItem
from app.forms import StyleItemForm
from datetime import datetime

style_item_bp = Blueprint('styles<int:style_id>/style_items', __name__)

"""
--------->Style Item Routes<---------
"""

# GET all items within a style
@style_item_bp.route('/')
def all_style_items(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': 'Wardrobe your looking for does not exist'}), 404
    style_items = StyleItem.query.filter_by(style_id=style_id)
    return jsonify({'style_items': [style_item.to_dict() for style_item in style_items]})