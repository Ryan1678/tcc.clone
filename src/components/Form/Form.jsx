import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/Provider";
import Loading from "../Loading/Loading";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

export const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [address, setAddress] = useState("");
  const { cartItems, loading, setLoading, isOpen } = useContext(Context);

  const notifySuccess = () => toast.success('Pedido enviado! Informe seu RM para retirada do produto!!', {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const notifyError = (message) => toast.error(message, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const handlePhoneChange = (e) => {
    const phone = e.target.value.replace(/\D/g, '');

    if(phone.length > 12){
      e.target.value = phone.slice(0,11);
      return;
    }
  }

  const onSubmit = async (data) => {
    if(!isOpen){
      notifyError('Ops! O restaurante está fechado');
      return;
    }

    if (cartItems.length === 0) {
      notifyError("Carrinho está vazio!");
      return;
    }

    const total = cartItems.reduce((acc, item) =>  acc + (item.price * item.qualify),0);

    const pedidoData = {
      name: data.name,
      message: data.message,
      home: data.home,
      address: address,
      total: total.toFixed(2), // Garante que seja um número com duas casas decimais
      cart: cartItems,
      number: data.phone
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/enviar-pedido-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData),
      });

      if (response.ok) {
        notifySuccess();
        reset(); // Limpa os campos do formulário
        cartItems.length = 0
      } else {
        notifyError('Erro ao enviar pedido');
      }
    } catch (error) {
      notifyError('Ops algo não deu certo!');
    } finally {
      setLoading(false); // Define o estado de carregamento para false
    }
  };

  return (
    <>
      {loading ? (<Loading/>) : (
        <div className="w-full">
          <div className="bg-white w-full text-red-600 py-2 px-2 text-4xl">
           <Link to={'/'}>
              <CiLogout/>
           </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-5 mb-1 px-4">
            <h1 className="text-center text-3xl font-bold">Enviar seu <span className="text-red-600">pedido</span></h1>
            <input
              {...register("nome", { required: true })}
              placeholder="Nome"
              className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            {errors.name && <span className="text-red-600">O nome não pode estar vazio</span>}
            <input
              type="rm"
              {...register("rm", { required: true, pattern: /^[0-9]{5}$/ })}
              placeholder="RM"
              className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
              onChange={handlePhoneChange}
            />
            {errors.phone && <span className="text-red-600">O número é inválido!</span>}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email (Escolar/Pessoal)"
              className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            {errors.email && <span className="text-red-600">Email inválido!</span>}
            <input
              type="text"
              {...register("unidade_escolar")}
              placeholder="Unidade Escolar"
              className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            {errors.home && <span className="text-red-600">Este campo é obrigatório</span>}
            <textarea
              {...register("message")}
              placeholder="Mensagem (opcional)"
              className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            <button className="border py-3 bg-green-500 text-white font-bold text-2xl">Fazer pedido</button>
          </form>
        </div>
           
      )}
    </>

  );
}
