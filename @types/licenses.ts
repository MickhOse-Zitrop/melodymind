import { JSX } from "react";

type Condition = {
  title: string;
  icon: JSX.Element;
};

export type License = {
  id: string;
  title: string;
  price: number;
  formats: string[];
  conditions: Condition[];
};