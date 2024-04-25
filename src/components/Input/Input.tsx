import React from "react";
import { cn } from "../../utils/helpers";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text */
  label?: string;
  /** Check if the input has error */
  hasError?: boolean;
  /** Displays error message when input has error */
  errorText?: string;
  /** Extra optional classname */
  name?: string;
  /** Determine if component should be hidden */
  hidden?: boolean;
  /** Is field required, this will display a "*" text beside the label" */
  isRequired?: boolean;
  /*additional */
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hasError,
      name,
      errorText,
      hidden,
      isRequired,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div hidden={hidden}>
        <div className="textOnInput">
          {label && (
            <label
              htmlFor={name}
              className="block text-[#B0B9C8] text-smm font-medium mb-2"
            >
              {label}
            </label>
          )}

          <input
            className={cn(
              "w-[33.5rem] px-3 py-2 h-[4.8rem] border bg-white text-base border-borderlight rounded-[8px] focus:outline-1 ",
              {
                "border border-[red]": hasError,
              },
              className
            )}
            aria-label={label}
            id={name}
            name={name}
            {...props}
            ref={ref}
            autoComplete="off"
            placeholder={props.placeholder}
          />
        </div>

        {hasError ? (
          <p className="w-full text-smm py-[2px] font-normal italic text-red-500 rounded-md focus:outline-none">
            {errorText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
