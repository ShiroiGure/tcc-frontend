import AppRoutes from "./routes";
import { FaWhatsapp } from "react-icons/fa";

export default function App() {

  return (
    <>
      <AppRoutes />
      <a href="https://api.whatsapp.com/send/?phone=5511954291484&text=Ol%C3%A1%2C+meu+pedido+%C3%A9+Numero+10&type=phone_number&app_absent=0"
      target="_blank" rel="noreferrer"
        style={{
          borderRadius: "50%",
          width: 40,
          height: 40,
          backgroundColor: "#25d366",
          position: "fixed",
          left: "90%",
          bottom: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <FaWhatsapp style={{
          fontSize: 32,
          color: "#fff",
        }} />
      </a>
    </>
  )
}