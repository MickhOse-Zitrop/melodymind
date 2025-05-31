export const mapCreditSettings = {
  link: "ID",
  email: "электроную почту",
  phone: "номер телефона",
  password: "пароль",
};

export const creditSettings = Object.entries(mapCreditSettings).map(
  ([value, name]) => ({
    name,
    value,
  }),
);

export type CreditSetting = keyof typeof mapCreditSettings;
