import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { addFavorites, getUserFavorites, deleteFavorites } from '../../redux/favorites';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './AllProducts.css';
import '../../index.css';
import SearchBox from '../SearchBox/SearchBox';

function AllProducts() {
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [color, setColor] = useState(null);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserFavorites());
  }, [dispatch]);

  let category = new URLSearchParams(location.search).get('category');
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.session.user);
  const favorites = useSelector(state => state.favorites);
  let productValues = Object.values(products);

  useEffect(() => {
    dispatch(getAllProductsThunk(category));
  }, [dispatch, category]);

  const handleMouseOver = (e, product, item) => {
    const secondaryImage = item ? item.image2 : product.products?.[0]?.image2;
    e.currentTarget.src = secondaryImage || 'https://via.placeholder.com/300';
  };

  const handleMouseOut = (e, product, item) => {
    const primaryImage = item ? item.image1 : product.products?.[0]?.image1;
    e.currentTarget.src = primaryImage || 'https://via.placeholder.com/300';
  };

  const handleAddFavorite = (product) => {
    if (user) {
      const isFavorite = favorites.some(fav => fav.product_id === product.id);
      if (isFavorite) {
        setFeedback({ ...feedback, [product.id]: 'This item is already in your favorites.' });
        return;
      }

      const productTypeId = product.products?.[0]?.product_type_id;
      const productId = product.id;
      const image = product.products?.[0]?.image1;

      if (!productTypeId) {
        console.error("Product type ID is undefined. Cannot add favorite.");
        setFeedback({ ...feedback, [product.id]: 'Failed to add favorite due to missing product type ID.' });
        return;
      }

      dispatch(addFavorites(productTypeId, productId, image))
        .then((favorite) => {
          if (favorite) {
            setFeedback({ ...feedback, [product.id]: '' });
          } else {
            setFeedback({ ...feedback, [product.id]: 'Failed to add favorite.' });
          }
        });
    } else {
      setFeedback({ ...feedback, [product.id]: 'Please log in to add favorites.' });
    }
  };

  const handleRemoveFavorite = (favId) => {
    dispatch(deleteFavorites(favId))
      .then(() => dispatch(getUserFavorites()));
  };

  const onSearchChange = (e) => {
    setSearchField(e.target.value);
  };

  const filteredProducts = productValues.filter(product =>
    product.name.toLowerCase().includes(searchField.toLowerCase())
  );

  return (
    <>
      {category && <h1 className='page-header'>{category}</h1>}
      <div className="search-box-container">
        <SearchBox
          className="search-box"
          onChangeHandler={onSearchChange}
          placeholder="Search Products..."
        />
      </div>
      <div className='all-prods-container'>
        <div className='product-cards'>
          {filteredProducts.length ? filteredProducts.map(product => {
            const defaultImage = 'https://via.placeholder.com/300';
            const primaryImage = color?.product_type_id === product.id ? color.image1 : (product.products?.[0]?.image1 || defaultImage);
            const secondaryImage = color?.product_type_id === product.id ? color.image2 : (product.products?.[0]?.image2 || primaryImage);

            const isFavorite = favorites.some(fav => fav.product_id === product.id);
            const favId = isFavorite ? favorites.find(fav => fav.product_id === product.id).id : null;

            return (
              <div className='card-container' key={product.id}>
                <div>
                  <Link className='all-prod-link-prod' to={`/shop/${product.id}`}>
                    <img
                      alt={product.name}
                      loading="lazy"
                      className='card-img'
                      id="img-change-color"
                      src={primaryImage}
                      onMouseOver={e => handleMouseOver(e, product, color)}
                      onMouseOut={e => handleMouseOut(e, product, color)}
                    />
                  </Link>
                </div>
                <div className='all-prods-info'>
                  <div className='card-name'>{product.name}</div>
                  <div className='card-price'>${product.price}</div>
                  {user && (
                    <button 
                      className={`add-favorite-button ${isFavorite ? 'favorite-added' : ''}`} 
                      onClick={() => isFavorite ? handleRemoveFavorite(favId) : handleAddFavorite(product)}
                    >
                      {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </button>
                  )}
                  {feedback[product.id] && <div className="feedback-message">{feedback[product.id]}</div>}
                  <div>
                    {product.products && product.products.length > 1 && (
                      <div className="all-prods-color-container">
                        {product.products.map(item => (
                          <div
                            key={item.id}
                            className="all-prods-color-item"
                            onClick={() => {
                              setColor(item);
                            }}
                          >
                            <i
                              className="fa-solid fa-circle"
                              style={{ color: item.color }}
                            ></i>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className='no-prods-container'> Coming soon!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
