import { Route, Routes } from 'react-router-dom'
import { ListaFuncionarios } from './pages/ListaFuncionarios'
import { NewFuncionarioForm } from './pages/NewFuncionarioForm'
import { Layout } from './pages/Layout'

function App() {

  return (
    <div style={{ backgroundColor:"", padding: "2em"}}>
      <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ListaFuncionarios />} />
            <Route path="/novo" element={<NewFuncionarioForm />} />
          </Route>
      </Routes>
    </div>

  )
}

export default App
