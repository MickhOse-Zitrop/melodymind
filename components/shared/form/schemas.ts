import { z } from "zod";

export const mp3Schema = z
  .instanceof(File)
  .refine((file: File) => ["audio/mpeg"].includes(file.type));

export const formEditSchema = z.object({
  image: z.string(),
  displayName: z
    .string()
    .min(5, { message: "Введите корректное отображаемое имя" }),
  name: z.string().min(2, { message: "Введите корректное имя" }),
  surname: z.string().min(2, { message: "Введите корректную фамилию" }),
  location: z.string(),
  bio: z.string(),
  TT: z.string(),
  YT: z.string(),
  SC: z.string(),
  TH: z.string(),
});

export const formUploadTrackSchema = z.object({
  title: z.string().min(1, { message: "Введите название трека" }),
  tags: z.string(),
  mp3: z.coerce.number().nonnegative(),
  wav: z.coerce.number().nonnegative(),
  wav_unlimited: z.coerce.number().nonnegative(),
  bpm: z.coerce.number().positive(),
  demo: z.boolean(),
});

export const formCredentialsSchema = z
  .object({
    oldPassword: z.string(),
    password: z
      .string()
      .min(6, { message: "Пароль должен содержать минимум 6 символов" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Пароль должен содержать минимум 6 символов" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type TFormEditValues = z.infer<typeof formEditSchema>;
export type TFormCreditValues = z.infer<typeof formCredentialsSchema>;
export type TFormUploadTrackValue = z.infer<typeof formUploadTrackSchema>;
