'use client'

import { AuthLayout } from "../_components/auth-layout";
import ArrowIcon from '../../../assets/arrow-icon.png'
import Image from "next/image";
import { inputClasses } from "../_styles/input";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

//CRIAR CONTA DO USUARIO VALIDAÇÃO
const signUpFormSchema = z.object({
    name: z.string().trim().nonempty("Nome é obrigatório"),
    email: z.string().trim().nonempty("E-mail é obrigatório"),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});


type SignUpFormData = z.input <typeof signUpFormSchema>;


export default function SignUpPage() {
    const [apiError, setApiError] = useState<string>('');

    const router = useRouter();


    const{ 
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting } 
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: 'onBlur',
    
    });


    const onSubmit = async (data: SignUpFormData) => {
        console.log(data);

        try{

       const {data:result, error: err
       } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL:"/"
        })

        if(err){
            setApiError(err.message ?? "Erro ao criar conta. Tente outro e-mail.")
            return;
            
        }
        if(result) router.push("/")

            reset()
        }catch(error){
            setApiError('Erro inesperado. Tente novamente.')
    }

    };


    return (
        <AuthLayout
            title="Criar conta"
            description="Preencha os campos abaixo para criar sua conta"
            footerText="Já tem uma conta?"
            footerLinkText="Entrar"
            footerHref="/sign-in"
        >
           
            <form className="text-[#D4D4D8] space-y-6 
            "
            onSubmit={handleSubmit(onSubmit)}
             >
            
                <label className="text-sm mb-2 block ">Nome</label>
            <input 
            className={inputClasses} 
            type="text"
            placeholder="Digite seu nome" 
            {...register("name")}/>

            {errors.name &&(
                <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
                <label className="text-sm mb-2 block ">E-mail</label>
            <input 
            className={inputClasses} 
            type="email"
            placeholder="Digite seu e-mail" 
            {...register("email")}/>
            
            {errors.email &&(
                <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
            
                <label className="text-sm mb-2 block " >Senha(mín. 8 caracteres)</label>
            <input 
            className={inputClasses} 
            type="password" 
            placeholder="••••••••"
            {...register("password")} />

            {errors.password &&(
                <p className="text-red-500 text-xs">{errors.password.message}</p>)}

            <button type="submit" className="bg-[#9333EA] hover:bg-[#7E22CE] text-white font-semibold py-4 rounded-3xl w-full flex items-center justify-center gap-2 cursor-pointer"
            disabled={isSubmitting}>
                <span>Criar conta</span>
               <Image src={ArrowIcon} alt="Arrow Icon" />
            </button>
           
           </form>
        </AuthLayout>
    );
}