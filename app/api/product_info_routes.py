from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Product, Review, Favorite, db
from app.forms import ReviewForm
from app.forms import FavoriteForm

product_bp = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL PRODUCTS OF PRODUCT TYPE
@product_bp.route('/product_types/<int:product_type_id>/products', methods=['GET'])
def all_products(product_type_id):
    products = Product.query.filter_by(product_type_id=product_type_id).all()
    return {'products': [product.to_dict() for product in products]}

# CREATE A REVIEW BASED ON PRODUCT ID
@product_bp.route('/product_types/<int:product_type_id>/products/<int:product_id>/reviews', methods=['POST'])
@login_required
def create_review(product_type_id, product_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # check if the user has already reviewed this product
        existing_review = Review.query.filter_by(
            user_id = current_user.id,
            product_type_id = product_type_id
        ).first()

        if existing_review:
            return {'errors': ['You already reviewed this product.']}, 400

        review = Review(
            user_id=current_user.id,
            product_type_id=product_type_id,
            description=form.data['description'],
            rating=form.data['rating']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# GET ALL FAVS BY PRODUCT ID
@product_bp.route('/product_types/<int:product_type_id>/products/<int:product_id>/favorites', methods=['GET'])
def product_favs(product_type_id, product_id):
    if Product.query.get(product_id) is None:
        return jsonify({'error': 'Product not found'}), 404
    favs = Favorite.query.filter_by(product_id=product_id).all()
    return {'favorites': [fav.to_dict() for fav in favs]}

# CREATE A FAV BASED ON PRODUCT ID
@product_bp.route('/product_types/<int:product_type_id>/products/<int:product_id>/favorites', methods=['POST'])
@login_required
def create_fav(product_type_id, product_id):
    image = request.get_json().get('image')
    if not image:
        return jsonify({'error': 'Image is required'}), 400

    fav = Favorite(
        user_id=current_user.id,
        product_id=product_id,
        product_type_id=product_type_id,
        image=image
    )
    db.session.add(fav)
    db.session.commit()
    return fav.to_dict()