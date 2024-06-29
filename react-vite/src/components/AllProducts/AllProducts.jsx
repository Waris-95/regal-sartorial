import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import { addFavorites } from '../../redux/favorites';  // Import the addFavorites thunk
import './AllProducts.css';
import '../../index.css';

function AllProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [color, setColor] = useState(null); // Initialize as null

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let category = new URLSearchParams(location.search).get('category');
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.session.user);  // Get the current user
  let productValues = Object.values(products);

  useEffect(() => {
    dispatch(getAllProductsThunk(category));
  }, [dispatch, category]);

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
      console.log('Product data:', product);
      
      // hard coded
      const productTypeId = 1; 
      const productId = product.id;
      const image = product.products?.[0]?.image1;
  
      console.log('Adding favorite:', { productTypeId, productId, image });
  
      if (productTypeId) {
        dispatch(addFavorites(productTypeId, productId, image))
          .then((favorite) => {
            if (favorite) {
              console.log("Favorite added:", favorite);
            } else {
              console.error("Failed to add favorite.");
            }
          });
      } else {
        console.error("Product type ID is undefined. Cannot add favorite.");
      }
    } else {
      alert("Please log in to add favorites");
    }
  };
  

  return (
    <>
      {category && <h1 className='page-header'>{category}</h1>}

      <div className='all-prods-container'>
        <div className='product-cards'>
          {productValues.length ? productValues.map(product => {
            const defaultImage = 'https://via.placeholder.com/300';
            const primaryImage = color?.product_type_id === product.id ? color.image1 : (product.products?.[0]?.image1 || defaultImage);
            const secondaryImage = color?.product_type_id === product.id ? color.image2 : (product.products?.[0]?.image2 || primaryImage);

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
                  <button 
                    className="add-favorite-button" 
                    onClick={() => handleAddFavorite(product)}
                  >
                    Add to Favorites
                  </button>
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
