import { useEffect, useRef, useState } from "react";
import { Status, Tech } from "../../types";
import translate from "../../utils/i18n";
import Row from "../Row/Row";
import "./AddTechnologyForm.css";

interface AddTechnologyFormProps {
  onSave: (arg0: any) => void;
  onCancel: () => void;
  initialData?: Tech;
}

type FormData = Omit<Tech, "id">;
type Errors = Partial<Record<keyof Tech, string>>;

function isValidUrl(url: string): boolean {
  return url.trim().length > 0 && url.startsWith("http");
}

function validateForm(
  formData: FormData,
  setErrors: (errors: Errors) => void,
  setIsFormValid: (isValid: boolean) => void,
) {
  const newErrors: Partial<Record<keyof Tech, string>> = {};

  if (!formData.title.trim()) {
    newErrors.title = "Название технологии обязательно";
  }

  if (!formData.title.trim()) {
    newErrors.title = "Название технологии обязательно";
  } else if (formData.title.trim().length < 2) {
    newErrors.title = "Название должно содержать минимум 2 символа";
  } else if (formData.title.trim().length > 50) {
    newErrors.title = "Название не должно превышать 50 символов";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Описание технологии обязательно";
  } else if (formData.description.trim().length < 10) {
    newErrors.description = "Описание должно содержать минимум 10 символов";
  }

  if (formData.deadline) {
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      newErrors.deadline = "Дедлайн не может быть в прошлом";
    }
  }

  formData.resources.forEach((resource, index) => {
    if (resource && !isValidUrl(resource)) {
      // @ts-ignore
      newErrors[`resource_${index}`] = "Введите корректный URL";
    }
  });

  setErrors(newErrors);
  setIsFormValid(Object.keys(newErrors).length === 0);
}

export default function AddTechnologyForm({
  initialData,
  onSave,
  onCancel,
}: AddTechnologyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: initialData?.title || "", // название технологии
    description: initialData?.description || "", // описание
    status: initialData?.status || "not-started", // статус изучения
    category: initialData?.category || "", // категория
    difficulty: initialData?.difficulty || "none", // сложность
    deadline: initialData?.deadline || new Date(), // дедлайн (необязательно)
    resources: initialData?.resources || [""], // массив URL ресурсов
    notes: initialData?.notes || "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const updateFormData = (newEntries: Partial<Tech>) => {
    setFormData({ ...formData, ...newEntries });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResourceChange = (i: number, value: string) => {
    const newResources = [...formData.resources];
    newResources[i] = value;
    setFormData({
      ...formData,
      resources: newResources,
    });
  };

  const addResourceField = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, ""],
    }));
  };

  // удаление поля ресурса по индексу
  const removeResourceField = (index: number) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        resources: newResources,
      }));
    }
  };

  // обработчик отправки формы
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isFormValid) {
      // очищаем пустые ресурсы перед сохранением
      const cleanedData = {
        ...formData,
        resources: formData.resources.filter(
          (resource) => resource.trim() !== "",
        ),
      };

      onSave(cleanedData);
      setSubmitSuccess(true);
    } else {
      setSubmitSuccess(false);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    validateForm(formData, setErrors, setIsFormValid);
  }, [formData]);

  return (
    <form id="add-technology-form" ref={formRef}>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {isSubmitting && "Отправка формы..."}
        {submitSuccess && "Форма успешно отправлена!"}
      </div>
      <h2>Добавить технологию</h2>
      <Row>
        <label htmlFor="technology-name">Название</label>
        <div className="input-container required">
          <label htmlFor="title" className="required">
            Название технологии
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "error" : ""}
            placeholder="Например: React, Node.js, TypeScript"
            aria-describedby={errors.title ? "title-error" : undefined}
            required
          />
          {errors.title && (
            <span id="title-error" className="error-message" role="alert">
              {errors.title}
            </span>
          )}
        </div>
      </Row>
      <Row>
        <label htmlFor="category">Категория</label>
        <div className="input-container">
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">База данных</option>
            <option value="devops">DevOps</option>
            <option value="other">Другое</option>
          </select>
        </div>
      </Row>
      <Row>
        <label htmlFor="technology-status">Статус</label>
        <div className="input-container required">
          <select
            value={formData.category}
            onChange={(e) => {
              updateFormData({ category: e.target.value });
            }}
            name="status"
            id="technology-status"
            required
            aria-required="true"
          >
            {(
              [
                "cancelled",
                "completed",
                "in-progress",
                "not-started",
              ] satisfies Status[]
            ).map((status) => (
              <option value={status} key={status}>
                {translate(status)}
              </option>
            ))}
          </select>
        </div>
      </Row>
      <Row>
        <label htmlFor="technology-description">Описание</label>
        <div className="input-container">
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={errors.description ? "error" : ""}
            placeholder="Опишите, что это за технология и зачем её изучать..."
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {errors.description && (
            <span id="description-error" className="error-message" role="alert">
              {errors.description}
            </span>
          )}
        </div>
      </Row>
      <Row>
        <label htmlFor="technology-notes">Заметки</label>
        <div className="input-container">
          <textarea
            value={formData.notes}
            onChange={handleChange}
            className={errors.description ? "error" : ""}
            aria-required="false"
            id="technology-notes"
            name="notes"
            placeholder="Ваши заметки"
            rows={4}
            cols={40}
            maxLength={1000}
            aria-describedby={errors.notes ? "description-error" : undefined}
          />
          {errors.notes && (
            <span id="notes-error" className="error-message" role="alert">
              {errors.notes}
            </span>
          )}
        </div>
      </Row>
      <Row>
        <label htmlFor="technology-deadline">Дедлайн</label>
        <div className="input-container required">
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline?.toString()}
            onChange={handleChange}
            className={errors.deadline ? "error" : ""}
            aria-describedby={errors.deadline ? "deadline-error" : undefined}
          />
          {errors.deadline && (
            <span id="deadline-error" className="error-message" role="alert">
              {errors.deadline}
            </span>
          )}
        </div>
      </Row>
      <Row>
        <label>Ресурсы для изучения</label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-field">
            <input
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="https://example.com"
              /* @ts-ignore */
              className={errors[`resource_${index}`] ? "error" : ""}
              aria-describedby={
                /* @ts-ignore */
                errors[`resource_${index}`]
                  ? `resource-${index}-
error`
                  : undefined
              }
            />
            {formData.resources.length > 1 && (
              <button
                type="button"
                onClick={() => removeResourceField(index)}
                className="btn-remove"
                aria-label={`Удалить ресурс ${index + 1}`}
              >
                Удалить
              </button>
            )}
            {/* @ts-ignore */}
            {errors[`resource_${index}`] && (
              <span
                id={`resource-${index}-error`}
                className="error-message"
                role="alert"
              >
                {/* @ts-ignore */}
                {errors[`resource_${index}`]}
              </span>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addResourceField}
          className="btn-add-resource"
        >
          Добавить ресурс
        </button>
      </Row>
      <div className="action-buttons">
        <button onClick={onCancel} className="btn-secondary">
          Отменить
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn-primary"
          disabled={!isFormValid}
        >
          Создать
        </button>
      </div>
    </form>
  );
}
