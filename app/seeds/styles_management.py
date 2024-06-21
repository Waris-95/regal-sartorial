from app.models import db, StyleItem, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_style_items():
    wardrobe1 = StyleItem(
        style_id=1, product_type_id=1)
    wardrobe2 = StyleItem(
        style_id=1, product_type_id=2)
    wardrobe3 = StyleItem(
        style_id=1, product_type_id=3)
    wardrobe4 = StyleItem(
        style_id=1, product_type_id=4)
    wardrobe5 = StyleItem(
        style_id=2, product_type_id=1)
    wardrobe6 = StyleItem(
        style_id=2, product_type_id=2)


    db.session.add(wardrobe1)
    db.session.add(wardrobe2)
    db.session.add(wardrobe3)
    db.session.add(wardrobe4)
    db.session.add(wardrobe5)
    db.session.add(wardrobe6)



    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_style_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.style_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM style_items"))
    db.session.commit()