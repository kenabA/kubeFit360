import { clsx, type ClassValue } from "clsx";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(isoTimestamp: string, formatStr?: string) {
  return format(parseISO(isoTimestamp), formatStr || "MMM dd, hh:mm a");
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatParams(params: { [key: string]: string }) {
  const formattedParams: { [key: string]: string } = {};
  Object.keys(params).forEach((key) => {
    formattedParams[toCamelCase(key)] = params[key];
  });
  return formattedParams;
}

export function toCamelCase(str: string) {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
}
