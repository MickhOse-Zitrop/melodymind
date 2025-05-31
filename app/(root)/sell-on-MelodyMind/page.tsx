import { Container, PageTitle } from "@/components/shared";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Users } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — Партнерам",
};

export default function SellOnMelodyMind() {
  return (
    <Container>
      <PageTitle title={"Продавайте на MelodyMind"} className="my-10" />
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md text-left">
        <Users className="w-12 h-12 mb-4 text-indigo-500 block mx-auto" />
        <h1 className="text-3xl font-semibold mb-4">
          Станьте партнёром MelodyMind!
        </h1>
        <p className="text-lg mb-6">
          Мелодии звучат повсюду благодаря нашим партнерам-продюсерам и
          композиторам. Присоединяйтесь к нам и начните зарабатывать, делясь
          своими творческими идеями.
        </p>
        <Card className="my-6">
          <CardHeader>
            <CardTitle>Преимущества сотрудничества с MelodyMind</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc ml-6 leading-loose">
              <li>Быстрая интеграция и публикация вашей музыки.</li>
              <li>Простое управление лицензионными соглашениями.</li>
              <li>Регулярные выплаты роялти и доходов от продаж.</li>
              <li>
                Раскрутка и продвижение ваших произведений среди артистов.
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full sm:max-w-xs">
              Узнать подробности →
            </Button>
          </CardFooter>
        </Card>
        <h2 className="text-2xl font-semibold my-6">
          Хотите стать частью команды MelodyMind?
        </h2>
        <p className="text-lg mb-6">
          Оставьте заявку на участие в партнёрской программе и получите
          подробную консультацию о процессе публикации и заработка.
        </p>
        <Button className="w-full sm:max-w-xs">
          Зарегистрироваться как партнер
        </Button>
      </div>
    </Container>
  );
}
