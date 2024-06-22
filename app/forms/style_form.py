from flask_wtf import FlaskForm 
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Style

def style_title_exits(form, field):
    title = field.data
    style = Style.query.filter(Style.title == title).first()
    if style:
        raise ValidationError('A wardrobe with this title exists, please create a new one')
    
class StyleForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(),
                                             style_title_exits, Length(max=60)])