import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Checkbox, Label } from "@/components/ui";
import {
  formRegisterSchema,
  TFormRegisterValues,
} from "@/components/shared/modals/forms/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/form/form-input";
import { toast } from "sonner";
import { registerUser } from "@/app/actions";

export const RegistrationForm: React.FC = () => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        displayName: data.displayName,
        password: data.password,
      });

      toast.success(
        "Вы успешно зарегестрировали аккаунт! Подтвердите свою почту",
      );
    } catch (error) {
      console.log("Error register ", error);
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mt-5"
      >
        <FormInput
          id="displayName"
          placeholder="Введите отображаемое имя"
          label={"Отображаемое имя"}
          name="displayName"
          required
          autoFocus
        />
        <FormInput
          id="email"
          placeholder="Введите адрес электронной почты"
          type="email"
          name="email"
          label="Эл. почта"
          required
        />
        <FormInput
          id="password"
          placeholder="Введите пароль"
          type="password"
          name="password"
          label="Пароль"
          required
        />
        <FormInput
          id="confirmPassword"
          placeholder="Введите пароль еще раз"
          type="password"
          name="confirmPassword"
          label={"Подтвердите пароль"}
          required
        />
        <div className="flex gap-3">
          <Checkbox id="terms" required className="mt-1 cursor-pointer" />
          <Label
            htmlFor="terms"
            className="inline leading-5 text-muted-foreground"
          >
            Я прочел(-ла) и соглашаюсь с{" "}
            <a href="" className="text-primary underline">
              Пользовательским соглашением
            </a>{" "}
            и{" "}
            <a href="" className="text-primary underline">
              Политикой конфиденциальности
            </a>
            .
          </Label>
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || form.formState.isSubmitted}
        >
          Продолжить
        </Button>
      </form>
    </FormProvider>
  );
};
