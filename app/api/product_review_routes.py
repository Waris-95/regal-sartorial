from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Review, db
from app.forms import ReviewForm

reviews_bp = Blueprint('reviews', __name__)

"""
--------->Review Routes<---------
"""

# GET/Reviews
@reviews_bp.route('/current')
@login_required
def user_reviews():
    reviews = Review.query.filter_by(user_id=current_user.id)
    return jsonify({'reviews': [review.to_dict() for review in reviews]})

# DELETE/Review
@reviews_bp.route('/<int:review_id>', methods=['DELETE'])
@login_required
def review_deletion(review_id):
    review = Review.query.get(review_id)
    if review is None:
        return jsonify({'error': "Unable to find a review"}), 404
    if current_user.id != review.user_id:
        return jsonify({'error': "Sorry, but you're unauthorized to delete this review"}), 403
    # delete
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted.'})
