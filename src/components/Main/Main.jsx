import { Routes, Route } from 'react-router-dom';
import { Provider } from '../context/Provider';
import { Home } from '../../Pages/Home';
import { Pizzas } from '../../Pages/Pizzas';
import { Hamburgueres } from '../../Pages/Hamburgueres';
import { Hotdogs } from '../../Pages/Hotdogs';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Confirm } from '../../Pages/Form';
import { Error } from '../../Pages/Error';


export const Main = () => {

  return (
    <main className='flex flex-col justify-center items-center'>
      <Provider>
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/pizza' element={<Pizzas />} />
            <Route path='/hamburguer' element={<Hamburgueres />} />
            <Route path='/hotdog' element={<Hotdogs/>} />
            <Route path='/formulario' element={<Confirm />} />
            <Route path='*' element={<Error/>}/>
          </Routes>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
          theme="dark"
          transition={Bounce}
        />
      </Provider>
    </main>
  );
};
