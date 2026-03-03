import { Route, Routes } from 'react-router-dom'
import { ListaFuncionarios } from './components/ListaFuncionarios'
import { NewFuncionarioForm } from './components/NewFuncionarioForm'
import { Layout } from './components/Layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ListaFuncionarios />} />
        <Route path="/novo" element={<NewFuncionarioForm />} />
      </Route>
    </Routes>

  )
}

export default App
