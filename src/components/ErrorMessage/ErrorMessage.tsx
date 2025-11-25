import { PropsWithChildren } from "react";
import "./ErrorMessage.css";

export default function ErrorMessage({
  children,
  id,
}: PropsWithChildren & { id: string }) {
  return (
    <span className="error-message" role="alert" id={id}>
      {children}
    </span>
  );
}
