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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FormData = z.infer<typeof formSchema>

const formSchema = z.object({
    name: z
        .string({ required_error: "O nome é obrigatório." })
        .min(2, { message: "Insira um nome válido." }),
    email: z
        .string({ required_error: "E-mail é obrigatório." })
        .email({ message: "E-mail inválido." })
        .toLowerCase(),
    password: z
        .string({ required_error: "Senha é obrigatória." })
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
    select: z
        .string({ required_error: "Selecione um fuso horário." })
        .min(1, { message: "Selecione um fuso horário." }),
})

const FormValidationPage = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            select: "",
        },
    })

    const onSubmit = (data: FormData) => {
        console.log(data)
        form.reset()
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
                                Selecione uma fruta
                            </label>
                            <FormField
                                control={form.control}
                                name="select"
                                render={({ field }) => (
                                    <FormItem>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className={`w-full ${
                                                        form.formState.errors
                                                            .select
                                                            ? "border-red-500"
                                                            : ""
                                                    }`}
                                                >
                                                    <SelectValue placeholder="Selecione uma fruta" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Frutas
                                                    </SelectLabel>
                                                    <SelectItem value="apple">
                                                        Apple
                                                    </SelectItem>
                                                    <SelectItem value="banana">
                                                        Banana
                                                    </SelectItem>
                                                    <SelectItem value="blueberry">
                                                        Blueberry
                                                    </SelectItem>
                                                    <SelectItem value="grapes">
                                                        Grapes
                                                    </SelectItem>
                                                    <SelectItem value="pineapple">
                                                        Pineapple
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
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
