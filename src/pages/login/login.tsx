import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from "../../data/hooks/useAuth/useAuth";
import { useState } from "react";
import Loader from "../../ui/components/loader/loader";

const schema = z.object({
    password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres!"),
    email: z.string().email("Insira um email válido!"),
})

type FormProps = z.infer<typeof schema>;

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });

    const { signin } = useAuth()

    const handleForm = async (data: FormProps) => {
        try {
            setLoading(true);
            await signin(data);
        } catch (error) {
            if (error instanceof ZodError) {
                console.error(error.flatten());
                return;
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            {loading && <Loader />}
            <Form onSubmit={handleSubmit(handleForm)}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">E-mail</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Digite seu email" {...register("email")} />
                    {errors.email && <Form.Text>{errors.email.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Senha</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Digite sua senha" {...register("password")} />
                    {errors.password && <Form.Text>{errors.password.message}</Form.Text>}
                </Form.Group>
                <Button type="submit">Login</Button >
            </Form>
        </Container>
    );
};

export default Login;