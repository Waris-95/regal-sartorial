from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product, Review, Favorite
from app.forms import review_form, favorite_form

products_bp = Blueprint('products', __name__)

"""
--------->Product Routes<---------
"""

# GET /product_types/<int:product_type_id>/products
@products_bp.route('/product_types/<int:product_type_id>/products', methods=['GET'])
def all_products(product_type_id):
    products = Product.query.filter_by(product_type_id=product_type_id).all()
    return jsonify({"products": [product.to_dict() for product in products]}), 200
