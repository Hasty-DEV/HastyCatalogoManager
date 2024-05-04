import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import { useAuth } from "../../data/hooks/useAuth/useAuth";
import { useState } from "react";
import Loader from "../../ui/components/loader/loader";

const schema = z.object({
    name: z.string().min(3, "O nome completo deve ter pelo menos 3 caracteres!"),
    password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres!"),
    confirmPassword: z.string(),
    birthday: z.string(),
    gender: z.enum(["Male", "Female", "Other"]),
    phone: z.string(),
    cpf: z.string().length(11, "O CPF deve ter 11 caracteres!"),
    email: z.string().email("Insira um email válido!"),
    agreeTerms: z.boolean(),
}).refine((fields) => fields.password === fields.confirmPassword, {
    path: ['confirmPassword'],
    message: "As senhas precisam ser iguais"
}).refine((fields) => fields.agreeTerms === true, {
    path: ['agreeTerms'],
    message: "Precisa aceitar os termos para efetuar o cadastro."
}).refine((fields) => fields.gender.length, {
    path: ['gender'],
    message: "Selecione uma opção."
});

type FormProps = z.infer<typeof schema>;

const Register = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        mode: "all",
        reValidateMode: "onChange",
        resolver: zodResolver(schema),
    });

    const { register: registerAuth } = useAuth()

    const handleForm = async (data: FormProps) => {
        try {
            setLoading(true);
            await registerAuth(data);
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
                    <Form.Label htmlFor="name">Nome Completo</Form.Label>
                    <Form.Control {...register("name")} id="name" type="text" placeholder="Digite seu nome" />
                    {errors.name && <Form.Text>{errors.name.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="birthday">Data de Aniversário</Form.Label>
                    <Form.Control id="birthday" type="date" {...register("birthday")} />
                    {errors.birthday && <Form.Text>{errors.birthday.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="gender">Gênero</Form.Label>
                    <Form.Select id="gender" {...register("gender")}>
                        <option>Selecione uma opção</option>
                        <option value="Male">Masculino</option>
                        <option value="Female">Feminino</option>
                        <option value="Other">Outros</option>
                    </Form.Select>
                    {errors.gender && <Form.Text>Este campo é obrigatório.</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="phone">Telefone</Form.Label>
                    <Form.Control id="phone" type="text" placeholder="Digite seu número" {...register("phone")} />
                    {errors.phone && <Form.Text>Este campo é obrigatório.</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="cpf">CPF</Form.Label>
                    <Form.Control id="cpf" type="text" placeholder="Digite seu cpf" {...register("cpf")} />
                    {errors.cpf && <Form.Text>{errors.cpf.message}</Form.Text>}
                </Form.Group>
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
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="confirmPassword">Confirme sua senha</Form.Label>
                    <Form.Control id="confirmPassword" type="password" placeholder="Digite sua senha novamente" {...register("confirmPassword")} />
                    {errors.confirmPassword && <Form.Text>Este campo é obrigatório.</Form.Text>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Check id="agreeTerms" type="checkbox" label="Aceito os termos de privacidade e dados" {...register("agreeTerms")} />
                    {errors.agreeTerms && <Form.Text>Este campo é obrigatório.</Form.Text>}
                </Form.Group>
                <Button type="submit">Registrar-se</Button >
            </Form>
        </Container>
    );
};

export default Register;
