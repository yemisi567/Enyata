import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { format } from "date-fns";

export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}

// function to captitalize string
export function toTitleCase(str: string) {
    return str?.replace(/\w\S*/g, function (txt) {
        return txt?.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export const formatDate = (
    isoDate: string,
    dateFormat = "MMM d, yyyy",
) => {
    if (!Date.parse(isoDate)) return "--";

 
        if (typeof isoDate === "string" && isoDate?.includes("Z")) {
            return format(
                new Date(isoDate.replace("Z", "")),
                dateFormat || "MMM d, yyyy"
            );
        }
        return format(new Date(isoDate), dateFormat || "MMM d, yyyy");
   
};

export function extractNumberFromUrl(url:string) {
    const regex = /\/(\d+)\/$/;
    const match = url.match(regex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }
