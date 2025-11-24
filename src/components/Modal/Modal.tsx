import Button from "../Button/Button";

export default function Modal() {
  return (
    <dialog className="modal-window">
      <div className="modal-header">
        <h2>Редактировать</h2>
      </div>

      <div className="modal-content">
        <Button className="close-button" title="*" />
      </div>
    </dialog>
  );
}
