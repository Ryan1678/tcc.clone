import  { useContext } from 'react'
import { Context } from '../context/Provider'
import './Cart.css';
import { CartItem } from '../CartItem/CartItem';
import formateCurrency from '../../utils/formateCurrency';
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
export const Cart = () => {

    const {cartItems, isCartVisible, setIsCartVisible} = useContext(Context)

    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qualify), 0);
    
  return (
    <div className={`cart-container ${isCartVisible ? 'cart--active' : ''}`}>
      <div className='title flex items-center justify-between flex-row mt-10'>
          <h2 className='text-white text-center text-2xl'>Carrinho</h2>
          <button onClick={() => setIsCartVisible(!isCartVisible)} className='text-3xl hover:text-red-600'>
              <GrClose/>
          </button>
      </div>

      <div className='mt-10 overflow-auto'>
        {cartItems.map((item) => <CartItem key={item.id} data={item}/>)}
      </div>      

        <div className='bg-slate-900/45 absolute bottom-0 left-0 w-full'>
        <Link to={'/comfirm/verify'}>
          <button className='text-2xl font-bold px-5 py-7 w-full flex justify-between' onClick={() => setIsCartVisible(!isCartVisible)}>
              Avança 
              <p className='text-red-600 font-bold text-2xl'>Total: {formateCurrency(totalPrice, 'BRL')}</p>
            </button>
        </Link>
          
          
        </div>
    </div>
  )
}
