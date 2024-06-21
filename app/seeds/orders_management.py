from app.models import db, Order, environment, SCHEMA
from sqlalchemy.sql import text

def seed_orders():
    ord1 = Order(
        status="confirmed", price=250, tax=15.99, total_price=265.99, user_id=1)
    db.session.add(ord1)
    db.session.commit()

def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM orders;"))
    db.session.commit()
