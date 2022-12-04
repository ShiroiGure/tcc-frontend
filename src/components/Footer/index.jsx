import "./style.css";
// import { Link } from 'react-router-dom';
import logo_image from './images/logo_rodape.webp';


export default function Footer() {

  return (
    <footer>
      <div className="footer">
        
        <div className="Navigation">
          <span className="itens">Navegação</span>
          <span className="itens">Home</span>
          <span className="itens">Catálogo</span>
        </div>

        <div className="About">
          <span className="item">Sobre Nós</span>
          <span className="item">Quem Somos?</span>
         </div>
      
         <div className="image">
          <img src={logo_image} alt="main_image" width="300" height="200" />
        </div>
        <p1 className="copy">2022 Copyright - Todos os Direitos Reservados</p1>
      </div>
    </footer>
  );
}