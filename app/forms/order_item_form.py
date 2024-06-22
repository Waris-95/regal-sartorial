from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired
from app.models import OrderItem

class OrderItemForm(FlaskForm):
    product_type_id= IntegerField('product_type_id', validators=[DataRequired()])
    product_id= IntegerField('product_id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    size = StringField('size', validators=[DataRequired()])
    color = StringField('color', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    total_price = FloatField('total_price', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])