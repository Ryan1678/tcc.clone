import { Link } from "react-router-dom"
import ImageErro from "../assets/404.png"

export const Error = () => {
  return (
    <main className="flex flex-col items-center px-4">
        <img src={ImageErro} alt="" />
        <div className="w-full h-auto flex flex-col gap-3 items-center">
            <h2 className="text-3xl font-bold w-2/4 "><span className="text-red-600">Pagina</span> não encontrada</h2>

            <Link to={'/'}>
                <button className="py-4 px-4 bg-green-500 rounded text-white font-bold hover:bg-green-800 transition-colors">Clique aqui para Voltar</button>
            </Link>
        </div>

        
    </main>
  )
}
