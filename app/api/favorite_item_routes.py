from app.models import Favorite, db
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user

favorite_bp = Blueprint('favorites', __name__)

"""
--------->Favorite Routes<---------
"""

# GET/Favorites
@favorite_bp.route('/current')
@login_required
def user_favorite():
    favorites= Favorite.query.filter_by(user_id=current_user.id)
    return jsonify({'favorites': [favorite.to_dict() for favorite in favorites]})



