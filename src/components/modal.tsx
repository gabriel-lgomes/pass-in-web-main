import { X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { ComponentProps, useState } from "react";
import useFetch from "../hooks/useFetch";
import { newData } from "../interfaces/newData";
import { useForm } from "react-hook-form";

interface ModalProps extends ComponentProps<"div"> {
  isVisible: boolean; // Corrigido de isVisibile para isVisible
  onClose: () => void;
}

export function Modal({ isVisible, onClose }: ModalProps) {
  const urlAPI = import.meta.env.VITE_API_URL;

  const [newData, setNewData] = useState<newData>();

  // useFetch(`${urlAPI}/1`, undefined, newData);

  const { register, handleSubmit } = useForm();

  function handleData(data: any) {
    console.log(data);
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gray-900 rounded px-5 py-8 w-[500px] rounded-md relative">
        <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Edição do usuário:
        </h3>
        <div className="absolute right-4 top-4 text-white">
          <button onClick={onClose}>
            <X />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(handleData)}
          className="flex flex-col justify-center"
        >
          <Input type="text" name="id" disabled placeholder="ID" />
          <Input
            {...register("name")}
            type="text"
            name="name"
            placeholder="Nome"
          />
          <Input
            {...register("email")}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <Button type="submit">Salvar</Button>
        </form>
      </div>
    </div>
  );
}
