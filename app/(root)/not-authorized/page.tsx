import { AuthorizationModal, Container, NotImage } from "@/components/shared";
import { Button } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Пользователь не найден!",
};

export default function NotAuthorizedPage() {
  return (
    <Container className="mt-20 grid grid-cols-2 justify-center items-center w-[850px]">
      <div className="flex flex-col gap-4 my-40">
        <h1 className="text-4xl font-bold">Авторизация необходима</h1>
        <p className="">
          Чтобы получить доступ к этому содержимому, пожалуйста, <b>войдите</b>{" "}
          в систему либо <b>создайте новую учетную запись</b>.
        </p>
        <AuthorizationModal>
          <Button size="lg" className="w-full">
            Войти
          </Button>
        </AuthorizationModal>
      </div>
      <NotImage />
    </Container>
  );
}
