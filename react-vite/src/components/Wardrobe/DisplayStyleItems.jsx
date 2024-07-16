import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { deleteStyleItem } from '../../redux/styles'
import "./DisplayStyleItems.css"

function DisplayStyleItems({ productValues }) {
  const dispatch = useDispatch()
  const [color, setColor] = useState("")
  const [isDeleted, setIsDeleted] = useState(false)

  const removeStyleItem = async (styleId, styleItemId) => {
    dispatch(deleteStyleItem(styleId, styleItemId))
  }

  return (
    <div className='style-i-cards'>
      {productValues.map((product, i) => (
        <div key={i} className='style-i'>
          <Link to={`/shop/${product.product.id}`}>
            <img
              loading="lazy"
              alt="product"
              className='card-img card-i-image'
              src={color.product_type_id === product.product.id ? color.image1 : `${product.product.products[0].image1}`}
              onMouseOver={e => (color.product_type_id === product.product.id ? e.currentTarget.src = color.image2 : e.currentTarget.src = `${product.product.products[0].image2}`)}
              onMouseOut={e => (color.product_type_id === product.product.id ? e.currentTarget.src = color.image1 : e.currentTarget.src = `${product.product.products[0].image1}`)}
            />
          </Link>
          <div className='style-i-info'>
            <div className='style-i-card-name'>{product.product.name.toLowerCase()}</div>
            <div className='style-i-card-price'>${product.product.price}</div>
            <div className='color-style-i-box'>
              {product.product.products.length > 1 && (
                <div className='style-i-colors'>
                  {product.product.products.map((item, i) => (
                    <div key={i} className='all-prods-color-container-i'>
                      <div onClick={() => setColor(item)}>
                        <i className="fa-solid fa-circle" style={{ color: item.color }}></i>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className='style-i-remove-container'>
              <button className='style-i-remove-button' onClick={() => removeStyleItem(product.stylesId, product.id)}>remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DisplayStyleItems
