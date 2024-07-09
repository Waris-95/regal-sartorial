import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentOrder, modifyItem, deleteItem } from "../../redux/orders";
import { editBag, setBag } from "../../redux/bags";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteOrder from "../DeleteOrder/DeleteOrder";
import "./Cart.css";

// Helper function to group order items
const groupOrderItems = (orderItems) => {
  const groupedItems = {};

  orderItems.forEach(item => {
    const key = `${item.product_id}-${item.size}`;
    if (!groupedItems[key]) {
      groupedItems[key] = { ...item, total_quantity: item.quantity, total_price: item.price * item.quantity };
    } else {
      groupedItems[key].total_quantity += item.quantity;
      groupedItems[key].total_price += item.price * item.quantity;
    }
  });

  return Object.values(groupedItems);
};

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
        // console.log('Fetched current order:', data);
        let bag = 0;
        if (data && data.orderItems && data.orderItems.length) {
          data.orderItems.forEach(item => {
            console.log("Image URL:", item.image);
            console.log("Product Type ID:", item.product_type_id);
            bag += item.quantity;
          });
          dispatch(setBag(bag));
        } else {
          dispatch(setBag(0));
        }
        setOrderLoaded(true);
      }).catch((error) => console.error("Failed to fetch current order:", error));
    }
  }, [dispatch, user]);

  if (!user) return <Navigate to='/login' />;

  const addOne = (item) => {
    let quantity = item.quantity + 1;
    let total_price = item.price * quantity;
    let data = { quantity, total_price };
    dispatch(editBag(bag + 1));
    dispatch(modifyItem(order.id, item.id, data))
      .then(() => dispatch(getCurrentOrder())) 
      .then((updatedOrder) => {
        console.log('Updated order after adding one item:', updatedOrder);
      })
      .catch((error) => console.error("Failed to add one item:", error));
  };

  const minusOne = (item) => {
    let quantity = item.quantity - 1;
    let total_price = item.price * quantity;
    let data = { quantity, total_price };
    dispatch(editBag(bag - 1));
    dispatch(modifyItem(order.id, item.id, data))
      .then(() => dispatch(getCurrentOrder())) 
      .then((updatedOrder) => {
        console.log('Updated order after removing one item:', updatedOrder);
      })
      .catch((error) => console.error("Failed to remove one item:", error));
  };

  const removeItem = (item) => {
    dispatch(deleteItem(order.id, item))
      .then(() => {
        let newBag = bag - item.quantity;
        dispatch(editBag(newBag));
        return dispatch(getCurrentOrder());
      })
      .then((updatedOrder) => {
        console.log('Updated order after removing item:', updatedOrder);
      })
      .catch((error) => console.error("Failed to remove item:", error));
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

  // Group order items before rendering
  const groupedOrderItems = groupOrderItems(order.orderItems);

  const subtotal = groupedOrderItems.reduce((acc, item) => acc + item.total_price, 0);
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax;

  return (
    <>
      <h1 className="page-header">My Cart</h1>
      <div className="cart-container">
        <div className="order-items-container">
          {groupedOrderItems.map((item, i) => (
            <div key={i} className="order-item-container">
              <Link to={`/shop/${item.product_type_id}`}>
                <img alt={item.name} className="order-item-img" src={item.image} />
              </Link>
              <div className="order-item-info">
                <div className="order-item-name">{item.name}</div>
                <div className="order-item-color-size">{item.color}, {item.size}</div>
                <div className="order-item-price">${item.price}</div>

                <div className="quantity-container">
                  <div className="quantity-order">Quantity: </div>
                  <button className="add" disabled={item.total_quantity >= 10} onClick={() => addOne(item)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <div className="number">{item.total_quantity}</div>
                  <button className="subtract" disabled={item.total_quantity <= 1} onClick={() => minusOne(item)}>
                    <i className="fa-solid fa-minus"></i>
                  </button>
                </div>
                {item.total_quantity > 1 && (
                  <div className="order-item-price">Total: ${item.total_price}</div>
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
              Subtotal: <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="order-price">
              Shipping & Tax: <span>${tax.toFixed(2)}</span>
            </div>
            <div className="order-price total">
              Total Price: <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button className="store-button-white checkout-now" onClick={toShipping}>Checkout Now</button>

          <OpenModalButton
            buttonText="Empty Bag"
            modalComponent={<DeleteOrder order={order} />}
            className="empty-bag-buttonssss"
          />
        </div>
      </div>
    </>
  );
}

export default Cart;
