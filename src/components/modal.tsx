import { X } from "lucide-react";
import { Input } from "./input";

export function Modal() {
  return (
    <div className="fixed w-[80%] flex justify-center">
      <div className="bg-gray-900 rounded z-50 px-5 py-8 w-[500px] rounded-md relative">
        <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Edição do usuário:
        </h3>
        <div className="absolute right-4 top-4 text-white">
          <button>
            <X />
          </button>
        </div>
        <form action="" className="flex flex-col justify-center">
          <Input type="text" name="id" disabled placeholder="id" />
          <Input type="text" name="Nome" placeholder="Nome" />
          <Input type="email" name="Email" placeholder="E-mail" />
          <button
            type="submit"
            className="flex w-full justify-center mt-3 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
