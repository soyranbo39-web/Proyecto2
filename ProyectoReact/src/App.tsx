import './App.css'
import Titulo from './Componentes/Titulo'
import EmpresasList from './Componentes/Empresas'

export default function App() {
  return (
    <div className="app-root">
      <Titulo />
      <main>
        <EmpresasList />
      </main>
    </div>
  )
}
