import { Button } from "@/components/ui";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormInput,
  TEmailSchema,
  emailObjectSchema,
} from "@/components/shared";
import { toast } from "sonner";
import { forgotUser } from "@/app/actions";

export const ForgotForm: React.FC = () => {
  const form = useForm({
    resolver: zodResolver(emailObjectSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: TEmailSchema) => {
    try {
      await forgotUser({
        email: data.email,
      });

      toast.info(
        "Если у Вас есть учетная запись, вы получите ссылку для сброса пароля на это письмо",
      );
    } catch (error) {
      console.log("Error register ", error);
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col items-start gap-3 mt-5 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput
          name="email"
          placeholder="Введите адрес электронной почты"
          type="email"
          id={"email"}
        />
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          Продолжить
        </Button>
      </form>
    </FormProvider>
  );
};
