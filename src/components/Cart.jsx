import { useDispatch, useSelector } from 'react-redux'
import cartSlice from '../data/cartSlice'
// import productList from '../data/productList.json'
import '../styles/cart.scss'
import { fetchAllProducts } from '../data/productSlice'
import { useEffect } from 'react'

const Cart = () => {

  const state = useSelector((state) => state)
  const { cart, products } = state
  const cartProductData = products.data?.filter((product) => cart.cartProductIds.includes(product.id))
  const { removeFromCart, clearAllItems} = cartSlice.actions
  const dispatch = useDispatch()
    console.log(cart.cartProductIds)

    useEffect(()=>{
      dispatch(fetchAllProducts('http://localhost:3000/products'))
    },[dispatch])
  return (
    <div className="cart">
      {cartProductData.length > 0 &&
        (
          <div className="cart-product">
            <h3 className="header">Items in cart</h3>
            {cartProductData.map((product) => (
              <div key={product.id} className="row">
                <img className="item-image" src={product.imageUrl} alt="product" />

                <div className="item-info">
                  <h4>{product.name}</h4>
                  <p className="text-truncate">{product.detail}</p>
                  <button className="btn btn-primary" onClick={()=> dispatch(removeFromCart(product.id)) }>
                    <i className="bi bi-trash-fill" /> Remove Item
                  </button>
                </div>
              </div>
            ))}

            <footer className="text-center">
              <button className="btn btn-primary" onClick={()=> dispatch(clearAllItems()) }>CHECKOUT</button>
            </footer>
          </div>
        )
      }

      {cartProductData.length < 1 &&
        (
          <div className="text-center empty-cart">
            <i className="bi bi-cart3" />
            <p>Your cart is empty.</p>
            <p>You have not added any item to your cart.</p>
          </div>
        )
      }
    </div>
  )
}

export default Cart
