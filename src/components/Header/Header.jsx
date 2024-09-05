import  { useContext, useEffect } from 'react';
import Logo from '../../assets/hamb-1.png';
import './Header.css';
import { Context } from '../context/Provider';
import { Cart } from '../cart/Cart';
import { CartButton } from '../CartButton/CardButton';

export const Header = () => {
  const {isOpen, setIsOpen} = useContext(Context);

  useEffect(() => {
    const checkRestaurantOpen = () => {
      
      const now = new Date();
      const hours = now.getHours();
      console.log(hours)
      if (hours >= 7 && hours <= 21) {
        setIsOpen(!false);

      } 
    };
  
    checkRestaurantOpen();
  
    const intervalId = setInterval(checkRestaurantOpen, 60000);
  
    return () => clearInterval(intervalId); 
  }, []);
  

  return (
    
    <header className='relative'>
      
      <img src={Logo} alt="Logo" />
      <h2>Lanchonete Escolar</h2>
      
      <p>ITB Brasilío Flores de Azevedo</p>
      <span className={`restaurant ${isOpen ? 'open' : 'closed'}`}>
        Seg á Sex - 07:00 as 22:00
      </span>
      <Cart/>
     <CartButton/>
    </header>
  );
};


