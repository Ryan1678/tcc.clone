import { NavButtons } from "../NavButtons/NavButtons"
import { GiChipsBag } from "react-icons/gi";
import { LuCandy } from "react-icons/lu";
import { RiDrinks2Fill } from "react-icons/ri";
import './Sidebar.css'
import { useContext } from "react";
import { Context } from "../context/Provider";
import { FaHome } from "react-icons/fa";
export const Sidebar = () => {

     const {select} = useContext(Context)
   
  return (
    <nav>
          <NavButtons link={'/'} className={`${select === '' ? 'select' : ''} home`} title={''}>
               <FaHome/> 
          </NavButtons>

          <NavButtons link={'/pizza'} className={`${select === 'pizza' ? 'select' : ''} pizza`} title={'pizza'}>
              <GiChipsBag /> 
          </NavButtons>

          <NavButtons link={'/hotdog'} className={`${select === 'hotdog' ? 'select' : ''} hotdog`} title={'hotdog'}>
                  <LuCandy />
          </NavButtons>

          <NavButtons link={'/hamburguer'} className={`${select === 'hamburguer' ? 'select' : ''} hamburguer` } title={'hamburguer'}>
               <RiDrinks2Fill />
          </NavButtons>

    </nav>
  )
}

