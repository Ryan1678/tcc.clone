import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/Provider";
import Loading from "../Loading/Loading";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import emailjs from 'emailjs-com';

emailjs.init("y99EZ8SnpoZVsTjGn"); 

export const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [address, setAddress] = useState("");
  const { cartItems, loading, setLoading, isOpen } = useContext(Context);

  const notifySuccess = () => toast.success('Pedido enviado! Verifique seu Email.', {
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
    if (phone.length > 11) {
      e.target.value = phone.slice(0, 11);
    }
  };

  const sendEmail = async (data) => {
    const templateParams = {
      to_name: data.nome,
      to_email: data.email,
      total: cartItems.reduce((acc, item) => acc + (item.price * item.qualify), 0).toFixed(2),
      message: "Por favor, acesse o site para finalizar o pagamento.",
    };

    try {
      await emailjs.send('service_z74uxl4', 'template_28vxj6g', templateParams, 'y99EZ8SnpoZVsTjGn');
      console.log('Email enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar o email:', error);
      notifyError('Erro ao enviar e-mail.');
    }
  };

  const onSubmit = async (data) => {
    if (!isOpen) {
      notifyError('Ops! A Escola está fechada');
      return;
    }

    if (cartItems.length === 0) {
      notifyError("Carrinho está vazio!");
      return;
    }

    setLoading(true);
    try {
      await sendEmail(data); // Aguarda o envio do e-mail
      notifySuccess(); // Notifica o sucesso após o envio
      reset(); // Limpa os campos do formulário
      cartItems.length = 0; // Limpa o carrinho
    } catch (error) {
      notifyError('Erro ao enviar o pedido.');
    } finally {
      setLoading(false); // Define o estado de carregamento para false
    }
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <div className="w-full">
          <div className="bg-white w-full text-red-600 py-2 px-2 text-4xl">
            <Link to={'/'}>
              <CiLogout />
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-5 mb-1 px-4">
            <h1 className="text-center text-3xl font-bold">Enviar seu <span className="text-red-600">pedido</span></h1>
            <input
              {...register("nome", { required: true })}
              placeholder="Nome"
              className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            {errors.nome && <span className="text-red-600">O nome não pode estar vazio</span>}
            <input
              type="text"
              {...register("rm", { required: true, pattern: /^[0-9]{5}$/ })}
              placeholder="RM"
              className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
              onChange={handlePhoneChange}
            />
            {errors.rm && <span className="text-red-600">O RM é inválido!</span>}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email (Escolar/Pessoal)"
              className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            {errors.email && <span className="text-red-600">Email inválido!</span>}
            <input
              type="text"
              {...register("unidade_escolar", { required: true })}
              placeholder="Unidade Escolar"
              className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
            />
            {errors.unidade_escolar && <span className="text-red-600">Este campo é obrigatório</span>}
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
};
