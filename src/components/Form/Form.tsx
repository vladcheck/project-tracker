import { ComponentProps } from "react";

interface FormProps extends ComponentProps<"form"> {
  isSubmitting: boolean;
  submitSuccess: boolean;
}

export default function Form(props: FormProps) {
  return (
    <div className="accessible-form-container">
      {/* область для скринридера - объявляет статус отправки */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {props.isSubmitting && "Отправка формы..."}
        {props.submitSuccess && "Форма успешно отправлена!"}
      </div>

      {/* визуальное сообщение об успехе */}
      {props.submitSuccess && (
        <div className="success-message" role="alert">
          Спасибо! Ваше сообщение успешно отправлено.
        </div>
      )}
      {/* @ts-ignore */}
      <form {...props} className="form">
        <h2>{props.title}</h2>
        {props.children}
      </form>
    </div>
  );
}
