import { useContext } from 'react'
import { Form } from '../components/Form/Form'
import { Context } from '../components/context/Provider'
import { AlertCard } from '../components/AlertCard/AlertCard'
import emailjs from 'emailjs-com';

export const Confirm = () => {

  const {cartItems} = useContext(Context)

  return (
    <>
      <div className='flex items-center justify-center'>
        {cartItems != 0 ? (<Form/>) : (
          <AlertCard 
          title={'Seu carrinho está vazio!'} 
          message={'Coloque o seu lanche favorito no carrinho, e finalize sua compra!'} 
          link={'/'}/>
          )}
      </div>
    </>
  )


}
