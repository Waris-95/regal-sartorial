import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { submitOrder, getCurrentOrder } from '../../redux/orders';
import { AddressAutofill } from '@mapbox/search-js-react';
import { setBag } from '../../redux/bags';
import ConfirmationPage from '../ConfirmationPage/Confirmation';
import emailjs from '@emailjs/browser';
import "./ShippingPage.css";

function ShippingPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const order = useSelector(state => state.orders.currentOrder);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [cardnumber, setCardnumber] = useState("");
    const [expDate, setExpDate] = useState("");
    const [cvv, setCvv] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getCurrentOrder());
    }, [dispatch]);

    if (!user) return <Navigate to='/login' />;

    const validateForm = () => {
        const errors = [];
        if (!address.trim()) errors.push("Address is required.");
        if (!city.trim()) errors.push("City is required.");
        if (!state.trim() || state.length !== 2) errors.push("Valid state abbreviation is required.");
        if (!/^\d{5}$/.test(zipcode)) errors.push("Valid ZIP Code is required.");

        if (!/^\d{5,}$/.test(cardnumber.replace(/\D/g, ''))) {
            errors.push("Valid card number is required (minimum 12 digits).");
          }
          
        if (!/^\d{2}\/\d{2}$/.test(expDate) || !isValidExpirationDate(expDate)) errors.push("Valid expiration date is required.");
        if (!/^\d{3}$/.test(cvv)) errors.push("Valid CVV is required.");
        return errors;
    };

    const isValidExpirationDate = (expDate) => {
        const [month, year] = expDate.split('/').map(Number);
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Months are 0-based in JS
        const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year

        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return false;
        }
        if (month < 1 || month > 12) {
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        const data = {
            to_name: user.firstName,
            confirmation_number: "#3KHGFAQ09823",
            to_email: user.email,
        };

        await emailjs.send('gmail', 'template_49np8dy', data, 'QRfJZsZlMoqoYc3Vr')
            .then((result) => {
                dispatch(submitOrder(order.id));
            }, (error) => {
                console.error('Error sending email:', error);
            });

        dispatch(setBag(0));
    };

    console.log("Shipping Page Order:", order);

    if (!order || !order.orderItems.length) {
        return <ConfirmationPage />;
    }

    // Calculate subtotal and tax like in the cart component
    const subtotal = order.orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // Example tax rate of 10%
    const totalPrice = subtotal + tax;

    return (
        <div className='shipping-container'>
            <form className='shipping-form' onSubmit={handleSubmit}>
                <div className='shipping-name'>Shipping Address</div>
                <AddressAutofill accessToken='pk.eyJ1IjoibG9sYW1hcnJlcm8iLCJhIjoiY2xtODJlYzFxMDRxYjNzbGJ0NzBmN3Z2bCJ9._0qzVpfHwA3vy3a47nT8DQ'>
                    <div className='shipping-input'>
                        <label>Street Address:</label>
                        <input
                            className='ship-input long-input'
                            autoComplete='address-line1'
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                </AddressAutofill>

                <div className='shipping-input'>
                    <label>City:</label>
                    <input
                        className='ship-input long-input'
                        autoComplete='address-level2'
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                    />
                </div>

                <div className='shipping-input'>
                    <label>State:</label>
                    <input
                        className='ship-input short-input'
                        autoComplete='address-level1'
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                    />
                </div>

                <div className='shipping-input zip'>
                    <label>ZIP Code:</label>
                    <input
                        className='ship-input short-input'
                        autoComplete='postal-code'
                        type="text"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                        required
                    />
                </div>

                <div className='payment-details'>Payment Details</div>

                <div className='shipping-input'>
                    <label>Card Number:</label>
                    <input
                        className='ship-input long-input'
                        type="text"
                        value={cardnumber}
                        onChange={(e) => setCardnumber(e.target.value)}
                        required
                    />
                </div>

                <div className='shipping-input'>
                    <label>Expiration Date (MM/YY):</label>
                    <input
                        className='ship-input short-input'
                        type="text"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        required
                    />
                </div>

                <div className='shipping-input cvv'>
                    <label>Security Code (CVV):</label>
                    <input
                        className='ship-input short-input'
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className='store-button-white'>Place Order</button>
            </form>

            <div className='order-sum-box'>
                <div className="order-summary-container">
                    <div className="order-summary">Order Summary</div>
                    <div className="order-price">
                        Subtotal:<span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="order-price">
                        Shipping & Tax:<span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="order-price total">
                        Total Price:<span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShippingPage;
