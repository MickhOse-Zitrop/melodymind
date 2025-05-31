"use client";

import React, { PropsWithChildren } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { signIn } from "next-auth/react";
import { ForgotForm, LoginForm, RegistrationForm } from "@/components/shared";

interface Props {
  className?: string;
}

export const AuthorizationModal: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const [method, setMethod] = React.useState<string>("sign-in");

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          {children || (
            <div className="flex items-center gap-3">
              <Button variant="secondary" onClick={() => setMethod("sign-in")}>
                Вход
              </Button>
              <Button onClick={() => setMethod("sign-up")}>Регистрация</Button>
            </div>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle />
          <Tabs defaultValue={method}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="sign-in">Вход</TabsTrigger>
              <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
              <LoginForm />
            </TabsContent>
            <TabsContent value="sign-up">
              <RegistrationForm />
            </TabsContent>
            <TabsContent value="forgot">
              <ForgotForm />
            </TabsContent>
          </Tabs>
          <div className="relative flex items-center justify-center my-5">
            <Separator />
            <p className="absolute text-muted-foreground -top-3.5 bg-background px-4">
              или
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              onClick={() =>
                signIn("google", { callbackUrl: "/", redirect: true })
              }
            >
              <Avatar className="absolute left-8 size-6">
                <AvatarImage src="/google.png" alt="Google" />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              Вход с аккаунтом Google
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                signIn("yandex", { callbackUrl: "/", redirect: true })
              }
            >
              <Avatar className="absolute left-8 size-6">
                <AvatarImage src="/yandex.png" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              Вход с аккаунтом Яндекс
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
