"use client";

import React from "react";
import { Container } from "@/components/shared/container";
import { PageTitle } from "@/components/shared/page-title";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { ProfileSettings } from "@/components/shared/profile-settings";
import { CreditSettings } from "@/components/shared/credit-settings";
import { User } from "@prisma/client";

interface Props {
  data: User;
}

export const Edit: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <PageTitle title={"Редактировать профиль"} className="my-10" />
      <div className="flex justify-center">
        <Tabs
          defaultValue="profile"
          className="w-full px-48 gap-5 items-center"
        >
          <TabsList className="w-full">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="credentials">Учетные данные</TabsTrigger>
            <TabsTrigger value="subscription">Подписка</TabsTrigger>
          </TabsList>
          <ProfileSettings data={data} />
          <CreditSettings data={data} />
          <TabsContent
            value="subscription"
            className="py-48 text-3xl font-bold text-center"
          >
            Подписка временно недоступна. Попробуйте позже или свяжитесь с нами
            для получения дополнительной информации.
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
};
