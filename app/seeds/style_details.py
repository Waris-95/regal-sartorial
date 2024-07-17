from app.models import db, Style, environment, SCHEMA
from sqlalchemy.sql import text

def seed_styles():
    style1 = Style(
        title="Autumn Casual Outfit", user_id=1)
    style2 = Style(
        title="Date Night Outfit", user_id=1)
    style3 = Style(
        title="Business Formal", user_id=1)
    style4 = Style(
        title="Summer Beach Wear", user_id=1)
    style5 = Style(
        title="Winter Warmth", user_id=1)
    style6 = Style(
        title="Spring Picnic", user_id=1)

    db.session.add(style1)
    db.session.add(style2)
    db.session.add(style3)
    db.session.add(style4)
    db.session.add(style5)
    db.session.add(style6)

    db.session.commit()

def undo_styles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.styles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM styles"))
    db.session.commit()
