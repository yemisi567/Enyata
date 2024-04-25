import { cn } from "../../utils/helpers";

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  /** Additonal classes for styling components */
  classNames?: string;
}

export function Card({ children, classNames }: CardProps) {
  return (
    <article
      className={cn(
        "bg-white px-24 py-16 rounded-r8 border border-strokelight",
        classNames
      )}
    >
      {children}
    </article>
  );
}
