from flask import Blueprint, request, jsonify
from app.models import db, Product, Review, Favorite, ProductType

products_type_bp = Blueprint('product_types', __name__)

"""
--------->Product Type Routes<---------
"""

# GET/Product-types
@products_type_bp.route('/', methods=['GET'])
def all_product_types():
    category = request.args.get('category')
    if category:
        product_types = ProductType.query.filter(ProductType.category == category).all()
    else:
        product_types = ProductType.query.all()
    return jsonify({"products": [product.to_dict() for product in product_types]}), 200
