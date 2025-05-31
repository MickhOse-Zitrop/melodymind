import { CartDTO, CreateCartValues } from "@/services/dto/cart.dto";
import { axiosInstance } from "@/services/instance";

export const getCart = async (): Promise<CartDTO> => {
  return (await axiosInstance.get<CartDTO>("/cart")).data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  return (await axiosInstance.delete<CartDTO>("/cart/" + id)).data;
};

export const addCartItem = async (
  values: CreateCartValues,
): Promise<CartDTO> => {
  return (await axiosInstance.post<CartDTO>("/cart", values)).data;
};
