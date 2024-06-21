from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
# from datetime import datetime, timezone

def seed_products():
    navy_slim_fit_suit = Product(
        product_type_id=1, color="Navy",
        image1="https://www.mrporter.com/variants/images/1647597340198467/in/w1200_q60.jpg",
        image2="https://www.mrporter.com/variants/images/1647597340198467/ou/w1200_q60.jpg",
        image3="https://www.mrporter.com/variants/images/1647597340198467/cu/w1200_q60.jpg",
        image4="https://www.mrporter.com/variants/images/1647597340198467/e2/w1200_q60.jpg",
        stock=50)
    charcoal_classic_fit_suit = Product(
        product_type_id=1, color="Charcoal",
        image1="https://image.josbank.com/is/image/JosBank/3XHX_06_JOSEPH_A_BANK_CHARCOAL_MAIN?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image2="https://image.josbank.com/is/image/JosBank/3XHX_06_JOSEPH_A_BANK_CHARCOAL_ALT1?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image3="https://image.josbank.com/is/image/JosBank/3XHX_06_JOSEPH_A_BANK_CHARCOAL_ALT5?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image4="https://image.josbank.com/is/image/JosBank/3XHX_06_JOSEPH_A_BANK_CHARCOAL_ALT9?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        stock=60)
    black_tuxedo = Product(
        product_type_id=2, color="Black",
        image1="https://cdn.media.amplience.net/i/brooksbrothers/MZ00102_BLACK?$large$&fmt=auto",
        image2="https://cdn.media.amplience.net/i/brooksbrothers/MZ00102_BLACK_2?$large$&fmt=auto",
        image3="https://cdn.media.amplience.net/i/brooksbrothers/MZ00102_BLACK_4?$large$&fmt=auto",
        image4="https://cdn.media.amplience.net/i/brooksbrothers/MZ00102_BLACK_5?$large$&fmt=auto",
        stock=30)
    grey_three_piece_suit = Product(
        product_type_id=1, color="Grey",
        image1="https://media.kohlsimg.com/is/image/kohls/6838147_Grey?wid=805&hei=805&op_sharpen=1",
        image2="https://i.pinimg.com/originals/73/37/b6/7337b65433a7202e38e51c7882d2edc3.jpg",
        image3="https://th.bing.com/th/id/R.605b37731a276a5f7217106eb63bf617?rik=%2ftyeoewpz7S9fw&pid=ImgRaw&r=0",
        image4="https://ak1.ostkcdn.com/images/products/6669014/Bertolini-Mens-Light-Gray-Wool-Silk-3-Piece-Vested-Suit-L14227136.jpg",
        stock=40)
    light_blue_slim_fit_suit = Product(
        product_type_id=1, color="LightBlue",
        image1="https://m.media-amazon.com/images/I/61L7nhB6IFL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/61DpbH6yd6L._AC_SY879_.jpg",
        image3="https://example.com/light-blue-slim-fit-suit3.jpg",
        image4="https://example.com/light-blue-slim-fit-suit4.jpg",
        stock=45)
    brown_corduroy_pants = Product(
        product_type_id=3, color="Brown",
        image1="https://m.media-amazon.com/images/I/71V5oWw3owL._AC_CR0%2C0%2C0%2C0_SX960_SY720_.jpg",
        image2="https://m.media-amazon.com/images/I/612UxnjOGrL._AC_CR0%2C0%2C0%2C0_SX960_SY720_.jpg",
        image3="https://m.media-amazon.com/images/I/619m+nb0SAL._AC_CR0%2C0%2C0%2C0_SX960_SY720_.jpg",
        image4="https://m.media-amazon.com/images/I/619m+nb0SAL._AC_CR0%2C0%2C0%2C0_SX960_SY720_.jpg",
        stock=100)
    black_wool_trousers = Product(
        product_type_id=3, color="Black",
        image1="https://m.media-amazon.com/images/I/619m+nb0SAL._AC_CR0%2C0%2C0%2C0_SX960_SY720_.jpg",
        image2="https://image.josbank.com/is/image/JosBank/3XRT_01_JOSEPH_A_BANK_BLACK_ALT2?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image3="https://image.josbank.com/is/image/JosBank/22WL_01_TRAVELER_BLACK_ALT1?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image4="https://image.josbank.com/is/image/JosBank/22WN_01_TRAVELER_BLACK_MAIN?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        stock=90)
    navy_chinos = Product(
        product_type_id=3, color="Navy",
        image1="https://image.josbank.com/is/image/JosBank/22XU_75_TRAVELER_NAVY_MAIN?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image2="https://image.josbank.com/is/image/JosBank/22XU_75_TRAVELER_NAVY_ALT2?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image3="https://image.josbank.com/is/image/JosBank/22WN_70_TRAVELER_BLUE_MAIN?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        image4="https://image.josbank.com/is/image/JosBank/22WN_70_TRAVELER_BLUE_ALT1?$JABPDPSharpen$&hei=1080&wid=800&align=0,-1",
        stock=110)
    grey_flannel_trousers = Product(
        product_type_id=3, color="Grey",
        image1="https://twicpics.celine.com/product-prd/images/large/2P085106W.09ME_1_FW23_M.jpg?twic=v1/cover=1:1/resize-max=900",
        image2="https://twicpics.celine.com/product-prd/images/large/2P085106W.09ME_2_FW23_M.jpg?twic=v1/cover=1:1/resize-max=900",
        image3="https://twicpics.celine.com/product-prd/images/large/2P085106W.09ME_3_FW23_M.jpg?twic=v1/cover=1620x1620/max=2000",
        image4="https://twicpics.celine.com/product-prd/images/large/2P085503R.38GK_3_WIN22.jpg?twic=v1/cover=1620x1620/max=2000",
        stock=80)
    beige_slim_fit_pants = Product(
        product_type_id=3, color="Beige",
        image1="https://images.lululemon.com/is/image/lululemon/LM5ABNS_043731_1?wid=2420&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
        image2="https://images.lululemon.com/is/image/lululemon/LM5ABNS_043731_2?wid=2420&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
        image3="https://images.lululemon.com/is/image/lululemon/LM5ABNS_043731_4?wid=2420&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
        image4="https://images.lululemon.com/is/image/lululemon/LM5ABNS_043731_6?wid=2420&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
        stock=120)
    dark_green_slim_fit_suit = Product(
        product_type_id=1, color="DarkGreen",
        image1="https://m.media-amazon.com/images/I/41dC1qY1EaL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/41pt+C89tsL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/51mYKlbb4oL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/51bBeU36rgL._AC_SX679_.jpg",
        stock=50)
    burgundy_dinner_jacket = Product(
        product_type_id=1, color="Burgundy",
        image1="https://m.media-amazon.com/images/I/6126UXhOFCL._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/61FpXwudMoL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/61R3OBfOioL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/81W81NGArPL._AC_SX679_.jpg",
        stock=60)
    tan_double_breasted_blazer = Product(
        product_type_id=2, color="Tan",
        image1="https://m.media-amazon.com/images/I/71CgQSuEp2L._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/61fkbyx-FlL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/81lHNiSvZkS._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/71PPOWsC-ZL._AC_SX679_.jpg",
        stock=70)
    white_dress_shirt = Product(
        product_type_id=4, color="White",
        image1="https://m.media-amazon.com/images/I/71NwsIcX-6L._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/71KREThTNwL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/51BWAIubieL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/71dHdyDbnhL._AC_SX679_.jpg",
        stock=150)
    black_dress_shirt = Product(
        product_type_id=4, color="Black",
        image1="https://m.media-amazon.com/images/I/712iPWK4S6L._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/71LVK2iW36L._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/81grco2FhaL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/71XVpxPIDwL._AC_SX679_.jpg",
        stock=140)
    grey_suit_vest = Product(
        product_type_id=5, color="Grey",
        image1="https://m.media-amazon.com/images/I/718aKR3FvUL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/71aKw-3h3kL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/71+fokznQjL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/71OFjyL4IAL._AC_SX679_.jpg",
        stock=75)
    navy_dress_pants = Product(
        product_type_id=6, color="Navy",
        image1="https://m.media-amazon.com/images/I/61E1CdXmdkL._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/51k0HV9x3GL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/61K5TsrV0hL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/71SO-kP0K5L._AC_SY879_.jpg",
        stock=95)
    brown_leather_belt = Product(
        product_type_id=7, color="Brown",
        image1="https://m.media-amazon.com/images/I/81hnOL0a49L._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/81lBsPmoesL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/91nxM4dennL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/81J9IWbrB6L._AC_SX679_.jpg",
        stock=200)
    black_leather_shoes = Product(
        product_type_id=8, color="Black",
        image1="https://m.media-amazon.com/images/I/81zqrHuWkZL._AC_SY695_.jpg",
        image2="https://m.media-amazon.com/images/I/71CYdN-kvIL._AC_SY695_.jpg",
        image3="https://m.media-amazon.com/images/I/81ieUM0mu-L._AC_SY695_.jpg",
        image4="https://m.media-amazon.com/images/I/812rERIX7jL._AC_SY695_.jpg",
        stock=80)
    blue_silk_tie = Product(
        product_type_id=9, color="Blue",
        image1="https://m.media-amazon.com/images/I/71iHvMgZbVL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/81n0E3i0SZL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/71Kf54yd4bL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/81TMlXP4BhL._AC_SX679_.jpg",
        stock=180)
    grey_pinstripe_suit = Product(
        product_type_id=1, color="Grey",
        image1="https://m.media-amazon.com/images/I/71vh4qmhN3S._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/71nAXirRfrS._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/71Dbe1CDOPS._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/81sadj7fGcS._AC_SX679_.jpg",
        stock=40)
    beige_linen_blazer = Product(
        product_type_id=2, color="Beige",
        image1="https://m.media-amazon.com/images/I/5123+wSdetL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/71ffAGCCHoL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/61i0g-lHETL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/61b8i1jk8jL._AC_SX679_.jpg",
        stock=65)
    white_tuxedo_shirt = Product(
        product_type_id=4, color="White",
        image1="https://m.media-amazon.com/images/I/516djRJE-AL._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/51U7+PLAC-L._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/61rOhvA+Y0L._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/61Ew6+U95tL._AC_SX679_.jpg",
        stock=120)
    black_dress_oxfords = Product(
        product_type_id=8, color="Black",
        image1="https://m.media-amazon.com/images/I/41tXsYepy5L._AC_SY695_.jpg",
        image2="https://m.media-amazon.com/images/I/51sujYeMuhL._AC_SY695_.jpg",
        image3="https://m.media-amazon.com/images/I/41UzRh0uReL._AC_SY695_.jpg",
        image4="https://m.media-amazon.com/images/I/412gI0UYXpL._AC_SY695_.jpg",
        stock=90)
    navy_paisley_tie = Product(
        product_type_id=9, color="Navy",
        image1="https://m.media-amazon.com/images/I/71uFQ-gjCmS._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/81gvMWtfEHS._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/81Q1KqtzefL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/81gvMWtfEHS._AC_SX679_.jpg",
        stock=150)
    tan_slim_fit_blazer = Product(
        product_type_id=2, color="Tan",
        image1="https://m.media-amazon.com/images/I/8165pvm7fLL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/812BYxER3iL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/81tfOAsR03L._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/81hoAP5aRuL._AC_SY879_.jpg",
        stock=70)
    black_suit_jacket = Product(
        product_type_id=2, color="Black",
        image1="https://m.media-amazon.com/images/I/710kq+I94eL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/71q3sZNJjXL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/618410CyEhL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/81UfBnRq16L._AC_SY879_.jpg",
        stock=85)
    grey_slim_fit_pants = Product(
        product_type_id=3, color="Grey",
        image1="https://m.media-amazon.com/images/I/61YTgrbbOsL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/713smytumHL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/61RNhfeOIpL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/61vfMxV0x+L._AC_SY879_.jpg",
        stock=100)
    blue_cotton_dress_shirt = Product(
        product_type_id=4, color="Blue",
        image1="https://m.media-amazon.com/images/I/71ooP6Vm4IL._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/713ezKnI-VL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/41Mj9O0rqML._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/714m7L0bszL._AC_SY879_.jpg",
        stock=130)
    brown_oxford_shoes = Product(
        product_type_id=8, color="Brown",
        image1="https://m.media-amazon.com/images/I/71wOU0QwREL._AC_SY695_.jpg",
        image2="https://m.media-amazon.com/images/I/51zppCJUeVL._AC_SY695_.jpg",
        image3="https://m.media-amazon.com/images/I/51l7SxKyJCS._AC_SY695_.jpg",
        image4="https://m.media-amazon.com/images/I/51oX6DeBknL._AC_SY695_.jpg",
        stock=75)
    grey_plaid_suit = Product(
        product_type_id=1, color="Grey",
        image1="https://m.media-amazon.com/images/I/71HNwTV76hL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/81lpn9svGKL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/71MYbSONFQL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/71V9FEv7VvL._AC_SY879_.jpg",
        stock=55)
    white_dress_shoes = Product(
        product_type_id=8, color="White",
        image1="https://m.media-amazon.com/images/I/61621hWitdL._AC_SY695_.jpg",
        image2="https://m.media-amazon.com/images/I/81shyBOxC1L._AC_SY695_.jpg",
        image3="https://m.media-amazon.com/images/I/81Sr6AKX3QL._AC_SY695_.jpg",
        image4="https://m.media-amazon.com/images/I/71vDcrkoJKL._AC_SY695_.jpg",
        stock=70)
    maroon_silk_tie = Product(
        product_type_id=9, color="Maroon",
        image1="https://m.media-amazon.com/images/I/71cACL5RxVL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/61yPazncYKL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/713iVhGuPkL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/81SQe0RMPDL._AC_SX679_.jpg",
        stock=150)
    navy_dress_socks = Product(
        product_type_id=10, color="Navy",
        image1="https://m.media-amazon.com/images/I/71IrU0FQH4L._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/81d+yN1SQgL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/81zSRldYRyL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/91zcck8twfL._AC_SY879_.jpg",
        stock=180)
    white_slim_fit_shirt = Product(
        product_type_id=4, color="White",
        image1="https://m.media-amazon.com/images/I/717ytG+AueL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/71isvpIjZXL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/81X+HUVhmZL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/71isvpIjZXL._AC_SY879_.jpg",
        stock=140)
    black_suit_vest = Product(
        product_type_id=5, color="Black",
        image1="https://m.media-amazon.com/images/I/51SI0k5UpXL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/61jZPmE5HCL._AC_SY879_.jpg",
        image3="https://m.media-amazon.com/images/I/51ssky7R77L._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/61Hvof3BpNL._AC_SX679_.jpg",
        stock=70)
    grey_suit_pants = Product(
        product_type_id=3, color="Grey",
        image1="https://m.media-amazon.com/images/I/61hc2AS1gXL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/51T-son0DzL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/61zPQULqoeL._AC_SY879_.jpg",
        image4="https://m.media-amazon.com/images/I/51GrpfFu7LL._AC_SX679_.jpg",
        stock=120)
    tan_leather_shoes = Product(
        product_type_id=8, color="Tan",
        image1="https://m.media-amazon.com/images/I/81+jogKJqUL._AC_SX695_.jpg",
        image2="https://m.media-amazon.com/images/I/915Uk7Pn+oL._AC_SX695_.jpg",
        image3="https://m.media-amazon.com/images/I/81PfqUiOEEL._AC_SX695_.jpg",
        image4="https://m.media-amazon.com/images/I/81zZ6HumVBL._AC_SX695_.jpg",
        stock=60)
    navy_wool_blazer = Product(
        product_type_id=2, color="Navy",
        image1="https://m.media-amazon.com/images/I/51Y2dWywlbL._AC_SX679_.jpg",
        image2="https://m.media-amazon.com/images/I/41Wgi3ejogL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/616Z3AL2+cL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/71FGUh0rtBL._AC_SX679_.jpg",
        stock=80)
    grey_dress_shoes = Product(
        product_type_id=8, color="Grey",
        image1="https://m.media-amazon.com/images/I/81CTfmanlRL._AC_SY695_.jpg",
        image2="https://m.media-amazon.com/images/I/71n9aP3Sh2L._AC_SY695_.jpg",
        image3="https://m.media-amazon.com/images/I/71QTqZstkyL._AC_SY695_.jpg",
        image4="https://m.media-amazon.com/images/I/81ghER5VtxL._AC_SY695_.jpg",
        stock=90)
    blue_pinstripe_suit = Product(
        product_type_id=1, color="Blue",
        image1="https://m.media-amazon.com/images/I/61D99eHR2OL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/71sLBlYaEpL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/61kShQYAzvL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/51zTV9BMsSL._AC_.jpg",
        stock=65)
    white_dress_belt = Product(
        product_type_id=7, color="White",
        image1="https://m.media-amazon.com/images/I/61IzS88rHjL._AC_SY879_.jpg",
        image2="https://m.media-amazon.com/images/I/61oA27qcSpL._AC_SX679_.jpg",
        image3="https://m.media-amazon.com/images/I/71+QL7ZC9lL._AC_SX679_.jpg",
        image4="https://m.media-amazon.com/images/I/71zxfwCOxrL._AC_SX679_.jpg",
        stock=80)

    db.session.add(navy_slim_fit_suit)
    db.session.add(charcoal_classic_fit_suit)
    db.session.add(black_tuxedo)
    db.session.add(grey_three_piece_suit)
    db.session.add(light_blue_slim_fit_suit)
    db.session.add(brown_corduroy_pants)
    db.session.add(black_wool_trousers)
    db.session.add(navy_chinos)
    db.session.add(grey_flannel_trousers)
    db.session.add(beige_slim_fit_pants)
    db.session.add(dark_green_slim_fit_suit)
    db.session.add(burgundy_dinner_jacket)
    db.session.add(tan_double_breasted_blazer)
    db.session.add(white_dress_shirt)
    db.session.add(black_dress_shirt)
    db.session.add(grey_suit_vest)
    db.session.add(navy_dress_pants)
    db.session.add(brown_leather_belt)
    db.session.add(black_leather_shoes)
    db.session.add(blue_silk_tie)
    db.session.add(grey_pinstripe_suit)
    db.session.add(beige_linen_blazer)
    db.session.add(white_tuxedo_shirt)
    db.session.add(black_dress_oxfords)
    db.session.add(navy_paisley_tie)
    db.session.add(tan_slim_fit_blazer)
    db.session.add(black_suit_jacket)
    db.session.add(grey_slim_fit_pants)
    db.session.add(blue_cotton_dress_shirt)
    db.session.add(brown_oxford_shoes)
    db.session.add(grey_plaid_suit)
    db.session.add(white_dress_shoes)
    db.session.add(maroon_silk_tie)
    db.session.add(navy_dress_socks)
    db.session.add(white_slim_fit_shirt)
    db.session.add(black_suit_vest)
    db.session.add(grey_suit_pants)
    db.session.add(tan_leather_shoes)
    db.session.add(navy_wool_blazer)
    db.session.add(grey_dress_shoes)
    db.session.add(blue_pinstripe_suit)
    db.session.add(white_dress_belt)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
