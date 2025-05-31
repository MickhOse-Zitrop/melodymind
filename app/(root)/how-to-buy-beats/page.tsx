import { Container, PageTitle } from "@/components/shared";
import { ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui";
import { ListItemIcon } from "@/components/shared/list-item-icon";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — Помощь",
};

export default function HowToBuyBeatsPage() {
  return (
    <Container>
      <PageTitle title={"Как покупать биты?"} className="my-10" />
      <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-md text-left">
        <h1 className="text-3xl font-semibold mb-4">Как купить бит?</h1>
        <ListItemIcon icon={<ArrowRightCircle size={24} />}>
          Выберите подходящий бит в каталоге.
        </ListItemIcon>
        <ListItemIcon icon={<ArrowRightCircle size={24} />}>
          Нажмите кнопку «Купить», расположенную возле выбранного трека.
        </ListItemIcon>
        <ListItemIcon icon={<ArrowRightCircle size={24} />}>
          Выберите удобный способ оплаты и завершите транзакцию.
        </ListItemIcon>
        <ListItemIcon icon={<ArrowRightCircle size={24} />}>
          Получите бит немедленно после успешного платежа.
        </ListItemIcon>
        <Button className="mt-6 w-full sm:max-w-xs">Каталог битов</Button>
      </div>
    </Container>
  );
}
