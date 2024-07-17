from app.models import db, Style, environment, SCHEMA
from sqlalchemy.sql import text

def seed_styles():
    style1 = Style(
        title="Autumn Casual Outfit", user_id=1)
    style2 = Style(
        title="Business Casual Outfit", user_id=1)

    db.session.add(style1)
    db.session.add(style2)

    db.session.commit()

def undo_styles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM styles"))
    db.session.commit()
