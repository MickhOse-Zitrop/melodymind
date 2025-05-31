import React from "react";
import { CartItemDTO } from "@/services/dto/cart.dto";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку!</h1>
    <p>Ваш заказ №{orderId} оплачен. Список товаров:</p>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.trackType.track.title} | {item.trackType.track.user.displayName}{" "}
          - {item.trackType.price} ₽
        </li>
      ))}
    </ul>
  </div>
);
