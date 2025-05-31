import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { updateUserCredentials } from "@/app/actions";
import { toast } from "sonner";
import { Variant } from "./edit-modal";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../form/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  formCredentialsSchema,
  TFormCreditValues,
} from "@/components/shared/form/schemas";
import { User } from "@prisma/client";

interface Props {
  data: User;
  item: Variant;
  className?: string;
}

export const EditPasswordModal: React.FC<Props> = ({
  data,
  item,
  className,
}) => {
  const form = useForm({
    resolver: zodResolver(formCredentialsSchema),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormCreditValues) => {
    console.log(this);

    try {
      await updateUserCredentials({
        data: data.password,
        column: item.value,
        password: data.oldPassword,
      });

      toast.success("Пароль успешно обновлен");
    } catch (e) {
      const error = e as Error;

      if (
        error.message ==
        `Error [UPDATE_CREDIT_INFO] ${Error("Invalid password")}`
      ) {
        return toast.error("Неверный пароль");
      } else if (error.message == "Invalid password") {
        return toast.error("Пароли не совпадают");
      }

      return toast.error("Ошибка при обновлении пароля", {
        action: {
          label: "Сообщить об ошибке",
          onClick: () => console.log(e),
        },
      });
    }
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Изменить пароль</Button>
        </DialogTrigger>
        <FormProvider {...form}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="gap-4 grid">
              <DialogHeader className="mb-3">
                <DialogTitle>Изменить пароль</DialogTitle>
              </DialogHeader>
              {data.provider && data.password !== "" && (
                <FormInput
                  placeholder="Старый пароль"
                  type="password"
                  name="oldPassword"
                  id="oldPassword"
                />
              )}
              <FormInput
                placeholder="Новый пароль"
                type="password"
                name="password"
                id="password"
              />
              <FormInput
                placeholder="Подтвердите новый пароль"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Сохранить
              </Button>
            </form>
          </DialogContent>
        </FormProvider>
      </Dialog>
    </div>
  );
};
