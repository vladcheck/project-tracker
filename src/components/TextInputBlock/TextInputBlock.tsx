import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Row from "../Row/Row";

export default function TextInputBlock({
  id,
  name,
  type,
  label,
  value,
  error,
  errorId,
  rows,
  cols,
  required = true,
  placeholder = "",
  handleChange,
}: {
  id: string;
  name: string;
  type: "text" | "textarea" | "select" | "date" | "url";
  value: any;
  label: string;
  error?: string;
  errorId: string;
  rows?: number;
  cols?: number;
  required?: boolean;
  placeholder?: string;
  handleChange: (e: any) => void;
}) {
  return (
    <Row>
      <label htmlFor={id}>{label}</label>
      <div className={`input-container ${required ? "required" : ""}`.trim()}>
        {type === "textarea" ? (
          <textarea
            required={required}
            aria-required={required}
            id={id}
            name={name}
            value={value.toString()}
            onChange={handleChange}
            className={error ? "error" : ""}
            rows={rows ?? 3}
            cols={cols ?? 40}
            placeholder={placeholder}
            aria-describedby={error ? errorId : undefined}
          />
        ) : (
          <input
            required={required}
            aria-required={required}
            id={id}
            name={name}
            type={type}
            value={value.toString()}
            onChange={handleChange}
            placeholder={placeholder}
            className={error ? "error" : ""}
            aria-describedby={error ? errorId : undefined}
          />
        )}

        {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      </div>
    </Row>
  );
}
