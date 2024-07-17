from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    reviews = [
        Review(user_id=1, product_type_id=1, description="The Navy Slim Fit Suit fits perfectly and looks very sharp. Highly recommend!", rating=5),
        Review(user_id=2, product_type_id=2, description="The Charcoal blazer is great, but the fit was a bit off for me. I suggest trying a size up.", rating=4),
        Review(user_id=3, product_type_id=3, description="The Black Tuxedo fits perfectly and looks very elegant. Highly recommended for formal events.", rating=5),
        Review(user_id=1, product_type_id=4, description="The Grey Three Piece Suit is fantastic! It fits well and looks elegant.", rating=5),
        Review(user_id=2, product_type_id=5, description="The Light Blue Slim Fit Suit is perfect for summer events. Very comfortable.", rating=4),
        Review(user_id=3, product_type_id=6, description="The Brown Corduroy Pants are perfect for casual wear. But, they did start to shrink after the first wash, and material did start fading after 2-3 machine washes", rating=3),
        Review(user_id=1, product_type_id=7, description="The Black Wool Trousers are perfect for formal and business attire. Very comfortable.", rating=4),
        Review(user_id=2, product_type_id=8, description="The Navy Chinos are suitable for casual and smart-casual occasions. Great fit!", rating=4),
        Review(user_id=3, product_type_id=9, description="The Grey Flannel Trousers are perfect for winter wear. Very warm and comfortable.", rating=5),
        Review(user_id=1, product_type_id=10, description="The Beige Slim Fit Pants are great for both casual and formal settings. Very versatile.", rating=4),
        Review(user_id=2, product_type_id=11, description="The Dark Green Slim Fit Suit is ideal for formal events. Great fit!", rating=5),
        Review(user_id=3, product_type_id=12, description="The Burgundy Dinner Jacket is perfect for evening events. Very stylish.", rating=5),
        Review(user_id=1, product_type_id=13, description="The Tan Double Breasted Blazer is stylish for any occasion. Great quality!", rating=5),
        Review(user_id=2, product_type_id=14, description="The White Dress Shirt is a classic and a staple for any wardrobe.", rating=5),
        Review(user_id=3, product_type_id=15, description="The Black Dress Shirt is perfect for formal and semi-formal wear. Great fit!", rating=4),
        Review(user_id=1, product_type_id=16, description="The Grey Suit Vest is perfect for a three-piece suit. Very stylish.", rating=4),
        Review(user_id=2, product_type_id=17, description="The Navy Dress Pants are ideal for business and formal events. Very comfortable.", rating=4),
        Review(user_id=3, product_type_id=18, description="The Brown Leather Belt is perfect for any outfit. Great quality!", rating=5),
        Review(user_id=1, product_type_id=19, description="The Black Leather Shoes are essential for formal occasions. Very comfortable.", rating=5),
        Review(user_id=2, product_type_id=20, description="The Blue Silk Tie adds a touch of elegance to any outfit. Highly recommended!", rating=4),
        Review(user_id=3, product_type_id=21, description="The Grey Pinstripe Suit is ideal for formal events. Great fit and quality.", rating=5),
        Review(user_id=1, product_type_id=22, description="The Beige Linen Blazer is perfect for summer events. Very stylish and comfortable.", rating=4),
        Review(user_id=2, product_type_id=23, description="The White Tuxedo Shirt is essential for black-tie events. Great quality.", rating=5),
        Review(user_id=3, product_type_id=24, description="The Black Dress Oxfords are perfect for formal occasions. Very comfortable.", rating=5),
        Review(user_id=1, product_type_id=25, description="The Navy Paisley Tie adds a touch of elegance to any suit. Great quality!", rating=4),
        Review(user_id=2, product_type_id=26, description="The Tan Slim Fit Blazer is stylish for any occasion. Great quality and fit.", rating=5),
        Review(user_id=3, product_type_id=27, description="The Black Suit Jacket is perfect for business and formal events. Very stylish.", rating=4),
        Review(user_id=1, product_type_id=28, description="The Grey Slim Fit Pants are ideal for both casual and formal settings. Great quality.", rating=4),
        Review(user_id=2, product_type_id=29, description="The Blue Cotton Dress Shirt is essential for any wardrobe. Great quality.", rating=5),
        Review(user_id=3, product_type_id=30, description="The Brown Oxford Shoes are perfect for formal occasions. Very comfortable.", rating=5),
        Review(user_id=1, product_type_id=31, description="The Grey Plaid Suit is stylish for any formal event. Great fit and quality.", rating=5),
        Review(user_id=2, product_type_id=32, description="The White Dress Shoes are perfect for summer events. Very stylish and comfortable.", rating=4),
        Review(user_id=3, product_type_id=33, description="The Maroon Silk Tie adds a touch of sophistication to any outfit. Great quality.", rating=5),
        Review(user_id=1, product_type_id=34, description="The Navy Dress Socks are perfect for formal wear. Very comfortable.", rating=5),
        Review(user_id=2, product_type_id=35, description="The White Slim Fit Shirt is essential for any wardrobe. Great quality.", rating=4),
        Review(user_id=3, product_type_id=36, description="The Black Suit Vest is perfect for a three-piece suit. Very stylish.", rating=4),
        Review(user_id=1, product_type_id=37, description="The Grey Suit Pants are ideal for formal and business attire. Very comfortable.", rating=4),
        Review(user_id=2, product_type_id=38, description="The Tan Leather Shoes are perfect for formal occasions. Great quality and fit.", rating=5),
        Review(user_id=3, product_type_id=39, description="The Navy Wool Blazer is stylish for any occasion. Great quality and fit.", rating=5),
        Review(user_id=1, product_type_id=40, description="The Grey Dress Shoes are perfect for formal occasions. Very comfortable.", rating=5),
        Review(user_id=2, product_type_id=41, description="The Blue Pinstripe Suit is ideal for formal events. Great fit and quality.", rating=5),
        Review(user_id=3, product_type_id=42, description="The White Dress Belt is perfect for any outfit. Great quality.", rating=5),

        # Additional reviews
        Review(user_id=2, product_type_id=1, description="Loved the material and fit of the Navy Slim Fit Suit. It exceeded my expectations.", rating=5),
        Review(user_id=3, product_type_id=2, description="The Charcoal blazer needed some adjustments, but overall it's a good purchase.", rating=3),
        Review(user_id=1, product_type_id=3, description="The Black Tuxedo was perfect for my wedding. Highly recommend.", rating=5),
        Review(user_id=3, product_type_id=4, description="The Grey Three Piece Suit makes me feel confident and stylish.", rating=5),
        Review(user_id=1, product_type_id=5, description="The Light Blue Slim Fit Suit is lightweight and comfortable, perfect for summer.", rating=4),
        Review(user_id=2, product_type_id=6, description="The Brown Corduroy Pants faded a bit after washing, but still comfortable.", rating=3),
        Review(user_id=3, product_type_id=7, description="The Black Wool Trousers are versatile and comfortable for all-day wear.", rating=4),
        Review(user_id=1, product_type_id=8, description="The Navy Chinos have a nice fit and can be dressed up or down.", rating=4),
        Review(user_id=2, product_type_id=9, description="The Grey Flannel Trousers are my go-to for colder days.", rating=5),
        Review(user_id=3, product_type_id=10, description="The Beige Slim Fit Pants are stylish and fit well.", rating=4),
        Review(user_id=1, product_type_id=11, description="The Dark Green Slim Fit Suit was a great addition to my wardrobe.", rating=5),
        Review(user_id=2, product_type_id=12, description="The Burgundy Dinner Jacket received many compliments. Very happy with the purchase.", rating=5),
        Review(user_id=3, product_type_id=13, description="The Tan Double Breasted Blazer is a standout piece. Great quality.", rating=5),
        Review(user_id=1, product_type_id=14, description="The White Dress Shirt fits well and looks great with any suit.", rating=5),
        Review(user_id=2, product_type_id=15, description="The Black Dress Shirt is sleek and stylish. Perfect for formal events.", rating=4),
        Review(user_id=3, product_type_id=16, description="The Grey Suit Vest completed my look. Very satisfied.", rating=4),
        Review(user_id=1, product_type_id=17, description="The Navy Dress Pants are a staple in my wardrobe. Comfortable and stylish.", rating=4),
        Review(user_id=2, product_type_id=18, description="The Brown Leather Belt is of high quality and complements my outfits perfectly.", rating=5),
        Review(user_id=3, product_type_id=19, description="The Black Leather Shoes are very comfortable and look great.", rating=5),
        Review(user_id=1, product_type_id=20, description="The Blue Silk Tie adds a touch of sophistication to my suits.", rating=4),
        Review(user_id=2, product_type_id=21, description="The Grey Pinstripe Suit is classy and fits perfectly.", rating=5),
        Review(user_id=3, product_type_id=22, description="The Beige Linen Blazer is perfect for warmer weather. Very stylish.", rating=4),
        Review(user_id=1, product_type_id=23, description="The White Tuxedo Shirt is of high quality and fits well.", rating=5),
        Review(user_id=2, product_type_id=24, description="The Black Dress Oxfords are stylish and comfortable.", rating=5),
        Review(user_id=3, product_type_id=25, description="The Navy Paisley Tie adds a nice touch to my suits. Great quality.", rating=4),
        Review(user_id=1, product_type_id=26, description="The Tan Slim Fit Blazer is very stylish and fits perfectly.", rating=5),
        Review(user_id=2, product_type_id=27, description="The Black Suit Jacket is elegant and well-made.", rating=4),
        Review(user_id=3, product_type_id=28, description="The Grey Slim Fit Pants are versatile and fit well.", rating=4),
        Review(user_id=1, product_type_id=29, description="The Blue Cotton Dress Shirt is comfortable and looks great.", rating=5),
        Review(user_id=2, product_type_id=30, description="The Brown Oxford Shoes are stylish and very comfortable.", rating=5),
        Review(user_id=3, product_type_id=31, description="The Grey Plaid Suit is a great fit and looks fantastic.", rating=5),
        Review(user_id=1, product_type_id=32, description="The White Dress Shoes are perfect for summer events. Very stylish.", rating=4),
        Review(user_id=2, product_type_id=33, description="The Maroon Silk Tie adds a touch of class to my suits.", rating=5),
        Review(user_id=3, product_type_id=34, description="The Navy Dress Socks are comfortable and perfect for formal wear.", rating=5),
        Review(user_id=1, product_type_id=35, description="The White Slim Fit Shirt is a great addition to my wardrobe.", rating=4),
        Review(user_id=2, product_type_id=36, description="The Black Suit Vest is stylish and fits well.", rating=4),
        Review(user_id=3, product_type_id=37, description="The Grey Suit Pants are very comfortable and fit well.", rating=4),
        Review(user_id=1, product_type_id=38, description="The Tan Leather Shoes are of high quality and look great.", rating=5),
        Review(user_id=2, product_type_id=39, description="The Navy Wool Blazer is stylish and fits perfectly.", rating=5),
        Review(user_id=3, product_type_id=40, description="The Grey Dress Shoes are very comfortable and stylish.", rating=5),
        Review(user_id=1, product_type_id=41, description="The Blue Pinstripe Suit is elegant and fits well.", rating=5),
        Review(user_id=2, product_type_id=42, description="The White Dress Belt is a great addition to my wardrobe. High quality.", rating=5),
    ]

    db.session.bulk_save_objects(reviews)
    db.session.commit()

def undo_reviews():
    print(f"Current environment: {environment}")
    
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews;"))
    db.session.commit()
