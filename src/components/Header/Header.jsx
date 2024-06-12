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
      console.log("Horário atual:", hours); // Adiciona um log para verificar o horário atual
      if (hours >= 18 && hours <= 22) {
        setIsOpen(true);
        console.log("Restaurante aberto!");
      } else {
        setIsOpen(false);
        console.log("Restaurante fechado!");
      }
    };
  
    // Check immediately on mount
    checkRestaurantOpen();
  
    // Check every minute
    const intervalId = setInterval(checkRestaurantOpen, 60000);
  
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);
  

  return (
    
    <header className='relative'>
      
      <img src={Logo} alt="Logo" />
      <h2>Muchies</h2>
      
      <p>Samambaia-Sul, quadra 302, df</p>
      <span className={`restaurant ${isOpen ? 'open' : 'closed'}`}>
        Seg á Dom - 18:00 as 22:00
      </span>
      <Cart/>
     <CartButton/>
    </header>
  );
};


