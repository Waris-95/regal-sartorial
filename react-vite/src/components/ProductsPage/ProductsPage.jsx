import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProductType } from "../../redux/ProductType";
import { getUserFavorites, addFavorites, deleteFavorites } from "../../redux/favorites";
import { getCurrentOrder, modifyItem, newOrderItem, newOrder } from "../../redux/orders";
import { FaPlus, FaMinus, FaHeart, FaRegHeart } from 'react-icons/fa';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import ImageSlider from '../ImageSlider/ImageSlider';
import { editBag, setBag } from "../../redux/bags";
import AddStyleItem from "../Wardrobe/AddStyleItems";
import Reviews from "../Reviews/Review"; 
import Spinner from "../Spinner/Spinner"; // Import the Spinner component
import "./ProductsPage.css";
import "../../index.css";

const ProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const productType = useSelector(state => state.productType);
    const favorites = useSelector(state => state.favorites);
    const user = useSelector(state => state.session.user);
    const order = useSelector(state => state.orders.currentOrder);
    const bag = useSelector(state => state.bag);

    const [loading, setLoading] = useState(true); // Define loading state
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [favorite, setFavorite] = useState(false);
    const [item, setItem] = useState(null);
    const [size, setSize] = useState("Small");
    const [quantity, setQuantity] = useState(1);
    const [checkFav, setCheckFav] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [msg, setMsg] = useState({});
    const [circleS, setCircleS] = useState(true);
    const [circleM, setCircleM] = useState(false);
    const [circleL, setCircleL] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const addOne = () => setQuantity(quantity + 1);
    const minusOne = () => setQuantity(quantity - 1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getProductType(id))
            .then(() => setLoading(false)) // Set loading to false when product type is loaded
            .catch((error) => {
                console.error("Failed to load product type:", error);
                setLoading(false); // Set loading to false even if there is an error
            });

        if (user) {
            dispatch(getCurrentOrder());
            dispatch(getUserFavorites())
                .then(() => {
                    setLoadingFavorites(false);
                    setCheckFav(true);
                })
                .catch((error) => {
                    setLoadingFavorites(false);
                    console.error("Failed to load user favorites:", error);
                });
        } else {
            setLoadingFavorites(false);
            setCheckFav(true);
        }
    }, [dispatch, id, user]);

    useEffect(() => {
        setFavorite(false);
        if (user && favorites.length) {
            for (let i = 0; i < favorites.length; i++) {
                if (favorites[i].product_type_id == id) {
                    setFavorite(true);
                }
            }
        }
    }, [favorites, id, user]);

    useEffect(() => {
        if (order && order.orderItems) {
            const productId = item ? item.id : productType.products?.[0]?.id;
            const existingItem = order.orderItems.find(orderItem => orderItem.product_id === productId && orderItem.size === size);
            if (existingItem) {
                setIsInCart(true);
            } else {
                setIsInCart(false);
            }
        }
    }, [order, item, productType, size]);

    const addFav = () => {
        let productId = item ? item.id : productType.products?.[0]?.id;
        let image = item ? item.image1 : productType.products?.[0]?.image1;
        if (productId && image) {
            dispatch(addFavorites(productType.id, productId, image))
                .then(() => dispatch(getUserFavorites()))
                .then(() => setFavorite(true))
                .catch((error) => console.log("error adding fav", error));
        }
    };

    const deleteFav = () => {
        let favId;
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].product_type_id == id) {
                favId = favorites[i].id;
            }
        }
        if (favId) {
            dispatch(deleteFavorites(favId))
                .then(() => dispatch(getUserFavorites()))
                .then(() => setFavorite(false))
                .catch((error) => console.log("error deleting fav", error));
        }
    };

    const addItem = (product) => {
        if (!user) {
            navigate("/login");
            return;
        }

        const productId = item ? item.id : productType.products?.[0]?.id;
        const color = item ? item.color : productType.products?.[0]?.color;
        const image = item ? item.image1 : productType.products?.[0]?.image1;
        const name = productType.name;
        const sizeToUse = size || "Small";
        const price = productType.price;
        const total_price = quantity * price;

        if (!order || !order.orderItems) {
            const orderData = { status: "pending" };
            dispatch(newOrder(orderData)).then((newOrder) => {
                if (newOrder && newOrder.id) {
                    const itemData = {
                        product_id: productId,
                        product_type_id: productType.id,
                        price,
                        quantity,
                        color,
                        size: sizeToUse,
                        image,
                        name,
                        total_price
                    };
                    dispatch(newOrderItem(itemData, newOrder.id)).then(() => {
                        dispatch(getCurrentOrder());
                        dispatch(setBag(bag + quantity)); // Update bag state
                        setIsInCart(true);
                    });
                } else {
                    console.error('Failed to create new order:', newOrder);
                }
            }).catch((error) => {
                console.error('Error creating new order:', error);
            });
        } else {
            let orderItems = order.orderItems;
            let existingItem = orderItems.find(orderItem => orderItem.product_id === productId && orderItem.size === sizeToUse);

            if (existingItem) {
                let newQuantity = existingItem.quantity + quantity;
                let newTotalPrice = price * newQuantity;
                let data = { quantity: newQuantity, total_price: newTotalPrice };
                dispatch(modifyItem(order.id, existingItem.id, data)).then(() => {
                    dispatch(getCurrentOrder());
                    dispatch(setBag(bag + quantity)); // Update bag state
                    setIsInCart(true);
                });
            } else {
                const itemData = {
                    product_id: productId,
                    product_type_id: productType.id,
                    price,
                    quantity,
                    color,
                    size: sizeToUse,
                    image,
                    name,
                    total_price
                };
                dispatch(newOrderItem(itemData, order.id)).then(() => {
                    dispatch(getCurrentOrder());
                    dispatch(setBag(bag + quantity)); // Update bag state
                    setIsInCart(true);
                });
            }
        }
    };

    const addSize = (checkedSize) => {
        setSize(checkedSize);
        if (checkedSize === "Small") {
            setCircleS(true);
            setCircleM(false);
            setCircleL(false);
        }
        if (checkedSize === "Medium") {
            setCircleM(true);
            setCircleS(false);
            setCircleL(false);
        }
        if (checkedSize === "Large") {
            setCircleL(true);
            setCircleM(false);
            setCircleS(false);
        }
    };

    if (loading) {
        return <Spinner loading={loading} />
    }

    if (loadingFavorites && !user) {
        return <Spinner loading={loadingFavorites} />
    }

    const itemImageCheck = () => {
        if (item) {
            let images = item.images.filter(ele => ele !== null);
            return images;
        } else if (productType.products && productType.products.length > 0) {
            return productType.products[0].images.filter(img => img);
        }
        return [];
    };

    const images = itemImageCheck();
    const currentImage = images[imageIndex] || images[0];

    return (
        <div className="product-page-container">
            <div className="product-area">
                <div className="product-img-container">
                    <div className="product-small-area">
                        {images.map((img, i) => (
                            <img loading="lazy" key={i} alt="" className="product-img-small" src={img} onMouseOver={() => setImageIndex(i)} />
                        ))}
                    </div>
                    <div className="product-img-big-container">
                        <img loading="lazy" className="product-img-big" src={currentImage} alt="Product" />
                        {user && (
                            <>
                                {favorite ? (
                                    <button className="fav-button" title="Remove from Favorites" onClick={deleteFav}>
                                        <FaHeart />
                                    </button>
                                ) : (
                                    <button className="fav-button" title="Add to favorites" onClick={addFav}>
                                        <FaRegHeart />
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="product-info">
                    <div className="product-name">{productType.name}</div>
                    <div className="prod-price-2">${productType.price}</div>
                    {productType.products && productType.products.length > 1 && (
                        <div className="color-container">
                            {productType.products.map(item => (
                                <div className="color-options" key={item.id} onMouseOver={() => setItem(item)}>
                                    <input
                                        type="checkbox"
                                        className="color-circle"
                                        style={{ backgroundColor: item.color }}
                                        onClick={() => setItem(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="size-container">
                        <button className={circleS ? "circle" : "no-circle"} onClick={() => addSize("Small")}>S</button>
                        <button className={circleM ? "circle" : "no-circle"} onClick={() => addSize("Medium")}>M</button>
                        <button className={circleL ? "circle" : "no-circle"} onClick={() => addSize("Large")}>L</button>
                    </div>

                    <div className="quantity-container">
                        <div>Quantity : </div>
                        <div className="plusminus">
                            <button className="add" disabled={quantity >= 10} onClick={addOne}>
                                <FaPlus />
                            </button>
                            <div className="number">{quantity}</div>
                            <button className="subtract" disabled={quantity <= 1} onClick={minusOne}>
                                <FaMinus />
                            </button>
                        </div>
                    </div>

                    <button
                        className="store-button add-to-bag-button"
                        onClick={() => addItem(productType)}
                        disabled={isInCart}
                    >
                        {isInCart ? "Item added to cart" : "Add to Cart"}
                        {msg.cart && <p className="sign-up-errors">*{msg.cart}</p>}
                    </button>
                    {msg.cart && <p className="sign-up-errors">*{msg.cart}</p>}
                    {msg.cart && <Link className="go-to" to="/checkout">Go to my cart</Link>}
                    {msg.style && <p className="sign-up-errors">*{msg.style}</p>}
                    {msg.style && <Link className="go-to" to="/styles">View my wardrobes</Link>}
                    {user && (
                        <OpenModalButton
                            className="store-button add-to-style"
                            buttonText="Add to Wardrobe"
                            modalComponent={<AddStyleItem styleItem={productType} setMsg={setMsg} />}
                        />
                    )}
                </div>
            </div>

            <div className="you-may-also">
                <ImageSlider productType={productType.id} category={productType.category} />
            </div>

            {/* Add Reviews */}
            <Reviews productTypeId={productType.id} productId={id} />
        </div>
    );
};

export default ProductPage;
