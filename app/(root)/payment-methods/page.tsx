import { Container, PageTitle } from "@/components/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Bitcoin, CreditCard, Wallet } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MelodyMind — Помощь",
};

export default function PaymentMethods() {
  return (
    <Container>
      <PageTitle title={"Способы оплаты"} className="my-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CreditCard className="w-6 h-6 mr-2 inline-block" />
            <CardTitle>Банковские карты</CardTitle>
          </CardHeader>
          <CardContent>Оплата картами Visa, Mastercard, МИР.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Wallet className="w-6 h-6 mr-2 inline-block" />
            <CardTitle>Электронные деньги</CardTitle>
          </CardHeader>
          <CardContent>Яндекс.Деньги, QIWI, Webmoney.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            {/*<PaypalLogo className="w-6 h-6 mr-2 inline-block" />*/}
            <CardTitle>PayPal</CardTitle>
          </CardHeader>
          <CardContent>Международные переводы через PayPal.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Bitcoin className="w-6 h-6 mr-2 inline-block" />
            <CardTitle>Криптовалюты</CardTitle>
          </CardHeader>
          <CardContent>BTC, ETH, USDT.</CardContent>
        </Card>
      </div>
      <p className="mt-6">
        Платежи осуществляются через защищённые шлюзы и шифруются современными
        технологиями.
      </p>
    </Container>
  );
}
