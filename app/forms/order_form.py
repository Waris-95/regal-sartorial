from app.models import Order
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired
from app.models import Order

# order form
class OrderForm(FlaskForm):
    status = StringField('status', validators=[DataRequired()])