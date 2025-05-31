import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, { message: "Пароль должен содержать не менее 6 символов" });

export const emailSchema = z
  .string()
  .email({ message: "Введите корректную почту" });

export const formLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const emailObjectSchema = z.object({
  email: emailSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      displayName: z.string().min(2, { message: "Введите отображаемое имя" }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TEmailSchema = z.infer<typeof emailObjectSchema>;
