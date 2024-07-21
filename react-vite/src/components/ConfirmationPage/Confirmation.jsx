import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ConfirmationPage.css';

function ConfirmationPage() {
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    toast.success('Order placed successfully!', {
      className: 'custom-toast',
      style: {
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '5px',
        fontFamily: 'Arial, sans-serif'
      },
      progressStyle: {
        backgroundColor: 'white'
      }
    });
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className='order-conf-container'>
      <div className='order-conf-title'>Order Confirmation</div>
      <div className='order-number'>Order Number: #3KHGFAQ09823</div>
      <div className='user-thank'>{user.firstName}, Thank you for your order!</div>
      <div className='conf-msg'>Your order has been received. We will notify you as soon as your package has been shipped. A confirmation email will be sent to your inbox shortly.</div>
      <Link className='new-order' to="/">Place a new order</Link>
      <ToastContainer />
    </div>
  );
}

export default ConfirmationPage;
