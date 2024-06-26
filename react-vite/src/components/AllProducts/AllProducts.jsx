import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import { getAllProductsThunk } from '../../redux/products';
import './AllProducts.css';
import '../../index.css';

function AllProducts() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [color, setColor] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let category = new URLSearchParams(location.search).get('category');
  
  const products = useSelector((state) => state.products);
  
  useEffect(() => {
    dispatch(getAllProductsThunk(category)).then((data) => {
      console.log('Fetched products:', data);
    });
  }, [dispatch, category]);

  const defaultImage = 'https://via.placeholder.com/300';

  const getValidImage = (product) => {
    if (!product) return defaultImage;
    return product.image1 || product.image2 || product.image3 || product.image4 || defaultImage;
  };

  return (
    <>
      {category && <h1 className='page-header'>{category}</h1>}

      <div className='all-prods-container'>
        <div className='product-cards'>
          {products.length ? (
            products.map((productType) => (
              <div className='card-container' key={productType.id}>
                <div>
                  <Link className='all-prod-link-prod' to={`/shop/${productType.id}`}>
                    <img
                      alt={productType.name}
                      loading='lazy'
                      className='card-img'
                      id='img-change-color'
                      src={color?.product_type_id === productType.id ? color.image1 : getValidImage(productType.products && productType.products[0])}
                      onMouseOver={(e) => {
                        if (color?.product_type_id === productType.id && color.image2) {
                          e.currentTarget.src = color.image2;
                        } else if (productType.products && productType.products[0] && productType.products[0].image2) {
                          e.currentTarget.src = productType.products[0].image2;
                        }
                      }}
                      onMouseOut={(e) => {
                        if (color?.product_type_id === productType.id && color.image1) {
                          e.currentTarget.src = color.image1;
                        } else if (productType.products && productType.products[0] && productType.products[0].image1) {
                          e.currentTarget.src = productType.products[0].image1;
                        }
                      }}
                    />
                  </Link>
                </div>
                <div className='all-prods-info'>
                  <div className='card-name'>{productType.name}</div>
                  <div className='card-price'>${productType.price.toFixed(2)}</div>
                  <div>
                    {productType.products && productType.products.length > 1 && (
                      <div className='all-prods-color-container'>
                        {productType.products.map((item) => (
                          <div
                            key={item.id}
                            className='all-prods-color-item'
                            onClick={() => setColor(item)}
                          >
                            <i className='fa-solid fa-circle' style={{ color: item.color }}></i>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='no-prods-container'>Coming soon</div>
          )}
        </div>
      </div>
    </>
  );
}

export default AllProducts;
