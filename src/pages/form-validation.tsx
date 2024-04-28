import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    name: z.string().min(1, { message: "Nome é obrigatório." }),
    email: z.string().email({ message: "E-mail inválido." }).toLowerCase(),
    password: z
        .string()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
    select: z
        .string({ required_error: "Selecione um fuso horário." })
        .min(1, { message: "Selecione um fuso horário." }),
})

const FormValidationPage = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
    }

    return (
        <Card className="bg-slate-100">
            <CardHeader>
                <CardTitle>Formulário com Validação</CardTitle>
                <CardDescription>
                    Formulário para testar validações com react hook form e zod
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        className="flex flex-col gap-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name" className="font-bold">
                                Nome
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Digite seu nome"
                                {...form.register("name")}
                                className={
                                    form.formState.errors.email
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {form.formState.errors &&
                                form.formState.errors.name && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-bold">
                                E-mail
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                {...form.register("email")}
                                className={
                                    form.formState.errors.email
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {form.formState.errors &&
                                form.formState.errors.email && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.email.message}
                                    </p>
                                )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="senha" className="font-bold">
                                Senha
                            </label>
                            <Input
                                id="senha"
                                type="password"
                                placeholder="Digite sua senha"
                                {...form.register("password")}
                                className={
                                    form.formState.errors.email
                                        ? "border-red-500"
                                        : ""
                                }
                            />
                            {form.formState.errors &&
                                form.formState.errors.password && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.password.message}
                                    </p>
                                )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-bold">
                                Selecione um fuso horário
                            </label>
                            <select
                                className="rounded-md p-2"
                                {...form.register("select")}
                            >
                                <option value="">
                                    Selecione um fuso horário
                                </option>
                                <option value="utc-3">UTC-3</option>
                                <option value="utc-4">UTC-4</option>
                                <option value="utc-5">UTC-5</option>
                            </select>

                            {form.formState.errors &&
                                form.formState.errors.select && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.select.message}
                                    </p>
                                )}
                        </div>

                        <Button type="submit" className="bg-emerald-500">
                            Registrar
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default FormValidationPage
