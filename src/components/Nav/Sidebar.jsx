import { Button } from "../Buttons/Button"
import { CiPizza } from "react-icons/ci";
import { CiHotdog } from "react-icons/ci";
import { FaHamburger } from "react-icons/fa";
import './Sidebar.css'
import { useContext } from "react";
import { Context } from "../context/Provider";
import { FaHome } from "react-icons/fa";
export const Sidebar = () => {

     const {select} = useContext(Context)
   
  return (
    <nav>
          <Button link={'/'} className={`${select === '' ? 'select' : ''} home`} title={''}>
               <FaHome/> 
          </Button>

          <Button link={'/pizza'} className={`${select === 'pizza' ? 'select' : ''} pizza`} title={'pizza'}>
               <CiPizza/> 
          </Button>

          <Button link={'/hotdog'} className={`${select === 'hotdog' ? 'select' : ''} hotdog`} title={'hotdog'}>
               <CiHotdog/> 
          </Button>

          <Button link={'/hamburguer'} className={`${select === 'hamburguer' ? 'select' : ''} hamburguer` } title={'hamburguer'}>
               <FaHamburger/>
          </Button>

    </nav>
  )
}

