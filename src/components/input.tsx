import { forwardRef, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentProps<"input"> {
  register?: any;
}

// Adicionando 'forwardRef' ao componente 'Input'
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, register, ...rest }, ref) => {
    return (
      <label className="block text-sm font-medium leading-6 text-white my-2">
        {name}:
        <input
          {...rest} // Passando outras props restantes
          name={name} // Definindo o atributo 'name' obrigatório para o registro
          ref={ref} // Repassando a ref
          // Registro do campo usando o React Hook Form, se 'register' estiver disponível
          {...(register && { ref: register })}
          className={twMerge(
            "block w-full mt-1 rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6",
            rest.className
          )}
        />
      </label>
    );
  }
);
