
import { useState } from "react";
import "../css/AgregarEmpresa.css";

export default function AgregarEmpresa({ onAgregar }: { onAgregar: (nombre: string) => void }) {
  const [empresaNombre, setEmpresaNombre] = useState("");

  return (
    <form
      className="formularioEmpresa"
      onSubmit={e => {
        e.preventDefault();
        if (empresaNombre.trim()) {
          onAgregar(empresaNombre.trim());
          setEmpresaNombre("");
        }
      }}
    >
      <label className="etiquetaEmpresa">Empresa:</label>
      <input
        className="entradaEmpresa"
        value={empresaNombre}
        onChange={e => setEmpresaNombre(e.target.value)}
        placeholder="Nombre de la empresa"
      />
      <button
        type="submit"
        className="botonAgregar"
      >Agregar
      </button>
    </form>
  );
}