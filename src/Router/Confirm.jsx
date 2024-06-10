//import { useContext } from "react"
//import { Context } from "../components/context/Provider"
//import { CartItem } from "../components/CartItem/CartItem"

import { useForm } from "react-hook-form";


export const Confirm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
   
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-10 px-4">
       <h1 className="text-center">Formulario</h1>
      {/* register your input into the hook by invoking the "register" function */}
      <input 
      {...register("name", {required: true})} 
      placeholder="Nome" 
      className="bg-slate-200 px-4 py-4 outline-none placeholder:font-bold border rounded focus:border-green-500" 
      />
      {errors.name && <span className="text-red-600">O nome não pode está vazio</span>}
      <input 
      {...register("Telefone", { required: true })}  
      placeholder="Telefone" 
      className="bg-slate-200 px-4 py-4 outline-none placeholder:font-bold border rounded focus:border-green-500"
      />
      {errors.Telefone && <span className="text-red-600">O número está vazio</span>}
      
      <input type="submit" />
    </form>
  );
}
