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
