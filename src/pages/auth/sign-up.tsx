
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Helmet } from 'react-helmet-async';

import { useForm } from 'react-hook-form';

import { z } from 'zod'

import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom';


const signUpForm = z.object({
    email: z.string().email(),
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string()


})

type signUpForm = z.infer<typeof signUpForm>
export function SignUp() {


    const navigate = useNavigate()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<signUpForm>();



    async function handlesignUp(data: signUpForm) {


        try {
            console.log(data)

            await new Promise((resolve) => setTimeout(resolve, 200))

            toast.success('Restaurante cadastrado com sucesso!',
                {
                    action: {
                        label: 'Login',
                        onClick: () => navigate('/sign-in')
                    }
                }

            )
            console.log(isSubmitting)
        } catch (error) {
            toast.error('Erro ao cadastrar restaurante.')

        }

    }
    return (<>
        <Helmet title="Cadastrar" />
        <div className='p-8'>


            <Button variant='ghost' asChild className='absolute right-8 top-8'>
                <Link to='/sign-in' >
                    Fazer login

                </Link>

            </Button>
            <div className="w-[350px] flex flex-col justify-center gap-6">

                <div className='flex flex-col gap-2 text-center'>

                    <h1 className='text-2xl font-semibold tracking-tighter'>Criar Conta grátis </h1>
                    <p className='text-sm text-muted-foreground'>Seja um parceiro e comece suas vendas!</p>
                </div>


                <form className="space-y-4" onSubmit={
                    handleSubmit(handlesignUp)
                }>
                    <div className='space-y-2'>
                        <Label htmlFor='restaurantName'>Nome do estabelecimento</Label>
                        <Input id='restaurantName' type='text' {...register('restaurantName')} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='managerName'>Seu nome</Label>
                        <Input id='managerName' type='text' {...register('managerName')} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='email'>Seu e-mail</Label>
                        <Input id='email' type='email' {...register('email')} />
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='phone'>Seu Celular</Label>
                        <Input id='phone' type='tel' {...register('phone')} />
                    </div>
                    <Button className='w-full' type='submit' disabled={isSubmitting}>Finalizar cadastro</Button>


                    <p className='px-6 text-center leading-relaxed text-muted-foreground'>
                        Ao continuar, você concorda com nossas <a href='' className='underline underline-offset-4'> termos de serviço</a> e
                        <a href='' className='underline underline-offset-4'> políticas de privacidade</a>.
                    </p>
                </form>

            </div>
        </div>


    </>)
}