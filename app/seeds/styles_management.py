from app.models import db, StyleItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_style_items():
    style_items = [
        StyleItem(style_id=1, product_type_id=1),
        StyleItem(style_id=1, product_type_id=6),
        StyleItem(style_id=1, product_type_id=14),
        StyleItem(style_id=1, product_type_id=19),
        StyleItem(style_id=2, product_type_id=3),
        StyleItem(style_id=2, product_type_id=20),
        StyleItem(style_id=2, product_type_id=24)
    ]

    db.session.bulk_save_objects(style_items)
    db.session.commit()

def undo_style_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.style_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM style_items"))
    db.session.commit()
