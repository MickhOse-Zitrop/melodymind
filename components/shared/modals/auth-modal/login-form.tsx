import React from "react";
import { Button, TabsList, TabsTrigger } from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import {
  formLoginSchema,
  TFormLoginValues,
} from "@/components/shared/modals/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { FormInput } from "@/components/shared/form/form-input";

export const LoginForm: React.FC = () => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Вы успешно вошли в аккаунт");
    } catch (error) {
      console.log("Error login ", error);
      toast.error("Не удалось войти в аккаунт");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-start gap-3 mt-5 w-full"
      >
        <FormInput
          id={"email"}
          name="email"
          placeholder="Введите адрес электронной почты"
          type="email"
          label={"Эл. почта"}
        />
        <FormInput
          id="password"
          name={"password"}
          placeholder="Введите пароль"
          type="password"
          label={"Пароль"}
        />
        <TabsList withNoClass>
          <TabsTrigger value={"forgot"} asChild withNoClass>
            <Button variant="link" size="sm" className="p-0" type="button">
              Забыли пароль?
            </Button>
          </TabsTrigger>
        </TabsList>
        <Button
          className="w-full"
          type={"submit"}
          disabled={form.formState.isSubmitting}
        >
          Продолжить
        </Button>
      </form>
    </FormProvider>
  );
};
