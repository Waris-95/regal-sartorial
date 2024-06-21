from app.models import db, OrderItem, environment, SCHEMA
from sqlalchemy.sql import text

def seed_order_items():
    ord1 = OrderItem(
        order_id=1,
        product_id=1,
        product_type_id=1,
        price=299.99,
        quantity=1,
        total_price=299.99,
        color="Navy",
        size="Small",
        image="https://m.media-amazon.com/images/I/51Y2dWywlbL._AC_SX679_.jpg",
        name="Navy Slim Fit Suit"
    )
    db.session.add(ord1)
    db.session.commit()

def undo_order_items():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM order_items;"))
    db.session.commit()
