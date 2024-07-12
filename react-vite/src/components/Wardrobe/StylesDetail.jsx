import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Navigate, Link, useNavigate } from 'react-router-dom';
import { deleteStyle, getUserStyles, modifyStyle } from '../../redux/styles';
import DisplayStyleItems from './DisplayStyleItems';
import { FaEdit } from 'react-icons/fa'; // Import the FaEdit icon
import "./StylesDetail.css";

function StylesDetails() {
  const dispatch = useDispatch();
  const { styleId } = useParams();
  const navigate = useNavigate();
  const user = useSelector(state => state.session.user);
  const styles = useSelector(state => state.styles);
  const style = useSelector(state => state.styles[styleId]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getUserStyles());
  }, [dispatch]);

  useEffect(() => {
    if (style) {
      setTitle(style.title);
    }
  }, [style]);

  if (!user) return <Navigate to='/login' />;
  if (isDeleted) return <Navigate to="/styles" />;

  const removeStyle = async () => {
    await dispatch(deleteStyle(style.id));
    setIsDeleted(true);
  };

  const cancelEdit = () => {
    setTitle(style.title);
    setErrors("");
    setEdit(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title === style.title) return setEdit(false);
    const data = await dispatch(modifyStyle(style.id, { title }));
    if (data.errors) {
      setErrors(data.errors[0]);
    } else {
      setEdit(false);
    }
  };

  const backToAll = () => navigate("/styles");

  const onChangeTitle = e => {
    setTitle(e.target.value);
    setErrors("");
  };

  if (!style) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  return (
    <div className='style-details-container'>
      <div className='style-title-box'>
        {
          !edit ? (
            <div className='style-title-container'>
              <div className='style-details-title'>{style.title}</div>
              <button className='change-title-button' onClick={() => setEdit(true)}>
                <FaEdit className="edit-icon" title="Edit style title" /> {/* Use the FaEdit icon here */}
              </button>
            </div>
          ) : (
            <form className='edit-style-title-container' onSubmit={handleSubmit}>
              <div className="new-style-title">
                <label className='new-style-label'>Title</label>
                <input
                  type="text"
                  className="new-style-title-input"
                  value={title}
                  onChange={onChangeTitle}
                  required
                />
              </div>
              {errors.title && (<span className="error"> *{errors.title}</span>)}
              <i className="fa-solid fa-x cancel-title" onClick={cancelEdit}></i>
              <button className='store-button style-submit-title' type='submit'>Save Title</button>
            </form>
          )
        }
      </div>
      <div className='main-style-details-container'>
        <div className='style-items-display'>
          {
            style.styleItems.length ? (
              <DisplayStyleItems productValues={style.styleItems} />
            ) : (
              <div className='style-is-empty'>Your wardrobe is empty,
                <Link className='add-items-link' to="/"> shop and add some items!</Link>
              </div>
            )
          }
        </div>

        <div>
          <button className="delete-style-button store-button" onClick={removeStyle}>Delete Wardrobe</button>
        </div>

        <button className='store-button link-back-styles' onClick={backToAll}>Go back to all wardrobes</button>
      </div>
    </div>
  );
}

export default StylesDetails;

