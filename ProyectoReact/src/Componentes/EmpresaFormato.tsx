
"use client";
import { useState } from "react";
import ListaBonos from "./BonosEmpresa";
import MensajeError from "./MensajeErro";
import "../css/EmpresaFormato.css";

type EmpresaProps = {
  nombre: string;
  onEliminar?: () => void;
};

export default function TarjetaEmpresa({ nombre, onEliminar }: EmpresaProps) {
  const [mensual, setMensual] = useState("");
  const [anual, setAnual] = useState("");
  const [diasAguinaldo, setDiasAguinaldo] = useState("");
  const [diasVacaciones, setDiasVacaciones] = useState("");
  const [prima, setPrima] = useState("");
  const [bonos, setBonos] = useState<string[]>([]);
  const [error, setError] = useState("");

  function onCambiarMensual(val: string) {
    const limpio = val.replace(/[^0-9.]/g, "");
    setMensual(limpio);
    if (limpio === "") {
      setAnual("");
      setError("");
      return;
    }
    const num = Number(limpio);
    if (num < 0) setError("El pago bruto mensual no puede ser negativo.");
    else setError("");
    setAnual(String(num * 12));
  }

  function onCambiarAnual(val: string) {
    const limpio = val.replace(/[^0-9.]/g, "");
    setAnual(limpio);
    if (limpio === "") {
      setMensual("");
      setError("");
      return;
    }
    const num = Number(limpio);
    if (num < 0) setError("El pago bruto anual no puede ser negativo.");
    else setError("");
    setMensual(String(Math.round((num / 12) * 100) / 100));
  }

  const numMensual = Number(mensual) || 0;
  const numAnual = Number(anual) || 0;
  const numAguinaldo = Number(diasAguinaldo) || 0;
  const numVacaciones = Number(diasVacaciones) || 0;
  const numPrima = Number(prima) || 0;

  const pagoAguinaldo = mensual === "" || diasAguinaldo === "" ? 0 : (numMensual / 30) * numAguinaldo;
  const pagoPrimaVacacional =
    mensual === "" || diasVacaciones === "" || prima === "" ? 0 : (numMensual / 30) * numVacaciones * (numPrima / 100);

  const sumaBonos = bonos.reduce((acc, b) => acc + (Number(b) || 0), 0);
  const totalAnual = numAnual + pagoAguinaldo + pagoPrimaVacacional + sumaBonos;
  const totalMensual = totalAnual / 12;

  return (
    <div className="tarjetaEmpresa">
      <div className="cabeceraEmpresa">
        <h2 className="nombreEmpresa">{nombre}</h2>
        {onEliminar && <button className="botonEliminar" onClick={onEliminar}>Eliminar</button>}
      </div>

      <div className="campo">
        <label>Pago Bruto Mensual:</label>
        <input
          type="text"
          className="entradaPagoMensual"
          value={mensual}
          onChange={e => onCambiarMensual(e.target.value)}
          placeholder="0"
        />$
  {error && <MensajeError message={error} />}
      </div>

      <div className="campo mb-2">
        <label>Pago Bruto Anual:</label>
        <input
          type="text"
          className="entradaPagoAnual"
          value={anual}
          onChange={e => onCambiarAnual(e.target.value)}
          placeholder="0"
        />$
      </div>

      <div className="campo mb-2">
        <label>Días de aguinaldo:</label>
        <input
          type="text"
          className="entradaDiasAguinaldo"
          value={diasAguinaldo}
          onChange={e => setDiasAguinaldo(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0"
        />
        <div>Pago Aguinaldo: {pagoAguinaldo.toFixed(2)}$</div>
      </div>

      <div className="campo mb-2">
        <label>Días de vacaciones:</label>
        <input
          type="text"
          className="entradaDiasVacaciones"
          value={diasVacaciones}
          onChange={e => setDiasVacaciones(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0"
        />
      </div>

      <div className="campo mb-2">
        <label>% Prima vacacional:</label>
        <input
          type="text"
          className="entradaPrima"
          value={prima}
          onChange={e => setPrima(e.target.value.replace(/[^0-9.]/g, ""))}
          placeholder="0"
        />%
        <div>Pago Prima vacacional: {pagoPrimaVacacional.toFixed(2)}$</div>
      </div>

      <ListaBonos
        bonos={bonos}
        onAgregar={() => setBonos([...bonos, ""]) }
        onCambiar={(idx: number, value: string | number) => {
          const nuevos = bonos.slice();
          nuevos[idx] = String(value);
          setBonos(nuevos);
        }}
      />

  <div className="totalAnual">Total Anual: {totalAnual.toFixed(2)}$</div>
  <div className="totalMensual">Equivalente Mensual: {totalMensual.toFixed(2)}$</div>
    </div>
  );
}
