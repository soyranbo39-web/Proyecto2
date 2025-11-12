import "../css/MensajeErro.css";

export default function MensajeError({ message }: { message: string }) {
  return (
    <div className="mensajeError">{message}</div>
  );
}