import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from '../Nav/Sidebar';
import { Provider } from '../context/Provider';
import { Header } from '../Header/Header';
import { Home } from '../../Router/Home';
import { Pizzas } from '../../Router/Pizzas';
import { Hamburgueres } from '../../Router/Hamburgueres';
import { Hotdogs } from '../../Router/Hotdogs';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Confirm } from '../../Router/Confirm';

export const Main = () => {



  return (
    <main className='flex flex-col justify-center items-center'>
      <Provider>
        <Router>
          <Header />
          <Sidebar />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/pizza' element={<Pizzas />} />
            <Route path='/hamburguer' element={<Hamburgueres />} />
            <Route path='/hotdog' element={<Hotdogs />} />
            <Route path='/comfirm/verify' element={<Confirm />} />
          </Routes>
        </Router>
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
