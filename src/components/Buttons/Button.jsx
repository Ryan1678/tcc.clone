import { Link } from "react-router-dom";
import { Context } from "../context/Provider";
import { useContext } from "react";
import './Button.css'
/* eslint-disable react/prop-types */
export const Button = ( {children, className, link, title} ) => {

  const {select, setSelect} = useContext(Context);
  
  const handleSelect = (select) => {
    setSelect(select);
  }

  
  return (
    <Link to={link}>
        <div className={select ? className : className }>
              <button 
              onClick={() => handleSelect(title)} 
              className="button">
                {children}
              </button>
        </div> 
    </Link>
   
  )
}
