"use client";

import React from "react";
import {
  formCredentialsSchema,
  FormInput,
  TFormCreditValues,
} from "@/components/shared/form";
import { Button } from "@/components/ui";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { resetPassword } from "@/app/actions";
import { notFound, useSearchParams } from "next/navigation";

export const FormForgot: React.FC = () => {
  const searchParams = useSearchParams();

  const form = useForm({
    resolver: zodResolver(formCredentialsSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  if (!searchParams.has("code")) {
    return notFound();
  }

  const code = searchParams.get("code");

  if (!code) {
    return notFound();
  }

  const onSubmit = async (data: TFormCreditValues) => {
    try {
      await resetPassword({
        password: data.password,
        code: code,
      });

      toast.success("Вы успешно сменили пароль. Можно закрывать страницу");
    } catch (error) {
      console.log("Error forgot ", error);
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormInput
          name={"password"}
          id={"password"}
          label={"Новый пароль"}
          type="password"
        />
        <FormInput
          name={"confirmPassword"}
          id={"confirmPassword"}
          label={"Подтвердите пароль"}
          type="password"
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || form.formState.isSubmitted}
        >
          Подтвердить
        </Button>
      </form>
    </FormProvider>
  );
};
