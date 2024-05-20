
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';

import { useForm } from 'react-hook-form';

import { z } from 'zod'

import { toast } from 'sonner'

import { Link } from 'react-router-dom'

const signInForm = z.object({
    email: z.string().email(),


})

type SignInForm = z.infer<typeof signInForm>
export function SignIn() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignInForm>();



    async function handleSignIn(data: SignInForm) {


        try {
            console.log(data)

            await new Promise((resolve) => setTimeout(resolve, 200))

            toast.success('Enviamos um link de autentificação para seu e-mail.')
            console.log(isSubmitting)
        } catch (error) {
            toast.error('Credenciais inválidas.')

        }

    }
    return (<>
        <Helmet title="Login" />
        <div className='p-8'>

            <Button variant='ghost' asChild className='absolute right-8 top-8'>
            <Link to='/sign-up' >
                Novo estabelecimento

            </Link>

            </Button>
            <div className="w-[350px] flex flex-col justify-center gap-6">

                <div className='flex flex-col gap-2 text-center'>

                    <h1 className='text-2xl font-semibold tracking-tighter'>Acessar </h1>
                    <p className='text-sm text-muted-foreground'>Acompahe suas vendas pelo painel do parceiro!</p>
                </div>


                <form className="space-y-4" onSubmit={
                    handleSubmit(handleSignIn)
                }>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Seu e-mail</Label>
                        <Input id='email' type='email' {...register('email')} />
                    </div>
                    <Button className='w-full' type='submit' disabled={isSubmitting}> Acessar Painel</Button>
                </form>

            </div>
        </div>


    </>)
}