import { Container, NotImage } from "@/components/shared";
import { Button } from "@/components/ui";
import Link from "next/link";
import { Suspense } from "react";

export default function NotFoundPage() {
  return (
    <Container className="mt-40 grid grid-cols-2 justify-center items-center w-[815px]">
      <div className="flex flex-col gap-4 my-60">
        <h1 className="text-4xl font-bold">Страница не найдена</h1>
        <p className="">
          Запрошенная вами страница отсутствует или была перемещена. Возможно,
          произошла ошибка ввода адреса или данная информация временно
          недоступна.
        </p>
        <Link href={"/"}>
          <Button size="lg" className="w-full">
            На главную
          </Button>
        </Link>
      </div>
      <Suspense>
        <NotImage />
      </Suspense>
    </Container>
  );
}
