"use server";

import { OrderStatus, Prisma } from "@prisma/client";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { createPayment, sendEmail } from "@/lib";
import {
  ForgotTemplate,
  VerificationTemplate,
} from "@/components/shared/email-templates";
import type { PutBlobResult } from "@vercel/blob";

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("No user session found");
    }

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        imageUrl: body.imageUrl ? body.imageUrl : findUser?.imageUrl,
        displayName: body.displayName,
        name: body.name ? body.name : findUser?.name,
        surname: body.surname ? body.surname : findUser?.surname,
        location: body.location ? body.location : findUser?.location,
        bio: body.bio ? body.bio : findUser?.bio,
        TT: body.TT ? body.TT : findUser?.TT,
        YT: body.YT ? body.YT : findUser?.YT,
        SC: body.SC ? body.SC : findUser?.SC,
        TH: body.TH ? body.TH : findUser?.TH,
      },
    });
  } catch (error) {
    throw new Error(`Error [UPDATE_USER_INFO] ${error}`);
  }
}

export async function updateUserCredentials(body: {
  data: string;
  column: string;
  password: string;
}) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("No user session found");
    }

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    const isPasswordCorrect = await compare(body.password, findUser!.password);

    if (!isPasswordCorrect && body.password) {
      throw new Error("Invalid password");
    }

    await prisma.user.update({
      where: { id: Number(currentUser.id) },
      data: {
        link: body.column === "link" ? body.data : findUser?.link,
        email: body.column === "email" ? body.data : findUser?.email,
        password:
          body.column === "password"
            ? hashSync(body.data, 10)
            : findUser?.password,
        phone: body.column === "phone" ? body.data : findUser?.phone,
      },
    });
  } catch (error) {
    throw new Error(`Error [UPDATE_CREDIT_INFO] ${error}`);
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена");
      }

      throw new Error("Пользователь существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        displayName: body.displayName,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "MelodyMind | Подтверждение регистрации",
      VerificationTemplate({ code }),
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function forgotUser(body: { email: string }) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }

    const code = Math.floor(100000000 + Math.random() * 900000000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: user.id,
      },
    });

    await sendEmail(
      user.email,
      "MelodyMind | Сброс пароля",
      ForgotTemplate({ code }),
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function resetPassword(body: { password: string; code: string }) {
  try {
    const verificationCode = await prisma.verificationCode.findFirst({
      where: { code: body.code },
    });

    if (!verificationCode) {
      throw new Error("Истек срок действия кода");
    }

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        password: hashSync(body.password, 10),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(body: { id: string }) {
  try {
    await prisma.user.delete({
      where: { id: Number(body.id) },
    });

    await prisma.favorite.deleteMany({
      where: { userId: Number(body.id) },
    });

    await prisma.cart.deleteMany({
      where: { userId: Number(body.id) },
    });

    await prisma.purchase.deleteMany({
      where: { userId: Number(body.id) },
    });

    await prisma.subscriber.delete({
      where: { id: Number(body.id) },
    });

    await prisma.verificationCode.deleteMany({
      where: { userId: Number(body.id) },
    });

    await prisma.track.deleteMany({
      where: { userId: Number(body.id) },
    });

    await prisma.playlist.deleteMany({
      where: { userId: Number(body.id) },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteTracks = async (body: { id: string }) => {
  try {
    const tracks = await prisma.track.findMany({
      where: { userId: Number(body.id) },
    });

    tracks.map(async (track) => {
      await prisma.cartItem.deleteMany({
        where: {
          trackType: {
            trackId: track.id,
          },
        },
      });

      await prisma.favoriteItem.deleteMany({
        where: { trackId: track.id },
      });

      await prisma.playlistItem.deleteMany({
        where: { trackId: track.id },
      });

      await prisma.trackType.deleteMany({
        where: { trackId: track.id },
      });
    });

    await prisma.track.deleteMany({
      where: { userId: Number(body.id) },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteTrack = async (body: { id: string }) => {
  try {
    await prisma.cartItem.deleteMany({
      where: {
        trackType: {
          trackId: Number(body.id),
        },
      },
    });

    await prisma.favoriteItem.deleteMany({
      where: { trackId: Number(body.id) },
    });

    await prisma.playlistItem.deleteMany({
      where: { trackId: Number(body.id) },
    });

    await prisma.trackType.deleteMany({
      where: { trackId: Number(body.id) },
    });

    await prisma.track.delete({
      where: { id: Number(body.id) },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSubscription = async (body: { id: number }) => {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Необходимо войти в свой аккаунт!");
    }

    const findUser = await prisma.user.findFirst({
      where: { id: Number(currentUser.id) },
    });

    const findAuthor = await prisma.user.findFirst({
      where: { id: body.id },
      include: {
        author: {
          include: {
            subscribers: true,
          },
        },
      },
    });

    if (!findUser || !findAuthor) {
      throw new Error("No user found");
    }

    if (!findAuthor.author) {
      await prisma.author.create({
        data: {
          id: findAuthor.id,
        },
      });
    }

    const findSubscriber = await prisma.subscriber.findFirst({
      where: {
        id: findUser.id,
      },
    });

    if (!findSubscriber) {
      await prisma.subscriber.create({
        data: {
          id: findUser.id,
        },
      });
    }

    const subscription = findAuthor.author?.subscribers.find(
      (sub) => sub.id === findUser.id,
    );

    if (!subscription) {
      await prisma.author.update({
        where: {
          id: findAuthor.id,
        },
        data: {
          subscribers: {
            connect: {
              id: findUser.id,
            },
          },
        },
      });

      return {
        message: `Вы успешно подписались на ${findAuthor.displayName}`,
        sub: true,
      };
    }

    await prisma.author.update({
      where: {
        id: findAuthor.id,
      },
      data: {
        subscribers: {
          delete: {
            id: findUser.id,
          },
        },
      },
    });

    return { message: `Вы отписались от ${findAuthor.displayName}`, sub: null };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateLike = async (body: { id: number }) => {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Войдите в аккаунт, чтобы добавлять в избранное");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("Неизвестный аккаунт");
    }

    const track = await prisma.track.findFirst({
      where: { id: body.id },
    });

    if (!track) {
      throw new Error("Такого трека не существует");
    }

    const favorite = await prisma.favorite.findFirst({
      where: { userId: Number(session.id) },
      include: { favoriteItem: true },
    });

    if (!favorite) {
      const createdFavorite = await prisma.favorite.create({
        data: {
          userId: Number(session.id),
        },
      });

      await prisma.favoriteItem.create({
        data: {
          trackId: track.id,
          favoriteId: createdFavorite.id,
        },
      });

      return {
        message: `Трек "${track.title}" добавлен в избранное`,
        like: 1,
      };
    }

    const favoriteItem = await prisma.favoriteItem.findFirst({
      where: { favoriteId: favorite.id, trackId: track.id },
    });

    if (!favoriteItem) {
      await prisma.favoriteItem.create({
        data: {
          trackId: track.id,
          favoriteId: favorite.id,
        },
      });

      return {
        message: `Трек "${track.title}" добавлен в избранное`,
        like: 1,
      };
    }

    await prisma.favoriteItem.delete({
      where: { id: favoriteItem.id },
    });

    return {
      message: `Трек "${track.title}" удален из избранных`,
      like: 0,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAvatar = async (body: { imageUrl: string }) => {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Войдите в аккаунт!");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("Неизвестный аккаунт");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        imageUrl: body.imageUrl,
      },
    });

    return "Изображение успешно изменено";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createTrack = async (body: {
  title: string;
  imageUrl?: PutBlobResult;
  bpm?: number;
  demo?: boolean;
  tags?: string;
  mp3Price: number;
  mp3Url: PutBlobResult;
  wavPrice: number;
  wavUnlimitPrice: number;
  wavUrl?: PutBlobResult;
}) => {
  try {
    const session = await getUserSession();

    if (!session) {
      throw new Error("Войдите в аккаунт!");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });

    if (!user) {
      throw new Error("Неизвестный аккаунт");
    }

    const track = await prisma.track.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl?.url,
        bpm: body.bpm,
        demo: body.demo,
        tags: body.tags,
        downloadUrl: body.demo ? body.mp3Url.downloadUrl : null,
        userId: user.id,
      },
    });

    if (body.wavUrl) {
      await prisma.trackType.createMany({
        data: [
          {
            name: "mp3",
            price: body.mp3Price,
            fileUrl: body.mp3Url.url,
            trackId: track.id,
          },
          {
            name: "wav",
            price: body.wavPrice,
            fileUrl: `${body.mp3Url.url}&&&${body.wavUrl.url}`,
            trackId: track.id,
          },
          {
            name: "wav_unlimited",
            price: body.wavUnlimitPrice,
            fileUrl: `${body.mp3Url.url}&&&${body.wavUrl.url}`,
            trackId: track.id,
          },
        ],
      });

      return "Трек успешно загружен";
    }

    await prisma.trackType.create({
      data: {
        name: "mp3",
        price: body.mp3Price,
        fileUrl: body.mp3Url.url,
        trackId: track.id,
      },
    });

    return "Трек успешно загружен";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateListens = async (body: { id: number }) => {
  try {
    const track = await prisma.track.findFirst({
      where: { id: body.id },
    });

    if (!track) {
      throw new Error("No track found!");
    }

    await prisma.track.update({
      where: { id: track.id },
      data: {
        listens: track.listens + 1,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      throw new Error("No session found!");
    }

    const user = await prisma.user.findFirst({
      where: { id: Number(session.id) },
    });
    if (!user) {
      throw new Error("No session found!");
    }

    const userCart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            trackType: {
              include: {
                track: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        },
        user: true,
      },
    });

    if (!userCart) {
      throw new Error("No user cart found!");
    }

    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty!");
    }

    const order = await prisma.purchase.create({
      data: {
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        userId: userCart.userId as number,
      },
    });

    await prisma.purchaseItem.createMany({
      data: userCart.items.map((item) => ({
        purchaseId: order.id,
        trackTypeId: item.trackTypeId,
      })),
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: `Оплата заказа №${order.id}`,
    });

    if (!paymentData) {
      throw new Error("No order found!");
    }

    await prisma.purchase.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    return paymentData.confirmation.confirmation_url;
  } catch (error) {
    console.log(error);
  }
};
