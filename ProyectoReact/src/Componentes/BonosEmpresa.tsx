

import "../css/BonosEmpresa.css";

export default function ListaBonos({ bonos, onAgregar, onCambiar }: {
  bonos: (number | string)[];
  onAgregar: () => void;
  onCambiar: (idx: number, value: number | string) => void;
}) {
  return (
    <div className="contenedorBonos">
      <div className="tituloBonos">Bonos:</div>
      {bonos.map((bono, idx) => (
        <div key={idx} className="filaBono">
          <span className="etiquetaBono">Bono {idx + 1}:</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="entradaBono"
            value={bono === 0 ? "" : bono}
            onChange={e => onCambiar(idx, e.target.value.replace(/[^0-9]/g, ""))}
          />
          <span className="monedaBono">$</span>
        </div>
      ))}
      <button type="button" className="botonAgregarBono" onClick={onAgregar}>
        Agregar Bono
      </button>
    </div>
  );
}
