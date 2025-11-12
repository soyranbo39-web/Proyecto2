
import AgregarEmpresa from "./AgregarEmpresa";
import TarjetaEmpresa from "./EmpresaFormato";
import "../css/Empresas.css";
import { useState } from "react";

export default function EmpresasList() {
  const [empresas, setEmpresas] = useState<string[]>([]);

  function agregarEmpresa(nombre: string) {
    setEmpresas([...empresas, nombre]);
  }
  function eliminarEmpresa(idx: number) {
    setEmpresas(empresas.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div className="mb-6">
        <AgregarEmpresa onAgregar={agregarEmpresa} />
      </div>
      <div className="listaEmpresas">
        {empresas.map((nombre, idx) => (
          <TarjetaEmpresa key={idx} nombre={nombre} onEliminar={() => eliminarEmpresa(idx)} />
        ))}
      </div>
    </div>
  );
}