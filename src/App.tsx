import "bootstrap/dist/css/bootstrap.min.css";
import GlobalStyle from "./ui/styles/global";
import Pages from "./pages";
import { AuthProvider } from "./data/contexts/auth/AuthProvider";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Pages />
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}

export default App
