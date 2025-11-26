import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Row from "../Row/Row";

export default function InputBlock({
  id,
  name,
  type,
  label,
  value,
  error,
  errorId,
  handleChange,
}: {
  id: string;
  name: string;
  type: string;
  value: any;
  label: string;
  error?: string;
  errorId: string;
  handleChange: () => void;
}) {
  return (
    <Row>
      <label htmlFor={id}>{label}</label>
      <div className="input-container">
        <input
          id={id}
          name={name}
          type={type}
          value={value.toString()}
          onChange={handleChange}
          className={error ? "error" : ""}
          aria-describedby={error ? errorId : undefined}
        />
        {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      </div>
    </Row>
  );
}
