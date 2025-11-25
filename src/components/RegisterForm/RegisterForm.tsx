import { useState } from "react";
import "./RegisterForm.css";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface FormData {
  name: string;
  email: string;
}

type Errors = Partial<FormData>;

function validateForm(
  name: string,
  email: string,
  setErrors: (errors: Errors) => void,
) {
  const newErrors: Errors = {};

  // валидация имени
  if (!name.trim()) {
    newErrors.name = "Имя обязательно для заполнения";
  } else if (name.trim().length < 2) {
    newErrors.name = "Имя должно содержать минимум 2 символа";
  }

  // валидация email с помощью регулярного выражения
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    newErrors.email = "Email обязателен для заполнения";
  } else if (!emailRegex.test(email)) {
    newErrors.email = "Введите корректный email адрес";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // валидация формы

  // обработчик отправки формы
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm(name, email, setErrors)) {
      setIsSubmitting(true);

      // имитация отправки на сервер
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      setSubmitSuccess(true);

      // очистка формы после успешной отправки
      setName("");
      setEmail("");

      // скрытие сообщения об успехе через 3 секунды
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }
  };

  return (
    <Form id="register-form" onSubmit={handleSubmit} noValidate>
      {/* поле имени */}
      <div className="form-field">
        <label htmlFor="contact-name">Ваше имя</label>
        <div className="input-container">
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors?.name}
            aria-describedby={errors?.name ? "name-error" : undefined}
            className={errors?.name ? "error" : ""}
          />
          {errors?.name && (
            <ErrorMessage id="name-error">{errors.name}</ErrorMessage>
          )}
        </div>
      </div>

      {/* поле email */}
      <div className="form-field">
        <label htmlFor="contact-email">Email</label>
        <div className="input-container">
          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors?.email}
            aria-describedby={errors?.email ? "email-error" : undefined}
            className={errors?.email ? "error" : ""}
          />
          {errors?.email && (
            <ErrorMessage id="email-error">{errors.email}</ErrorMessage>
          )}
        </div>
      </div>

      {/* кнопка отправки */}
      <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        {isSubmitting ? "Отправка..." : "Отправить"}
      </button>
    </Form>
  );
}
