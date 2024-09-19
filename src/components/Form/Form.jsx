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
  const { cartItems, loading, setLoading, isOpen } = useContext(Context);
  const [paymentMethod, setPaymentMethod] = useState("");

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

  const generatePurchaseCode = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  const sendEmail = async (data) => {
    const purchaseCode = generatePurchaseCode();
    const templateParams = {
      to_name: data.nome,
      to_email: data.email,
      total: cartItems.reduce((acc, item) => acc + (item.price * item.qualify), 0).toFixed(2),
      payment_method: paymentMethod,
      purchase_code: purchaseCode,
      message: "Dirija-se ao balcão da lanchonete e informe o código da compra para pegar seu pedido."
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

    if (paymentMethod === "Cartão") {
      if (!data.cartao_numero || !data.cartao_nome || !data.cartao_validade || !data.cartao_cvc) {
        notifyError('Todos os campos do cartão são obrigatórios!');
        return;
      }
    }

    setLoading(true);
    try {
      await sendEmail(data);
      notifySuccess();
      reset();
      cartItems.length = 0;
    } catch (error) {
      notifyError('Erro ao enviar o pedido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (<Loading />) : (
        <div className="w-full px-4 py-6">
          <div className="bg-white w-full text-red-600 py-2 px-2 text-4xl mb-5">
            <Link to={'/'}>
              <CiLogout />
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-4 mt-5 mb-1 px-4">
            <h1 className="text-center text-3xl font-bold mb-3">Enviar seu <span className="text-red-600">pedido</span></h1>

            {/* Campo de Nome */}
            <input
              {...register("nome", { required: true })}
              placeholder="Nome"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
            />
            {errors.nome && <span className="text-red-600">O nome não pode estar vazio</span>}

            {/* Campo de RM */}
            <input
              type="text"
              {...register("rm", { required: true, pattern: /^[0-9]{5}$/ })}
              placeholder="RM"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
            />
            {errors.rm && <span className="text-red-600">O RM é inválido!</span>}

            {/* Campo de Email */}
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email (Escolar/Pessoal)"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
            />
            {errors.email && <span className="text-red-600">Email inválido!</span>}

            {/* Unidade Escolar */}
            <input
              type="text"
              {...register("unidade_escolar", { required: true })}
              placeholder="Unidade Escolar"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
            />
            {errors.unidade_escolar && <span className="text-red-600">Este campo é obrigatório</span>}

            {/* Método de Pagamento */}
            <div className="flex flex-col mb-2">
              <label className="font-bold text-lg mb-2">Método de Pagamento:</label>
              <select
                {...register("paymentMethod", { required: true })}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="bg-white px-4 py-3 border border-black/35 rounded focus:border-green-500"
              >
                <option value="">Selecione</option>
                <option value="Cartão">Cartão de Crédito</option>
                <option value="Pix">Pix</option>
              </select>
              {errors.paymentMethod && <span className="text-red-600">Escolha um método de pagamento!</span>}
            </div>

            {/* Informações do Cartão de Crédito */}
            {paymentMethod === "Cartão" && (
              <>
                <input
                  type="text"
                  {...register("cartao_numero", { required: true })}
                  placeholder="Número do Cartão"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_numero && <span className="text-red-600">Este campo é obrigatório!</span>}
                <input
                  type="text"
                  {...register("cartao_nome", { required: true })}
                  placeholder="Nome no Cartão"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_nome && <span className="text-red-600">Este campo é obrigatório!</span>}
                <input
                  type="text"
                  {...register("cartao_validade", { required: true })}
                  placeholder="Validade (MM/AA)"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_validade && <span className="text-red-600">Este campo é obrigatório!</span>}
                <input
                  type="text"
                  {...register("cartao_cvc", { required: true })}
                  placeholder="CVC"
                  className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-2"
                />
                {errors.cartao_cvc && <span className="text-red-600">Este campo é obrigatório!</span>}
              </>
            )}

            {/* QR Code e Código Pix para pagamento via Pix */}
            {paymentMethod === "Pix" && (
              <div className="flex flex-col items-center mb-4">
                <p className="font-bold text-lg mb-2">Escaneie o QR Code abaixo para pagar via Pix:</p>
                <img src="https://api.qrserver.com/v1/create-qr-code/?data=example-pix-code&size=200x200" alt="QR Code Pix" className="w-48 h-48 mb-2" />
                <p className="font-bold mb-2">Código Pix: 1234 5678 9012 3456</p>
                <button className="text-blue-500 underline" onClick={() => navigator.clipboard.writeText("1234 5678 9012 3456")}>
                  Copiar Código Pix
                </button>
              </div>
            )}

            <textarea
              {...register("message")}
              placeholder="Mensagem (opcional)"
              className="bg-white px-4 py-3 outline-none placeholder:font-bold border border-black/35 rounded focus:border-green-500 mb-4"
            />

            <button className="border py-3 bg-green-500 text-white font-bold text-2xl transition duration-300 ease-in-out hover:bg-green-600">
              Fazer pedido
            </button>
          </form>
        </div>
      )}
    </>
  );
};
