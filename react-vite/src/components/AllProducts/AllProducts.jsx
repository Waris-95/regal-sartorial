import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { addFavorites, getUserFavorites } from '../../redux/favorites'; 
import './AllProducts.css';
import '../../index.css';
import SearchBox from '../SearchBox/SearchBox';

function AllProducts() {
  const [searchField, setSearchField] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const [color, setColor] = useState(null); // Initialize as null
  const [feedback, setFeedback] = useState({}); // For feedback message

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserFavorites()); // Fetch user favorites on component mount
  }, [dispatch]);

  let category = new URLSearchParams(location.search).get('category');
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.session.user); // Get the current user
  const favorites = useSelector(state => state.favorites); // Get user's favorites
  let productValues = Object.values(products);

  useEffect(() => {
    dispatch(getAllProductsThunk(category));
  }, [dispatch, category]);

  useEffect(() => {
    if (productValues.length > 0) {
      console.log('Product Values:', productValues); // Log product values to verify `product_type_id`
    }
  }, [productValues]);

  if (category === "View All") category = null;

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
      console.log('Product data:', product); // Ensure `product_type_id` is present in the logged data

      // Check if the product is already a favorite
      const isFavorite = favorites.some(fav => fav.product_id === product.id);
      if (isFavorite) {
        setFeedback({ ...feedback, [product.id]: 'This item is already in your favorites.' });
        return;
      }

      const productTypeId = product.products?.[0]?.product_type_id; // Extract product_type_id dynamically from product
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
            setFeedback({ ...feedback, [product.id]: 'Item added to favorites' });
          } else {
            setFeedback({ ...feedback, [product.id]: 'Failed to add favorite.' });
          }
        });
    } else {
      // Handle case where user is not logged in
      setFeedback({ ...feedback, [product.id]: 'Please log in to add favorites.' });
    }
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
      <SearchBox
        className="search-box"
        onChangeHandler={onSearchChange}
        placeholder="Search Products..."
      />
      <div className='all-prods-container'>
        <div className='product-cards'>
          {filteredProducts.length ? filteredProducts.map(product => {
            const defaultImage = 'https://via.placeholder.com/300';
            const primaryImage = color?.product_type_id === product.id ? color.image1 : (product.products?.[0]?.image1 || defaultImage);
            const secondaryImage = color?.product_type_id === product.id ? color.image2 : (product.products?.[0]?.image2 || primaryImage);

            // Check if the product is already a favorite
            const isFavorite = favorites.some(fav => fav.product_id === product.id);

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
                      onClick={() => handleAddFavorite(product)}
                      disabled={isFavorite} // Disable button if already a favorite
                    >
                      <i className="fa fa-heart"></i> {isFavorite ? 'Added to Favorites!' : 'Add to Favorites'}
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
