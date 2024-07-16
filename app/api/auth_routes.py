from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .utils import validation_errors_to_error_messages
from flask_wtf.csrf import generate_csrf
import os
from sqlalchemy.exc import IntegrityError

auth_routes = Blueprint('auth', __name__)

@auth_routes.route('/restore')
def restore_csrf():
    response = jsonify({'message': 'CSRF token generated'})
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        samesite='Strict',
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False
    )
    return response


@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.user_orders()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    csrf_token = request.cookies.get('csrf_token')
    form['csrf_token'].data = csrf_token

    if form.validate_on_submit():
        user = User(
            first_name=form.data['firstName'],
            last_name=form.data['lastName'],
            email=form.data['email'],
            password=form.data['password']
        )
        try:
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        except IntegrityError:
            db.session.rollback()
            return {'errors': {'email': 'Email is already in use.'}}, 400

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': {'message': 'Unauthorized'}}, 401
