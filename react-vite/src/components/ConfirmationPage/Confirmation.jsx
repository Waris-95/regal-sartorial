import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';


function ConfirmationPage() {
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className='order-conf-container'>
      <div className='order-conf-title'>Order Confirmation</div>
      <div>Order Number: #9LKVXZMNB09823</div>
      <div>{user.firstName}, Thank you for your order!</div>
      <div className='conf-msg'>Your order has been received. We will notify you as soon as your package has been shipped. A confirmation email will be sent to your inbox shortly.</div>
      <Link className='new-order' to="/">Place a new order</Link>
    </div>
  );
}

export default ConfirmationPage;
