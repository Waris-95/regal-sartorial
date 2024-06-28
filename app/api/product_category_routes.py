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
    product_types_dict = [product.to_dict() for product in product_types]
    print("Product Types:", product_types_dict)  # Debug print
    return jsonify({"products": product_types_dict}), 200



# GET Item type by it's ID
@products_type_bp.route('<int:product_type_id>', methods=['GET'])
def product_type(product_type_id):
    product_type = ProductType.query.get(product_type_id)
    if product_type is None:
        return jsonify({'error': "Product you're looking for is unavailable"}), 404
    product_type_dict = product_type.to_dict()
    print("Product Type Response:", product_type_dict)
    return jsonify({'productType': product_type.to_dict()}), 200

# GET/All Reviews by the type of the product/item
@products_type_bp.route('/<int:product_type_id>/reviews', methods=['GET'])
def product_reviews(product_type_id):
    if ProductType.query.get(product_type_id) is None:
        return jsonify({'error': "Product you're looking for is unavailable"}), 404
    reviews = Review.query.filter_by(product_type_id=product_type_id)
    return jsonify({'reviews': [review.to_dict() for review in reviews]})
