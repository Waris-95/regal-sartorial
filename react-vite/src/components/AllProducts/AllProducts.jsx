import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
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
  let productValues = Object.values(products);

  useEffect(() => {
    dispatch(getAllProductsThunk(category));
  }, [dispatch, category]);

  if (category === "View All") category = null;

  return (
    <>
      {category && <h1 className='page-header'>{category}</h1>}

      <div className='all-prods-container'>
        <div className='product-cards'>
          {productValues.length ? productValues.map(product => {
            const defaultImage = 'https://via.placeholder.com/300';
            const primaryImage = color?.product_type_id === product.id ? color.image1 : product.products?.[0]?.image1 || defaultImage;
            const secondaryImage = color?.product_type_id === product.id ? color.image2 : product.products?.[0]?.image2 || primaryImage;

            return (
              <div className='card-container' key={product.id}>
                <div>
                  <Link className='all-prod-link-prod' to={`/shop/${product.id}`}>
                    <img
                      alt=""
                      loading="lazy"
                      className='card-img'
                      id="img-change-color"
                      src={primaryImage}
                      onMouseOver={e => e.currentTarget.src = secondaryImage}
                      onMouseOut={e => e.currentTarget.src = primaryImage}
                    />
                  </Link>
                </div>
                <div className='all-prods-info'>
                  <div className='card-name'>{product.name}</div>
                  <div className='card-price'>${product.price}.00</div>
                  <div>
                    {product.products.length > 1 && (
                      <div className="all-prods-color-container">
                        {product.products.map(item => (
                          <div
                            key={item.id}
                            className="all-prods-color-item"
                            onClick={() => setColor(item)}
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