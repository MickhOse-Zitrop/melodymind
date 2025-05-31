import React from "react";
import { Button, Separator, TabsContent } from "@/components/ui";
import { cn } from "@/lib";
import { EditModal, EditPasswordModal, Warning } from "@/components/shared/";
import { User } from "@prisma/client";
import { creditSettings } from "@/constants/credentials-settings";

interface Props {
  data: User;
  className?: string;
}

export const CreditSettings: React.FC<Props> = ({ data, className }) => {
  const items = creditSettings;

  return (
    <TabsContent
      value="credentials"
      className={cn(className, "w-full px-3 py-5 flex flex-col gap-6")}
    >
      <Separator />
      <div className="flex flex-col">
        <p className="text-sm">ID</p>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{data.link || "Отсутствует"}</h2>
          <EditModal item={items[0]} data={data.link} />
        </div>
      </div>
      <Separator />
      <div className="flex flex-col">
        <p className="text-sm">Электронная почта</p>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{data.email}</h2>
          {!data.provider && <EditModal item={items[1]} data={data.email} />}
        </div>
      </div>
      {/*{!data.provider && (*/}
      <>
        <Separator />
        <div className="flex flex-col">
          <p className="text-sm">Пароль</p>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">********</h2>
            <EditPasswordModal item={items[3]} data={data} />
          </div>
        </div>
      </>
      {/*// )}*/}
      <Separator />
      <div className="flex flex-col">
        <p className="text-sm">Номер телефона</p>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {data.phone
              ? data.phone.slice(0, 2) === "+7"
                ? `${data.phone.slice(0, 2)} ${data.phone.slice(2, 5)} ${data.phone.slice(5, 8)}-${data.phone.slice(8, 10)}-${data.phone.slice(10, 12)}`
                : `${data.phone.slice(0, 4)} ${data.phone.slice(4)}`
              : "Отсутствует"}
          </h2>
          <EditModal item={items[2]} data={data.phone} />
        </div>
      </div>
      {/*<Separator />*/}
      {/*<div className="flex flex-col">*/}
      {/*  <p className="text-sm">Двухфакторная аутентификация</p>*/}
      {/*  <div className="flex justify-between items-center">*/}
      {/*    <h2 className="text-lg font-bold">Отсутствует</h2>*/}
      {/*    <Button variant="link">*/}
      {/*      Изменить метод обеспечения безопасности*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Separator />
      <Separator className="mt-6" />
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Скрытие публикаций</h2>
          <p className="text-sm text-muted-foreground">
            Вы сделаете ваши посты невидимыми для всех пользователей кроме вас
            самих
          </p>
        </div>
        <Button variant="secondary">Скрыть публикации</Button>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-red-600">
            Удаление публикаций
          </h2>
          <p className="text-sm text-muted-foreground">
            Все ваши записи будут навсегда удалены с сайта
          </p>
        </div>
        <Warning
          title={"Вы абсолютно уверены?"}
          description={
            "Это действие невозможно отменить. Это приведет к необратимому удалению всех ваших публикаций с наших серверов."
          }
          data={data}
          type={"tracks"}
        >
          <Button variant="destructive">Удалить публикации</Button>
        </Warning>
      </div>
      <Separator />
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-red-600">Удаление аккаунта</h2>
          <p className="text-sm text-muted-foreground">
            Ваш профиль и вся информация, связанная с ним, исчезнут безвозвратно
          </p>
        </div>
        <Warning
          title={"Вы абсолютно уверены?"}
          description={
            "Это действие невозможно отменить. Это приведет к необратимому удалению вашей учетной записи и ваших данных с наших серверов."
          }
          data={data}
          type={"user"}
        >
          <Button variant="destructive">Удалить аккаунт</Button>
        </Warning>
      </div>
      <Separator />
    </TabsContent>
  );
};
