import { useModal } from '../../context/Modal';
import { getCurrentOrder, removeOrder } from '../../redux/orders';
import { editBag } from '../../redux/bags';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./DeleteOrder.css";

function DeleteOrder({ order }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emptyBag = () => {
    dispatch(editBag(0));
    dispatch(removeOrder(order.id));
    dispatch(getCurrentOrder());
    closeModal();
  };

  const returnToCart = () => {
    closeModal();
    navigate('/checkout');
  };

  return (
    <div className='delete-order-container'>
      <div className='delete-question'>Are you sure you want to empty your bag?</div>
      <div className='delete-buttons-container'>
        <button className='store-button delete-order-buttons' onClick={emptyBag}>Yes, I'm sure</button>
        <button className='store-button delete-order-buttons' onClick={returnToCart}>No, return to cart</button>
      </div>
    </div>
  );
}

export default DeleteOrder;
