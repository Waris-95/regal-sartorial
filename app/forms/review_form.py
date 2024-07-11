from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Review

# Review form
class ReviewForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    rating = StringField('rating', validators=[DataRequired()])