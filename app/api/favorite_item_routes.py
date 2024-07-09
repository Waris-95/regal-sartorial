from app.models import Favorite, db
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from .utils import validation_errors_to_error_messages
from datetime import datetime, timezone


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

# UPDATE A FAVORITE
@favorite_bp.route('/<int:favorite_id>', methods=['PUT'])
@login_required
def update_fav(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite is None:
        return jsonify({'error': 'Favorite not found'}), 404
    if current_user.id != favorite.user_id:
        return jsonify({'error': 'You are not authorized to update this favorite'}), 403
    
    data = request.get_json()
    image = data.get('image', favorite.image)  # Allow updating the image
    
    favorite.image = image
    favorite.updated_at = datetime.now(timezone.utc)
    
    db.session.commit()
    return favorite.to_dict()



# DELETE A FAVORITE
@favorite_bp.route('/<int:favorite_id>', methods=['DELETE'])
@login_required
def delete_fav(favorite_id):
    favorite = Favorite.query.get(favorite_id)
    if favorite is None:
        return jsonify({'error': 'Favorite not found'}), 404
    if current_user.id is not favorite.user_id:
        return jsonify({'error': 'You are not authorized to delete this fav'}), 403
    db.session.delete(favorite)
    db.session.commit()
    return {'message': 'Your favorite has been deleted.'}