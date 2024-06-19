import  { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import formateCurrency from "../../utils/formateCurrency";
import { Context } from "../context/Provider";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const Products = ({ data }) => {
  const { name, price, description, imageUrl, image } = data;
  const { cartItems, setCartItems } = useContext(Context);

  const notify = () => toast.success('Produto adicionado ao carrinho!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  });

  const handleAddCart = () => {
    const existingItemIndex = cartItems.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
      const updatedCartItems = cartItems.map((item, index) => {
        if (index === existingItemIndex) {
          return { ...item, qualify: item.qualify + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...data, qualify: 1 }]);
    }

    notify();
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <img className="w-28 h-28 rounded hover:scale-110 hover:rotate-6 duration-200" src={imageUrl ? imageUrl : image} alt={name} />

      <div className=' relative'>
        <h3 className="font-bold mb-1">{name}</h3>
        <p className="text-xs mb-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold">{formateCurrency(price, 'BRL')}</span>

          <button className="absolute right-0 text-2xl bg-black py-1 px-2 rounded-md hover:bg-red-600 hover:scale-110" onClick={handleAddCart}>
            <FaShoppingCart className='text-white '/>
          </button>
        </div>
      </div>
    </div>
  );
};

Products.propTypes = {
  data: PropTypes.object.isRequired
}