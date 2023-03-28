import { cva } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "flex rounded-md shadow-sm items-center font-poppins justify-center",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white",
        outline: "border-slate-900 text-slate-900",
      },
      size: {
        default: "py-2 px-4 text-sm h-10",
        small: "px-2 text-xs h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = ({ className, size, variant, ...props }) => {
  return (
    <button
      className={twMerge(clsx(buttonVariants({ className, variant, size })))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
