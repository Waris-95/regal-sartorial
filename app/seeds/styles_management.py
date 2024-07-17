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
        StyleItem(style_id=2, product_type_id=24),
        StyleItem(style_id=3, product_type_id=2),
        StyleItem(style_id=3, product_type_id=7),
        StyleItem(style_id=3, product_type_id=13),
        StyleItem(style_id=3, product_type_id=18),
        StyleItem(style_id=4, product_type_id=5),
        StyleItem(style_id=4, product_type_id=8),
        StyleItem(style_id=4, product_type_id=22),
        StyleItem(style_id=5, product_type_id=9),
        StyleItem(style_id=5, product_type_id=12),
        StyleItem(style_id=5, product_type_id=40),
        StyleItem(style_id=6, product_type_id=10),
        StyleItem(style_id=6, product_type_id=23),
        StyleItem(style_id=6, product_type_id=34)
    ]

    db.session.bulk_save_objects(style_items)
    db.session.commit()

def undo_style_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.style_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM style_items"))
    db.session.commit()
