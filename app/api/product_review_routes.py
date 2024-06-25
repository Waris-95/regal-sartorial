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