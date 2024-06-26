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

  const category = new URLSearchParams(location.search).get('category');

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProductsThunk(category)).then((data) => {
      console.log('Fetched products:', data);
    });
  }, [dispatch, category]);

  const defaultImage = 'https://i.gifer.com/P4id.gif';

  const getValidImage = (product) => {
    if (!product || !product.images || product.images.length === 0) return defaultImage;
    return product.images[0]; // Use the first image as default
  };

  console.log("Products state:", products);

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
                      className={`card-img ${getValidImage(productType.products && productType.products[0]) === defaultImage ? 'default-img' : ''}`}
                      id='img-change-color'
                      src={getValidImage(productType.products && productType.products[0])}
                      onMouseOver={(e) => {
                        if (productType.products && productType.products[0]) {
                          const productImages = productType.products[0].images || [];
                          const hoverImage = productImages.find((img) => img && img !== e.currentTarget.src);
                          if (hoverImage) e.currentTarget.src = hoverImage;
                        }
                      }}
                      onMouseOut={(e) => {
                        if (productType.products && productType.products[0]) {
                          e.currentTarget.src = getValidImage(productType.products[0]);
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
                            <i className='fa-solid fa-circle'></i>
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
