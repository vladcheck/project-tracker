import { ReactNode } from "react";
import "./Button.css";

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: ReactNode;
    onClick?: (...args: unknown[]) => void;
  },
) {
  return (
    <button onClick={props.onClick} {...props}>
      {props.icon ?? props.name ?? ""}
    </button>
  );
}
