from flask import Blueprint, request, jsonify 
from flask_login import login_required, current_user
from app.models import Style, db
from app.forms import StyleForm
from datetime import datetime

styles_bp = Blueprint('styles', __name__)

"""
--------->Style Routes<---------
"""

# GET/STYLES
@styles_bp.route('/')
def all_style():
    styles = Style.query.all()
    return jsonify({'styles': [style.to_dict() for style in styles]})

# GET/User style's
@styles_bp.route('/current')
@login_required
def user_styles():
    styles = Style.query.filter_by(user_id=current_user.id).order_by(
        Style.created_at)
    return jsonify({'styles': [style.to_dict() for style in styles]})