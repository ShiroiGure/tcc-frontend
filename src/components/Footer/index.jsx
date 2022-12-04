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
                <li > <a href="/#"> Catálogo </a></li>
            </ul>
       
      
            <ul className="sobre-nos">
                <h3> Sobre nós </h3>
                <li>Quem somos?</li>
                
            </ul>
 

            <ul className="sobre-noz">
                <h3> Suporte </h3>
                <li><a href="https://api.whatsapp.com/send/?phone=5511954291484&text=Ol%C3%A1%2C+meu+pedido+%C3%A9+Numero+10&type=phone_number&app_absent=0">
                    Contato</a></li>
                <li><a href="https://www.instagram.com/hyipnus_tcc/">Detalhes sobre o site</a></li>
                
            </ul>
 
       
    </div>

    
    
    <div className="copri">
        <p className="direitos" >© 2022 Copyright - todos os direitos reservados.</p>
    </div>

</footer>
  );
}