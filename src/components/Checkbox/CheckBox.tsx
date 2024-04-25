/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import * as React from "react";
import CheckIcon from "../../utils/Icons/Check";

interface CheckboxProps {
  /** Prrops to check if checkbox is checked */
  isChecked?: boolean;
  /** Function to call when changes are made in input */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Checkbox label text */
  label?: string;
  /** Checkbox label text extra styling */
  labelClass?: string;
  /** Checkbox name for grouping checkbox inputs */
  name: string;
  /** Checkbox value */
  value: string;
  /** The id of the checkbox */
  id?: string;
  /** Boolean to determine if checkbox state is indeterminate */
  indeterminate?: boolean;
  /** Disable checkbox */
  disabled?: boolean;
}

export function Checkbox({
  isChecked,
  handleChange,
  label,
  labelClass,
  value,
  id,
  name,
  indeterminate,
  disabled,
}: CheckboxProps) {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current && typeof indeterminate === "boolean") {
      ref.current.indeterminate = !isChecked && indeterminate;
    }
  }, [ref, indeterminate, isChecked]);

  return (
    <div>
      <label
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        htmlFor={id}
        className="flex text-gray text-base cursor-pointer checked:bg-primary checked:border-0"
      >
        <input
          className="relative peer shrink-0 appearance-none w-[1.4rem] h-[1.4rem] border-[1px] bg-white border-borderlight rounded cursor-pointer"
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked}
          onChange={(e) => handleChange(e)}
          value={value}
          ref={ref}
          disabled={disabled}
        />
        <span className="absolute w-[1.3rem] h-[1.3rem] border-[1px] hidden rounded peer-checked:border-primary peer-checked:flex peer-checked:items-center peer-checked:justify-center peer-checked:bg-primary peer-indeterminate:*:hidden peer-indeterminate:flex peer-indeterminate:items-center peer-indeterminate:justify-center peer-indeterminate:border-[rgba(11,_19,_43,_0.16)] peer-indeterminate:after:content-[''] peer-indeterminate:after:w-4/5 peer-indeterminate:after:h-[1.75px] peer-indeterminate:after:bg-[rgba(11,_19,_43,_0.16)]">
          <CheckIcon />
        </span>
      </label>
    </div>
  );
}
