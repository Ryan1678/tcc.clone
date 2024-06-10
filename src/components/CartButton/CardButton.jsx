import  { useContext } from "react";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import "./CartButton.css";
import { Context } from "../context/Provider";


export const CartButton = () => {

    const {cartItems,isCartVisible, setIsCartVisible} = useContext(Context);

    return(
        <button 
        type="button"
        className="cart__button"
        onClick={() => setIsCartVisible(!isCartVisible)}
        >
            <AiOutlineShoppingCart/>

            {cartItems.length > 0 && <span className="cart-status">{cartItems.length}</span>}
        </button>
    )
}