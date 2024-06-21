from app.models import db, ProductType, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_types():
    product_type1 = ProductType(
        name="Navy Slim Fit Suit",
        description="A navy slim fit suit, perfect for formal occasions.",
        category="Suits",
        price=299.99)
    product_type2 = ProductType(
        name="Charcoal Classic Fit Suit",
        description="A charcoal classic fit suit, ideal for business and formal events.",
        category="Suits",
        price=249.99)
    product_type3 = ProductType(
        name="Black Tuxedo",
        description="A black tuxedo, essential for black-tie events.",
        category="Suits",
        price=399.99)
    product_type4 = ProductType(
        name="Grey Three Piece Suit",
        description="A grey three-piece suit, perfect for weddings and formal gatherings.",
        category="Suits",
        price=349.99)
    product_type5 = ProductType(
        name="Light Blue Slim Fit Suit",
        description="A light blue slim fit suit, great for summer events.",
        category="Suits",
        price=279.99)
    product_type6 = ProductType(
        name="Brown Corduroy Pants",
        description="Brown corduroy pants, perfect for casual and semi-formal wear.",
        category="Pants",
        price=89.99)
    product_type7 = ProductType(
        name="Black Wool Trousers",
        description="Black wool trousers, ideal for formal and business attire.",
        category="Pants",
        price=109.99)
    product_type8 = ProductType(
        name="Navy Chinos",
        description="Navy chinos, suitable for casual and smart-casual occasions.",
        category="Pants",
        price=69.99)
    product_type9 = ProductType(
        name="Grey Flannel Trousers",
        description="Grey flannel trousers, perfect for winter wear.",
        category="Pants",
        price=119.99)
    product_type10 = ProductType(
        name="Beige Slim Fit Pants",
        description="Beige slim fit pants, great for both casual and formal settings.",
        category="Pants",
        price=79.99)
    product_type11 = ProductType(
        name="Dark Green Slim Fit Suit",
        description="A dark green slim fit suit, ideal for formal events.",
        category="Suits",
        price=299.99)
    product_type12 = ProductType(
        name="Burgundy Dinner Jacket",
        description="A burgundy dinner jacket, perfect for evening events.",
        category="Jackets",
        price=199.99)
    product_type13 = ProductType(
        name="Tan Double Breasted Blazer",
        description="A tan double-breasted blazer, stylish for any occasion.",
        category="Jackets",
        price=159.99)
    product_type14 = ProductType(
        name="White Dress Shirt",
        description="A classic white dress shirt, a staple for any wardrobe.",
        category="Shirts",
        price=49.99)
    product_type15 = ProductType(
        name="Black Dress Shirt",
        description="A black dress shirt, perfect for formal and semi-formal wear.",
        category="Shirts",
        price=49.99)
    product_type16 = ProductType(
        name="Grey Suit Vest",
        description="A grey suit vest, perfect for a three-piece suit.",
        category="Vests",
        price=69.99)
    product_type17 = ProductType(
        name="Navy Dress Pants",
        description="Navy dress pants, ideal for business and formal events.",
        category="Pants",
        price=79.99)
    product_type18 = ProductType(
        name="Brown Leather Belt",
        description="A brown leather belt, perfect for any outfit.",
        category="Accessories",
        price=29.99)
    product_type19 = ProductType(
        name="Black Leather Shoes",
        description="Black leather shoes, essential for formal occasions.",
        category="Shoes",
        price=129.99)
    product_type20 = ProductType(
        name="Blue Silk Tie",
        description="A blue silk tie, perfect for adding a touch of elegance.",
        category="Accessories",
        price=39.99)
    product_type21 = ProductType(
        name="Grey Pinstripe Suit",
        description="A grey pinstripe suit, ideal for formal events.",
        category="Suits",
        price=349.99)
    product_type22 = ProductType(
        name="Beige Linen Blazer",
        description="A beige linen blazer, perfect for summer events.",
        category="Jackets",
        price=179.99)
    product_type23 = ProductType(
        name="White Tuxedo Shirt",
        description="A white tuxedo shirt, essential for black-tie events.",
        category="Shirts",
        price=59.99)
    product_type24 = ProductType(
        name="Black Dress Oxfords",
        description="Black dress oxfords, perfect for formal occasions.",
        category="Shoes",
        price=139.99)
    product_type25 = ProductType(
        name="Navy Paisley Tie",
        description="A navy paisley tie, adds a touch of elegance to any suit.",
        category="Accessories",
        price=34.99)
    product_type26 = ProductType(
        name="Tan Slim Fit Blazer",
        description="A tan slim fit blazer, stylish for any occasion.",
        category="Jackets",
        price=189.99)
    product_type27 = ProductType(
        name="Black Suit Jacket",
        description="A black suit jacket, perfect for business and formal events.",
        category="Jackets",
        price=199.99)
    product_type28 = ProductType(
        name="Grey Slim Fit Pants",
        description="Grey slim fit pants, ideal for both casual and formal settings.",
        category="Pants",
        price=89.99)
    product_type29 = ProductType(
        name="Blue Cotton Dress Shirt",
        description="A blue cotton dress shirt, essential for any wardrobe.",
        category="Shirts",
        price=54.99)
    product_type30 = ProductType(
        name="Brown Oxford Shoes",
        description="Brown oxford shoes, perfect for formal occasions.",
        category="Shoes",
        price=119.99)
    product_type31 = ProductType(
        name="Grey Plaid Suit",
        description="A grey plaid suit, stylish for any formal event.",
        category="Suits",
        price=329.99)
    product_type32 = ProductType(
        name="White Dress Shoes",
        description="White dress shoes, perfect for summer events.",
        category="Shoes",
        price=149.99)
    product_type33 = ProductType(
        name="Maroon Silk Tie",
        description="A maroon silk tie, adds a touch of sophistication.",
        category="Accessories",
        price=44.99)
    product_type34 = ProductType(
        name="Navy Dress Socks",
        description="Navy dress socks, perfect for formal wear.",
        category="Accessories",
        price=14.99)
    product_type35 = ProductType(
        name="White Slim Fit Shirt",
        description="A white slim fit shirt, essential for any wardrobe.",
        category="Shirts",
        price=49.99)
    product_type36 = ProductType(
        name="Black Suit Vest",
        description="A black suit vest, perfect for a three-piece suit.",
        category="Vests",
        price=69.99)
    product_type37 = ProductType(
        name="Grey Suit Pants",
        description="Grey suit pants, ideal for formal and business attire.",
        category="Pants",
        price=89.99)
    product_type38 = ProductType(
        name="Tan Leather Shoes",
        description="Tan leather shoes, perfect for formal occasions.",
        category="Shoes",
        price=129.99)
    product_type39 = ProductType(
        name="Navy Wool Blazer",
        description="A navy wool blazer, stylish for any occasion.",
        category="Jackets",
        price=209.99)
    product_type40 = ProductType(
        name="Grey Dress Shoes",
        description="Grey dress shoes, perfect for formal occasions.",
        category="Shoes",
        price=139.99)
    product_type41 = ProductType(
        name="Blue Pinstripe Suit",
        description="A blue pinstripe suit, ideal for formal events.",
        category="Suits",
        price=349.99)
    product_type42 = ProductType(
        name="White Dress Belt",
        description="A white dress belt, perfect for any outfit.",
        category="Accessories",
        price=34.99)

    db.session.add(product_type1)
    db.session.add(product_type2)
    db.session.add(product_type3)
    db.session.add(product_type4)
    db.session.add(product_type5)
    db.session.add(product_type6)
    db.session.add(product_type7)
    db.session.add(product_type8)
    db.session.add(product_type9)
    db.session.add(product_type10)
    db.session.add(product_type11)
    db.session.add(product_type12)
    db.session.add(product_type13)
    db.session.add(product_type14)
    db.session.add(product_type15)
    db.session.add(product_type16)
    db.session.add(product_type17)
    db.session.add(product_type18)
    db.session.add(product_type19)
    db.session.add(product_type20)
    db.session.add(product_type21)
    db.session.add(product_type22)
    db.session.add(product_type23)
    db.session.add(product_type24)
    db.session.add(product_type25)
    db.session.add(product_type26)
    db.session.add(product_type27)
    db.session.add(product_type28)
    db.session.add(product_type29)
    db.session.add(product_type30)
    db.session.add(product_type31)
    db.session.add(product_type32)
    db.session.add(product_type33)
    db.session.add(product_type34)
    db.session.add(product_type35)
    db.session.add(product_type36)
    db.session.add(product_type37)
    db.session.add(product_type38)
    db.session.add(product_type39)
    db.session.add(product_type40)
    db.session.add(product_type41)
    db.session.add(product_type42)

    db.session.commit()

def undo_product_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_types"))
    db.session.commit()
