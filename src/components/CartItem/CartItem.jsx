import { useContext } from 'react';
import { Context } from '../context/Provider';
import formateCurrency from '../../utils/formateCurrency';
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CartItem = ({ data }) => {
  const { name, qualify, imageUrl } = data;
  const { cartItems, setCartItems } = useContext(Context);


  const existingItem = cartItems.find(item => item.name === name);
  const totalPrice = existingItem ? existingItem.price * existingItem.qualify : 0;

  const notify = () => toast.success('Produto removido do carrinho!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const handleRemove = () => {
    if (existingItem) {
      if (existingItem.qualify > 1) {
        // Decrementa a quantidade do item
        const updatedItems = cartItems.map(item =>
          item.name === name ? { ...item, qualify: item.qualify - 1 } : item
        );
        setCartItems(updatedItems);
      } else {
        // Remove o item do carrinho
        const updatedItems = cartItems.filter(item => item.name !== name);
        setCartItems(updatedItems);
        notify()
      }
    }

    
  };

  return (
    <div className="flex gap-2 items-center font-bold mb-8">
        <div className="flex mt-5 items-center justify-between w-full">
          <div className='flex flex-col '>
            <h1 className='text-2xl'>{name}</h1>
              <p>Quantidade: {qualify}</p>
              <p>Preço: {formateCurrency(totalPrice, 'BRL')}</p>
          </div>
            
            <button onClick={handleRemove} className=" bg-red-600/25 text-white rounded px-1 py-4">
              Remover
            </button>
        </div>
    </div>
  );
};
