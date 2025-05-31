import { useCartStore } from "@/store";
import { useEffect } from "react";
import { CartStateItem } from "@/lib/get-cart-details";
import { CreateCartValues } from "@/services/dto/cart.dto";

type ReturnProps = {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  addCartItem: (values: CreateCartValues) => void;
  removeCartItem: (id: number) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems().then();
  }, []);

  return cartState;
};
