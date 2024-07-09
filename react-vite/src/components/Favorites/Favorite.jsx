import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { getUserFavorites, deleteFavorites } from "../../redux/favorites";
import "./Favorite.css";

function Favorites() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites) || [];
  const [editingFav, setEditingFav] = useState(null);
  const [newImage, setNewImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getUserFavorites());
    }
  }, [dispatch, user]);

  if (!user) return <Navigate to='/login' />;

  const deleteFav = (favId) => {
    dispatch(deleteFavorites(favId))
      .catch((error) => console.log("error deleting fav"));
  };

  return (
    <div>
      <div className="fav-header">
        <h1>Favorites</h1>
      </div>
      <div className="fav-main-container">
        {favorites.length > 0 ? (
          favorites.map(fav => (
            <div key={fav.id} className="fav-card">
              <Link to={`/shop/${fav.product_type_id}`} key={fav.id}>
                <img alt="" className="fav-img" src={`${fav.image}`} loading="lazy" />
              </Link>
              <button onClick={() => deleteFav(fav.id)} className="store-button fav-remove-button">remove</button>
            </div>
          ))
        ) : (
          <p>{`${user.firstName}, you haven't yet added anything to favorites`}</p>
        )}
      </div>
    </div>
  );
}

export default Favorites;
