import { Container, PageTitle } from "@/components/shared";
import { Button } from "@/components/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — Контакты",
};

export default function ContactsPage() {
  return (
    <Container>
      <PageTitle title={"Контакты"} className="my-10" />
      <div className="flex flex-wrap gap-5">
        <div className="flex bg-linear-to-r from-[#7474bf] to-[#348ac7] rounded-lg p-8 shadow-2xl border">
          <div className="flex flex-col items-start justify-between ">
            <div className="text-white">
              <h1 className="font-bold text-2xl mb-3">Обращения</h1>
              <p className="mb-28">
                Если у Вас возник вопрос —{" "}
                <a href="mailto:mm.business@internet.ru" className="underline">
                  напишите нам
                </a>
                .
              </p>
            </div>
            <Button
              variant="outline"
              className="border-2 border-white dark:hover:bg-white dark:hover:text-black"
              size="lg"
            >
              Частые вопросы
            </Button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/contacts.png" alt="Image" />
        </div>
        <div className="flex flex-col items-start justify-between bg-white rounded-lg p-8 text-black flex-1/5 shadow-2xl border">
          <div>
            <h1 className="font-bold text-2xl mb-3">Официальные запросы</h1>
            <p className="text-muted-foreground">
              Для отправки и получения деловых документов
            </p>
          </div>
          <a href="mailto:mm.business@internet.ru">
            <Button variant="link" className="p-0">
              mm.business@internet.ru
            </Button>
          </a>
        </div>
        <div className="flex flex-col items-start justify-between bg-white rounded-lg p-8 text-black flex-1/5 shadow-2xl border">
          <div>
            <h1 className="font-bold text-2xl">Цифровой арбитраж</h1>
            <p className="text-muted-foreground mb-3">для Правообладателей</p>
            <p className="text-muted-foreground">
              Претензии по нарушению прав на интеллектуальную собственность
            </p>
            <p>Правила оформления претензий</p>
          </div>
          <a href="mailto:mm.business@internet.ru">
            <Button variant="link" className="p-0">
              mm.business@internet.ru
            </Button>
          </a>
        </div>
        <div className="flex flex-col items-start justify-between bg-white rounded-lg p-8 text-black basis-1/4 shadow-2xl border">
          <div>
            <h1 className="font-bold text-2xl mb-3">Партнерам</h1>
            <p className="text-muted-foreground mb-20">
              Узнайте подробные условия для сотрудничества
            </p>
          </div>
          <Button variant="link" className="p-0">
            Подробнее
          </Button>
        </div>
        <div className="flex flex-col items-start justify-between bg-white rounded-lg p-8 text-black basis-1/4 shadow-2xl border">
          <div>
            <h1 className="font-bold text-2xl mb-3">Говори свободно</h1>
            <p className="text-muted-foreground mb-20">
              Сообщите нам о случаях мошенничества и коррупции на горячую линию
            </p>
          </div>
          <Button variant="link" className="p-0">
            Подробнее
          </Button>
        </div>
        <div className="bg-white rounded-lg p-8 text-black basis-1/4 shadow-2xl border">
          <h1 className="font-bold text-2xl mb-3">Юридический адреc</h1>
          <p className="text-muted-foreground mb-20">
            142181, Московская область, г. Подольск, деревня Коледино,
            Территория Индустриальный парк Коледино, д. 6, стр. 1
          </p>
        </div>
      </div>
    </Container>
  );
}
