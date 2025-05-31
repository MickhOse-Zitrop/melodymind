import React from "react";
import { Button, Separator, TabsContent } from "@/components/ui";
import { cn } from "@/lib";
import { FormInput } from "@/components/shared/form/form-input";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import {
  formEditSchema,
  TFormEditValues,
} from "@/components/shared/form/schemas";
import { toast } from "sonner";
import { FormTextarea } from "@/components/shared/form/form-textare";
import { updateUserInfo } from "@/app/actions";
import { AvatarEdit } from "@/components/shared/avatar-edit";

interface Props {
  data: User;
  className?: string;
}

export const ProfileSettings: React.FC<Props> = ({ data, className }) => {
  const form = useForm({
    resolver: zodResolver(formEditSchema),
    defaultValues: {
      image: data.imageUrl || "",
      displayName: data.displayName,
      name: data.name || "",
      surname: data.surname || "",
      location: data.location || "",
      bio: data.bio || "",
      TT: data.TT || "",
      YT: data.YT || "",
      SC: data.SC || "",
      TH: data.TH || "",
    },
  });

  const onSubmit = async (data: TFormEditValues) => {
    try {
      await updateUserInfo({
        imageUrl: data.image,
        displayName: data.displayName,
        name: data.name,
        surname: data.surname,
        location: data.location,
        bio: data.bio,
        TT: data.TT,
        YT: data.YT,
        SC: data.SC,
        TH: data.TH,
      });

      toast.success("Данные успешно обновлены");
    } catch (e) {
      return toast.error("Ошибка при обновлении данных", {
        action: {
          label: "Сообщить об ошибке",
          onClick: () => console.log(e),
        },
      });
    }
  };

  return (
    <TabsContent
      value="profile"
      className={cn(
        "w-full px-3 py-5 flex flex-col gap-6 items-center",
        className,
      )}
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-6 w-full"
        >
          <AvatarEdit data={data} />
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <FormInput
                name={"displayName"}
                required
                label={"Отображаемое имя"}
                id={"displayName"}
              />
              <FormInput name={"name"} label={"Имя"} id={"name"} />
              <FormInput name={"surname"} label={"Фамилия"} id={"surname"} />
              <FormInput
                name={"location"}
                label={"Местоположение"}
                id={"location"}
              />
            </div>
            <div className="flex flex-col gap-6">
              <FormTextarea id="bio" name={"bio"} label={"О себе"} />
            </div>
          </div>

          <Separator className="my-6" />
          <div className="w-full grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <FormInput
                name={"TT"}
                label={"Tik-Tok"}
                id={"TT"}
                placeholder="@имя_пользователя"
              />
              <FormInput
                name={"SC"}
                label={"SoundCloud"}
                id={"SC"}
                placeholder="/имя_пользователя"
              />
            </div>
            <div className="flex flex-col gap-6">
              <FormInput
                name={"TH"}
                label={"Twitch"}
                id={"TH"}
                placeholder="/имя_пользователя"
              />
              <FormInput
                name={"YT"}
                label={"YouTube"}
                id={"YT"}
                placeholder="@имя_пользователя"
              />
            </div>
          </div>

          <Separator className="my-6" />
          <div className="w-full grid grid-cols-2 gap-6">
            <Button
              variant="secondary"
              onClick={() => form.reset()}
              disabled={form.formState.isSubmitting}
              size="lg"
              type="reset"
            >
              Сбросить
            </Button>
            <Button
              size="lg"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              Сохранить
            </Button>
          </div>
        </form>
      </FormProvider>
    </TabsContent>
  );
};
