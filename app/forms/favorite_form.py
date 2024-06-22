from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired
from app.models import Favorite

# fav form
class FavoriteForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    productId = IntegerField('productId', validators=[DataRequired()])