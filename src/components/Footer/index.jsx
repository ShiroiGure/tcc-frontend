import "./style.css";
// import { Link } from 'react-router-dom';
import logo_image from './images/logo_rodape.webp';

export default function Footer() {

  return (
    <footer>

        
            <div  className="box-logo-rodape" id="logo2">
                <img src={logo_image} className="logoFeet" alt="" srcset=""/>
            </div>



    <div className="bolado">

       
           
       
            <ul className="ul-nav">
                <h3> Navegação </h3>
                <li > <a href="/front-end/Tela Catalogo/index.html"> Catálogo </a></li>
            </ul>
       
      
            <ul className="sobre-nos">
                <h3> Sobre nós </h3>
                <li>Quem somos?</li>
                <div className="sobra">
                    <p>Somos muito bobos</p>
                    <button onclick="outnos()"><img src="src/X-saida.png" alt="" srcset="" className="lixin"/></button>
                </div>
                
            </ul>
 

            <ul className="sobre-noz">
                <h3> Suporte </h3>
                <li>Contato</li>
                <li>Detalhes sobre o site</li>
                
            </ul>
 
       
    </div>

    
    
    <div className="copri">
        <p className="direitos" >© 2022 Copyright - todos os direitos reservados.</p>
    </div>

</footer>
  );
}