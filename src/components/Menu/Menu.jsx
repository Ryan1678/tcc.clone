import { useContext } from 'react';
import { Products } from '../Products/Products';
import { Context } from '../context/Provider';
import Loading from '../Loading/Loading';

export const Menu = () => {
  const { products, loading, select } = useContext(Context);

  const filteredProducts = select ? products.filter(product => product.type === select) : products;

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='menu'>
          <h2 className='text-center font-bold mb-5 mt-5 text-2xl'>{select ? `Cardapio de ${select}` : 'Nossos melhores lanches'}</h2>
          <main className='px-2 flex flex-col gap-4 mb-20'>
            {filteredProducts.map((product) => (
              <Products key={product.id} data={product} />
            ))}
          </main>
        </div>
      )}
    </>
  );
};
