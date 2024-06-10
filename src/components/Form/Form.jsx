import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [address, setAddress] = useState("");

  const onSubmit = data => console.log(data);

  const notify = () => toast.error('Cep invalido!', {
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

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    if (cep.length > 8) {
      e.target.value = cep.slice(0, 8);
      return;
    }
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) {
          notify();
          setAddress("");
        } else {
          setAddress(data.logradouro);
        }
      } catch (error) {
        notify();
        setAddress("");
      }
    } else {
      setAddress("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-5 mb-32 px-4">
      <h1 className="text-center text-3xl font-bold">Enviar seu <span className="text-red-600">pedido</span></h1>
      <input
        {...register("name", { required: true })}
        placeholder="Nome"
        className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
      />
      {errors.name && <span className="text-red-600">O nome não pode está vazio</span>}
      <input
        type="number"
        {...register("phone", { required: true })}
        placeholder="Telefone"
        className="bg-white-100 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
      />
      {errors.phone && <span className="text-red-600">O número invalido!</span>}
      <input
        type="email"
        {...register("email", { required: true })}
        placeholder="Email"
        className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
      />
      {errors.email && <span className="text-red-600">Email invalido!</span>}
      <input
        type="number"
        {...register("cep", { required: true, pattern: /^[0-9]{8}$/ })}
        placeholder="Cep"
        className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
        onChange={handleCepChange}
      />
      {errors.cep && <span className="text-red-600">Cep invalido</span>}
      <input    
        type="text"
        value={address}
        placeholder="Endereço"
        className="bg-white-200 px-4 py-4 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500"
        readOnly
      />
      <button className="border py-3 bg-green-500 text-white font-bold text-2xl">Fazer pedido</button>
    </form>
  );
}
