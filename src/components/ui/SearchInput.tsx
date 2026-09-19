import { clsx } from "clsx";
import { type ComponentPropsWithoutRef } from "react";
import { Input as UIInput, Button as UIBButton } from "./form-input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = ({ className, icon, ...props }: SearchBarProps) => (
  <UIInput
    className={className ?? ""}
    // @ts-expect-error: props are spread in to HTML attributes
    {...props}
  />
);

interface SearchButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Pick<ComponentPropsWithoutRef<"button">, "icon" | "variant" | "size" | "loading"> {
  icon?: React.ReactNode;
}

type InputType = "text" | "email" | "tel" | "url" | "number" | "date" | "time" | "week" | "month" | "color" | "file" | "search";

export const SearchButton = ({ icon, onClick, className, ...props }: SearchButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (onClick) onClick(e);
  };

  return (
    <UIBButton
      type="button"
      variant="outline"
      size="icon"
      onClick={handleClick}
      className={className ?? "w-10 h-10 rounded-md ring-offset-background focus-visible:ring-2 focus-visible:ring-ring p-0"}
      {...props}
    >
      {icon}
    </UIBButton>
  );
};
