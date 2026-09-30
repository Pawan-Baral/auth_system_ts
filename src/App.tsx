import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";
import { AuthProvider } from "@/providers/AuthContext";
import { ToastContainer } from "react-toastify";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
          newestOnTop={true}
          draggable={true}
          pauseOnHover={true}
          closeOnClick={true}
        />

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;