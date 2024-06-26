import { X } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { ComponentProps, useEffect, useState } from "react"; // Adicionando o import useEffect
import useFetch from "../hooks/useFetch";
import { newData } from "../interfaces/newData";
import { useForm } from "react-hook-form";
import axios from "axios";

interface ModalProps extends ComponentProps<"div"> {
  isVisible: boolean;
  onClose: () => void;
  dataModal: newData;
  deleteUser?: boolean;
}

export function Modal({
  isVisible,
  onClose,
  dataModal,
  deleteUser,
}: ModalProps) {
  const urlAPI = import.meta.env.VITE_API_URL;

  const [newDataState, setNewDataState] = useState<newData | undefined>();
  const { register, handleSubmit, formState } = useForm({
    mode: "onSubmit",
    shouldUseNativeValidation: true,
  });

  useFetch(`${urlAPI}/1`, "patch", newDataState);

  function handleData(formData: any) {
    setNewDataState(formData);
  }

  function handleRemoveUser() {
    axios.delete(`${urlAPI}/${dataModal.id}`);
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-gray-900 px-5 py-8 w-[500px] rounded-md relative">
        <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white max-w-[300px] block mx-auto">
          {deleteUser
            ? `Tem certeza que deseja realizar essa ação?`
            : `Edição do usuário:`}
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
          <Input
            type="text"
            name="id"
            value={dataModal.id}
            disabled
            placeholder={dataModal.id.toString()}
          />
          <Input
            {...register("name", { required: true })}
            type="text"
            name="name"
            placeholder={dataModal.name}
            required
            disabled={deleteUser}
          />
          <Input
            {...register("email", {
              required: true,
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Coloque um e-mail válido!",
              },
            })}
            type="email"
            name="email"
            placeholder={dataModal.email}
            required
            disabled={deleteUser}
          />
          {deleteUser ? (
            <Button
              onClick={() => {
                handleRemoveUser();
              }}
            >
              Confirmar
            </Button>
          ) : (
            <Button
              disabled={!formState.isValid}
              type="submit"
              onClick={() => {
                onClose();
                window.location.reload();
              }}
            >
              Salvar
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
