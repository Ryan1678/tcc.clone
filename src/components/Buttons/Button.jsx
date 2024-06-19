import { NavLink } from "react-router-dom";
import { Context } from "../context/Provider";
import { useContext } from "react";
import './Button.css'
/* eslint-disable react/prop-types */
export const Button = ( {children, className, link, title} ) => {

  const {setSelect} = useContext(Context);
  
  const handleSelect = (select) => {
    setSelect(select);
  }

  
  return (

    <NavLink to={link} className={({isActive}) => (isActive ? className : className)}>
         <button 
                onClick={() => handleSelect(title)} 
                className="button">
                {children}
              </button>
    </NavLink>
   
  )
}
