import * as React from "react";
import { cn } from "../../utils/helpers";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button child */
  children: React.ReactNode;
  /* for screen readers */
  ariaLabel?: string;
  /** Button type */
  type: "submit" | "button";
  disabled?: boolean;
  className?: string;
  /** button icon left svg */
  iconLeft?: React.ReactElement;
  /** button icon right svg */
  iconRight?: React.ReactElement;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, ariaLabel, disabled, iconLeft, iconRight, ...props },
    ref
  ) => {
    return (
      <button
        aria-label={ariaLabel}
        className={cn(
          "w-[33.5rem] h-[4.8rem] mt-6 bg-blue text-white py-2 px-4 text-sm rounded-[8px] focus:outline-none cursor-pointer",
          {
            "opacity-[0.5]": disabled,
            "flex items-center justify-center gap-8": iconLeft || iconRight,
          },
          className
        )}
        ref={ref}
        {...props}
        disabled={disabled}
      >
        {iconLeft && iconLeft} {children} {iconRight && iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
