"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import React from "react";
import { toast } from "sonner";
import { updateUserCredentials } from "@/app/actions";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export type Variant = {
  name: string;
  value: string;
};

interface Props {
  data: string | null;
  item: Variant;
  className?: string;
}

export const EditModal: React.FC<Props> = ({ data, item, className }) => {
  const [value, setValue] = React.useState<string>(data || "");
  const [password, setPassword] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("+7");

  React.useEffect(() => {
    if (item.name === "номер телефона")
      if (data)
        if (data.slice(0, 2) !== "+7") {
          setPhone(data.slice(0, 4));
          setValue(data.slice(4));
        } else {
          setValue(data.slice(2));
        }
  }, [data, item.name]);

  const onSubmit = async () => {
    try {
      await updateUserCredentials({
        data: (item.value === "phone" ? phone : "") + value,
        column: item.value,
        password,
      });

      toast.success("Данные успешно обновлены");
    } catch (e) {
      const error = e as Error;

      if (
        error.message ==
        `Error [UPDATE_CREDIT_INFO] ${Error("Invalid password")}`
      ) {
        return toast.error("Неверный пароль");
      }

      return toast.error("Ошибка при обновлении данных", {
        action: {
          label: "Сообщить об ошибке",
          onClick: () => console.log(e),
        },
      });
    }
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Изменить {item.name}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="mb-3">
            <DialogTitle>Изменить {item.name}</DialogTitle>
          </DialogHeader>
          {item.name === "номер телефона" ? (
            <div className="flex flex-col gap-3">
              <Select defaultValue={phone} onValueChange={(e) => setPhone(e)}>
                <SelectTrigger>
                  <SelectValue placeholder="Страна" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="+994">Азербайджан (+994)</SelectItem>
                    <SelectItem value="+374">Армения (+374)</SelectItem>
                    <SelectItem value="+375">Беларусь (+375)</SelectItem>
                    <SelectItem value="+995">Грузия (+995)</SelectItem>
                    <SelectItem value="+996">Кыргызстан (+996)</SelectItem>
                    <SelectItem value="+371">Латвия (+371)</SelectItem>
                    <SelectItem value="+370">Литва (+370)</SelectItem>
                    <SelectItem value="+373">Молдова (+373)</SelectItem>
                    <SelectItem value="+7">Россия \ Казахстан (+7)</SelectItem>
                    <SelectItem value="+992">Таджикистан (+992)</SelectItem>
                    <SelectItem value="+993">Туркменистан (+993)</SelectItem>
                    <SelectItem value="+998">Узбекистан (+998)</SelectItem>
                    <SelectItem value="+380">Украина (+380)</SelectItem>
                    <SelectItem value="+372">Эстония (+372)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputOTP
                maxLength={12}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={(e) => setValue(e)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={6} />
                  <InputOTPSlot index={7} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={8} />
                  <InputOTPSlot index={9} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          ) : (
            <Input
              placeholder={`Введите ${item.name}`}
              required
              onChange={(event) => setValue(event.target.value)}
              value={value}
            />
          )}
          <Input
            placeholder={`Введите пароль`}
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button onClick={() => onSubmit()}>Сохранить</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
