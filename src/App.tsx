import Router from "~/router"
import { Header } from "./components/atoms/Header"
import SnackbarProvider from 'react-simple-snackbar'

function App() {
  return (
    <SnackbarProvider>
      <Header data-testid="header-caju">
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </SnackbarProvider>
  )
}

export default App
