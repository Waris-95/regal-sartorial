from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy import text

def seed_favorites():
    favorite1 = Favorite(
        user_id=1, product_id=1, product_type_id=1,
        image="https://www.mrporter.com/variants/images/1647597340198467/ou/w1200_q60.jpg",
    )
    db.session.add(favorite1)
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites;"))
    db.session.commit()
