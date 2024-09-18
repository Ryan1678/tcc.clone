import { useContext } from 'react';
import { Products } from '../Products/Products';
import { Context } from '../context/Provider';
import Loading from '../Loading/Loading';
import { Sidebar } from '../Nav/Sidebar';
import { Header } from '../Header/Header';

export const Menu = () => {
  const { products, loading, select } = useContext(Context);

  const filteredProducts = select ? products.filter(product => product.type === select) : products;

  return (
    <>
    <Header/>
    <Sidebar/>
      {loading ? (
        <Loading />
      ) : (
        <div className='menu mb-10 w-full'>
          <h2 className='text-center font-bold mb-5 mt-5 text-2xl'>{select ? `Cardapio de ${select}` : 'Todos os produtos'}</h2>
          <div className='px-4 flex-col gap-10 mb-20 grid grid-cols-1 md:grid-cols-2 w-full'>
            {filteredProducts.map((product) => (
              <Products key={product.id} data={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
