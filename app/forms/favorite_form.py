from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError

# fav form
class FavoriteForm(FlaskForm):
    userId = IntegerField('userId', validators=[DataRequired()])
    productId = IntegerField('productId', validators=[DataRequired()])