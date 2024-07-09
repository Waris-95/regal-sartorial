from flask import Blueprint, request, jsonify 
from flask_login import login_required, current_user
from app.models import Style, db
from app.forms import StyleForm
from datetime import datetime, timezone
from .utils import validation_errors_to_error_messages

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
    styles = Style.query.filter_by(user_id=current_user.id).order_by(Style.created_at)
    return jsonify({'styles': [style.to_dict() for style in styles]})


# GET/by style id
@styles_bp.route('/current/<int:style_id>')
@login_required
def user_style(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': "Style you're looking for is unavailable"}), 404
    if current_user.id is not style.user_id: return jsonify({'error': "Sorry, but you're unauthorized to edit this post"}), 403
    return style.to_dict()

# POST/New style
@styles_bp.route('/', methods=['POST'])
@login_required
def style_creation():
    form = StyleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit(): 
        style = Style(title=form.data['title'], user_id=current_user.id)
        db.session.add(style)
        db.session.commit()
        return style.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# PUT/Style
@styles_bp.route('/<int:style_id>', methods=['PUT'])
@login_required
def style_mods(style_id):
    """
    Modifies an existing style.
    """
    style = Style.query.get(style_id)
    if not style:
        return jsonify({'error': "The style you're looking for is unavailable"}), 404
    if current_user.id != style.user_id:
        return jsonify({'error': "Sorry, but you're unauthorized to edit this post"}), 403
# Ensure that the CSRF token in the form matches the token stored in the cookies. This is CRUCIAL for CSRF protection
    form = StyleForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        style.title = form.data['title']
        style.updated_at = datetime.now(timezone.utc)
        db.session.commit()
        return style.to_dict()
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400

# DELETE/style
@styles_bp.route('/<int:style_id>', methods=['DELETE'])
@login_required
def delete_style(style_id):
    style = Style.query.get(style_id)
    if style is None:
        return jsonify({'error': "The style you're looking for is unavailable"}), 404
    if current_user.id != style.user_id:
        return jsonify({'error': "Sorry, but you're unauthorized to delete this style"}), 401
    # delete
    db.session.delete(style)
    db.session.commit()
    return jsonify({'message': 'Successfully deleted'})