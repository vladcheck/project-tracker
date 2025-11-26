import { useEffect, useState } from "react";
import { Status, Tech } from "../../types";
import translate from "../../utils/i18n";
import Row from "../Row/Row";
import Form from "../Form/Form";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import TextInputBlock from "../TextInputBlock/TextInputBlock";
import "./style.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

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

  if (!formData.name.trim()) {
    newErrors.name = "Название технологии обязательно";
  }

  if (!formData.name.trim()) {
    newErrors.name = "Название технологии обязательно";
  } else if (formData.name.trim().length < 2) {
    newErrors.name = "Название должно содержать минимум 2 символа";
  } else if (formData.name.trim().length > 50) {
    newErrors.name = "Название не должно превышать 50 символов";
  }

  if (!formData.description.trim()) {
    newErrors.description = "Описание технологии обязательно";
  } else if (formData.description.trim().length < 10) {
    newErrors.description = "Описание должно содержать минимум 10 символов";
  }

  if (!formData.startDate) {
    newErrors.startDate = "Дата начала изучения обязательна";
  } else {
    if (formData.deadline) {
      const [startDate, endDate] = [
        new Date(formData.startDate),
        new Date(formData.deadline),
      ];

      if (startDate > endDate) {
        newErrors.startDate = "Дата начала не может быть позже дедлайна";
      }
    }
  }

  if (!formData.deadline) {
    newErrors.deadline = "Дедлайн обязателен";
  } else {
    const deadlineDate = new Date(formData.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadlineDate < today) {
      newErrors.deadline = "Дедлайн не может быть в прошлом";
    }
    if (formData.startDate && deadlineDate < new Date(formData.startDate)) {
      newErrors.deadline = "Дедлайн не может быть раньше даты начала";
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
    name: initialData?.name || "", // название технологии
    description: initialData?.description || "", // описание
    status: initialData?.status || "not-started", // статус изучения
    category: initialData?.category || "", // категория
    difficulty: initialData?.difficulty || "none", // сложность
    startDate: initialData?.startDate || new Date(),
    deadline: initialData?.deadline || new Date(), // дедлайн (необязательно)
    resources: initialData?.resources || [""], // массив URL ресурсов
    notes: initialData?.notes || "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState(false);

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
    <Form
      title="Добавить технологию"
      id="add-technology-form"
      isSubmitting={isSubmitting}
      submitSuccess={submitSuccess}
    >
      <TextInputBlock
        label="Название"
        id="technology-name"
        name="name"
        type="text"
        value={formData.name?.toString()}
        error={errors.name}
        errorId="name-error"
        handleChange={handleChange}
      />
      <Row>
        <InputLabel htmlFor="category">Категория</InputLabel>
        <Box className="input-container">
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <MenuItem value="frontend">Frontend</MenuItem>
            <MenuItem value="backend">Backend</MenuItem>
            <MenuItem value="database">База данных</MenuItem>
            <MenuItem value="devops">DevOps</MenuItem>
            <MenuItem value="other">Другое</MenuItem>
          </Select>
        </Box>
      </Row>
      <Row>
        <InputLabel htmlFor="technology-status">Статус</InputLabel>
        <Box className="input-container">
          <Select
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
              <MenuItem value={status} key={status}>
                {translate(status)}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Row>
      <TextInputBlock
        label="Описание"
        id="technology-description"
        name="description"
        type="textarea"
        value={formData.description?.toString()}
        error={errors.description}
        errorId="description-error"
        handleChange={handleChange}
      />
      <TextInputBlock
        required={false}
        label="Заметки"
        id="technology-notes"
        name="notes"
        type="textarea"
        cols={40}
        value={formData.notes?.toString()}
        error={errors.notes}
        errorId="notes-error"
        handleChange={handleChange}
      />
      <TextInputBlock
        label="Начало изучения"
        id="technology-start-date"
        name="startDate"
        type="date"
        value={formData.startDate?.toString()}
        error={errors.startDate}
        errorId="start-date-error"
        handleChange={handleChange}
      />
      <TextInputBlock
        label="Дедлайн"
        id="technology-deadline"
        name="deadline"
        type="date"
        value={formData.deadline?.toString()}
        error={errors.deadline}
        errorId="deadline-error"
        handleChange={handleChange}
      />
      <Row>
        <InputLabel>Ресурсы для изучения</InputLabel>
        <Box className="resources">
          {formData.resources.map((resource, index) => (
            <Card key={index} className="resource-field">
              <CardContent>
                <TextInputBlock
                  type="url"
                  name={`resource_${index}`}
                  value={resource}
                  label=""
                  placeholder="https://example.com"
                  id={`resource_${index}`}
                  errorId={`resource_${index}`}
                  handleChange={(e) =>
                    handleResourceChange(index, e.target.value)
                  }
                />
              </CardContent>
              <CardActions>
                {formData.resources.length > 1 && (
                  <Button
                    variant="outlined"
                    onClick={() => removeResourceField(index)}
                    className="btn-remove"
                    aria-label={`Удалить ресурс ${index + 1}`}
                  >
                    Удалить
                  </Button>
                )}
                {/* @ts-ignore */}
                {errors[`resource_${index}`] && (
                  <ErrorMessage id={`resource-${index}-error`}>
                    {/* @ts-ignore */}
                    {errors[`resource_${index}`]}
                  </ErrorMessage>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
        <Button
          onClick={addResourceField}
          variant="outlined"
          className="btn-add-resource"
        >
          Добавить ресурс
        </Button>
      </Row>
      <Box className="action-buttons">
        <Button onClick={onCancel} variant="outlined" className="btn-secondary">
          Отменить
        </Button>
        <Button
          variant="outlined"
          type="submit"
          onClick={handleSubmit}
          className="btn-primary"
          disabled={!isFormValid}
        >
          Подтвердить
        </Button>
      </Box>
    </Form>
  );
}
