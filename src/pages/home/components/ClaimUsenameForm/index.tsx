import { Button, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormAnnotation } from "./styles";
import { error } from "console";
import { useRouter } from "next/router";

//Usar a validação do ZOD
const claimUsernameFormSchema = z.object({
    username: z.string()
    .min(3, { message: "Usuário deve ter pelo menos 3 letras"})
    .regex(/^([a-z\\-]+)$/i, { message: "O usuário só poderá usar letras e hífens"})
    .transform(username => username.toLowerCase()),
})

//Transformar o ZOD em uma tipagem
type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema >

export function ClaimUsenameForm() {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema)
    })
        //Cria essa const para poder usar o router, e faz essa função para mandar o nome que vc digitou para a proxima tela 
        const router = useRouter();

        async function handleClaimUsername(data: ClaimUsernameFormData) {
                const { username } = data;

                await router.push(`/register?username=${username}`);
        }

    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput 
                    size="sm"
                    prefix="ignite.com/"
                    placeholder="seu-usuario"
                    {...register('username')}


                />
                {/*esse "isSubmitting serve para o botao ficar em carregamento e nao permitir que o usuario fique apertando
                diversas vezes no carregamento" */}
                <Button size="sm" type="submit" disabled={isSubmitting}>
                    Reservar Usuário
                    <ArrowRight />
                </Button>
                

            </Form>

            <FormAnnotation>
                <Text>
                    {errors.username ? errors.username.message : "Digite o nome do usuario"}
                </Text>
            </FormAnnotation>
        </>
    )
}