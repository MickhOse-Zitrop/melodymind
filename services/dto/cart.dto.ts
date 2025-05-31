import { Cart, CartItem, Track, TrackType, User } from "@prisma/client";

export type CartItemDTO = CartItem & {
  trackType: TrackType & {
    track: Track & {
      user: User;
    };
  };
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartValues {
  trackTypeId: number;
  trackId: number;
}
