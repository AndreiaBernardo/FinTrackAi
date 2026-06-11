'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'


import { AuthLayout } from "../_components/auth-layout";
import ArrowIcon from '../../../assets/arrow-icon.png'
import Image from "next/image";
import { inputClasses } from "../_styles/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth-client";


//ESQUEMA DE VALIDAÇÃO
const signInFormSchema = z.object({
    email: z
    .string()
    .min(1, 'E-mail é obrigatório')
    .regex(z.regexes.email, 'Informe um email válido'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
});


type SignInFormData = z.infer<typeof signInFormSchema>;




export default function SignIn() {
 
    const [apiError, setApiError] = useState<string | null>(null);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: '' as any,
            password: ''as any,
        },
        mode: 'onBlur',
    });

    const router = useRouter();
   


    const onSubmit = async (data: SignInFormData) => {
        console.log(data);
        try{
            const {data: result, error: err} = await authClient.signIn.email({
                
                email: data.email,
                password: data.password,
                callbackURL: '/',
            })

            if(err){
                setApiError(
                    err.message ?? 'Erro ao criar conta. Tente outro email')
                    return
            
            }

            if(result) router.push('/')

                reset()
        }catch(error){
            setApiError('Erro inesperado. Tente novamente')
    };
    }



  
    

    return (
        <AuthLayout
            title="Bem-vindo de volta"
            description="Entre com suas credenciais para acessar sua conta"
            footerText="Não tem uma conta?"
            footerLinkText="Cadastre-se"
            footerHref="/sign-up"
        >
           <form className="text-[#D4D4D8] space-y-6 "
           onSubmit={handleSubmit(onSubmit)} >
            
                <label className="text-sm mb-2 block ">E-mail</label>
            <input 
            className={inputClasses} 
            type="email"
            placeholder="Digite seu e-mail"
            {...register('email')} />
            
            {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
            
                <label className="text-sm mb-2 block " >Senha</label>
            <input 
            className={inputClasses} 
            type="password" 
            placeholder="••••••••" 
            {...register('password')} />

            {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
            )}

            <button type="submit" className="bg-[#9333EA] hover:bg-[#7E22CE] text-white font-semibold py-4 rounded-3xl w-full flex items-center justify-center gap-2 cursor-pointer">
                <span>Entrar</span>
               <Image src={ArrowIcon} alt="Arrow Icon" />
            </button>
           </form>
        </AuthLayout>
    );
}