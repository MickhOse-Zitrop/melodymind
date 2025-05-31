import { CartDTO } from "@/services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  disabled?: boolean;
  trackTypeId: string;
  trackId: number;
  author: string;
  authorId: string;
  authorImage: string;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    title: item.trackType.track.title,
    price: item.trackType.price,
    imageUrl: item.trackType.track.imageUrl || "",
    disabled: false,
    trackTypeId: item.trackType.name,
    trackId: item.trackType.track.id,
    author: item.trackType.track.user.displayName,
    authorId: item.trackType.track.user.link || item.trackType.track.user.id,
    authorImage: item.trackType.track.user.imageUrl,
  })) as CartStateItem[];

  return { items, totalAmount: data.totalAmount };
};
