import { Container, PageTitle } from "@/components/shared";
import { AlertTriangle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — Помощь",
};

export default function SalesRules() {
  return (
    <Container>
      <PageTitle title={"Правила продажи"} className="my-10" />
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md text-left">
        <h1 className="flex items-center text-3xl font-semibold mb-4">
          Правила продажи битов
          <AlertTriangle className="w-12 h-12 text-yellow-500 block" />
        </h1>
        <ol className="list-decimal pl-6 leading-loose">
          <li>
            Покупатели приобретают стандартные или эксклюзивные лицензии на
            использование битов.
          </li>
          <li>
            Покупателям запрещается нарушать авторские права владельцев битов.
          </li>
          <li>
            Все продаваемые биты гарантированно оригинальные и уникальные.
          </li>
          <li>
            Возврат денежных средств не предусмотрен после совершения сделки.
          </li>
          <li>
            Название и авторы бита подлежат изменению только с разрешения
            продавца.
          </li>
        </ol>
        <p className="mt-6">
          Важно соблюдать указанные правила для поддержки безопасной среды
          обмена музыкой.
        </p>
      </div>
    </Container>
  );
}
