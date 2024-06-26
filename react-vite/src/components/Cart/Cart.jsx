import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder, modifyItem, deleteItem } from "../../redux/orders";
import { editBag, setBag } from "../../redux/bags";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteOrder from "../DeleteOrder/DeleteOrder";
import "./Cart.css";

function Cart() {
  const [orderLoaded, setOrderLoaded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector(state => state.orders?.currentOrder);
  const user = useSelector(state => state.session.user);
  const bag = useSelector(state => state.bag);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getCurrentOrder()).then((data) => {
        let bag = 0;
        if (data && Object.keys(data).length) {
          data.orderItems.map(item => {
            bag += item.quantity;
            return null;
          });
          dispatch(setBag(bag));
        } else {
          dispatch(setBag(0));
        }
      }).then(() => setOrderLoaded(true));
    }
  }, [dispatch, user]);

  if (!user) return <Navigate to='/login' />;

  const addOne = (item) => {
    let quantity = item.quantity + 1;
    let total_price = item.price * quantity;
    let add = item.price;
    let data = {
      quantity,
      total_price,
      add
    };
    dispatch(editBag(bag + 1));
    dispatch(modifyItem(order.id, item.id, data));
  };

  const minusOne = (item) => {
    let quantity = item.quantity - 1;
    let total_price = item.price * quantity;
    let minus = item.price;
    let data = {
      quantity,
      total_price,
      minus
    };
    dispatch(editBag(bag - 1));
    dispatch(modifyItem(order.id, item.id, data));
  };

  const removeItem = (item) => {
    dispatch(deleteItem(order.id, item));
    let newBag = bag - item.quantity;
    dispatch(editBag(newBag));
  };

  const toShipping = () => {
    navigate('/shipping');
  };

  if (!orderLoaded) {
    return <div>Loading...</div>;
  }

  if (!order || !order.orderItems || !order.orderItems.length) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-message">Your shopping bag is empty.</div>
        <Link to="/shop">
          <button className="store-button-white">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="page-header">My Bag</h1>
      <div className="cart-container">
        <div className="order-items-container">
          {order.orderItems.map((item, i) => (
            <div key={i} className="order-item-container">
              <Link to={`/shop/${item.productTypeId}`}>
                <img alt="" className="order-item-img" src={item.image} />
              </Link>
              <div className="order-item-info">
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-color-size">{item.color}, {item.size}</div>
                <div className="order-item-price">${item.price}.00</div>

                <div className="quantity-container">
                  <div className="quanty-order">Quantity: </div>
                  <button className="add" disabled={item.quantity >= 10} onClick={() => addOne(item)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <div className="number">{item.quantity}</div>
                  <button className="subtract" disabled={item.quantity <= 1} onClick={() => minusOne(item)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
                {item.quantity > 1 && (
                  <div className="order-item-price">Total: ${item.total_price}.00</div>
                )}
                <button className="store-button remove-order-item" onClick={() => removeItem(item)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-box">
          <div className="order-summary-container">
            <div className="order-summary">Order Summary</div>
            <div className="order-price">
              Subtotal: <span>${order.price}.00</span>
            </div>
            <div className="order-price">
              Tax: <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="order-price total">
              Total Price: <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="store-button-white checkout-now" onClick={toShipping}>Checkout Now</button>

          <OpenModalButton
            buttonText="Empty Bag"
            modalComponent={<DeleteOrder order={order} />}
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
