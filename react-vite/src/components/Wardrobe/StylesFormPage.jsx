import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { createStyle } from '../../redux/styles';
import './StyleFormPage.css';

function StylesFormPage({ styleReturned, setMsg }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState('');

    if (!user) return <Navigate to="/login" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous title error if any
        if (errors.title) setErrors(prev => ({ ...prev, title: '' }));

        const data = await dispatch(createStyle({ title }));

        if (data.errors && data.errors.length > 0) {
            setErrors(data.errors[0]);
        } else {
            if (styleReturned) {
                setMsg({ style: "Your style has been created and this item has been added to it" });
                styleReturned(data);
                closeModal();
            } else {
                closeModal();
            }
        }
    };

    return (
        <form className='new-style-form' onSubmit={handleSubmit} onMouseLeave={closeModal}>
            <div className='new-style-form-container'>
                <div className="style-title-input-area">
                    <div className='title-style-box'>
                        <label className='title-label'>Title:</label>
                    </div>
                    <div className='new-style-form-title-input'>
                        <input
                            type="text"
                            className="new-style-title-input2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='new-style-errors-container'>
                    {errors.title && <span className="sign-up-errors">*{errors.title}</span>}
                </div>
                <div className='style-form-button'>
                    <button className='store-button new-style-form-btn' type='submit'>Create Wardrobe</button>
                </div>
            </div>
        </form>
    );
}

export default StylesFormPage;
