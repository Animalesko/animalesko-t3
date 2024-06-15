import classnames from "classnames";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...params: ClassNameValue[]) {
  return twMerge(classnames(params));
}
