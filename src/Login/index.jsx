import { TfiEmail } from 'react-icons/tfi';
import {AiOutlineLock} from 'react-icons/ai';
import {CgDanger} from 'react-icons/cg';
import main_image from '../assets/images/main_image.webp';
import './style.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const {login, isAuthenticated} = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('E-mail is required')
      .email('Email is invalid'),
    password: Yup.string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const {errors} = formState;
  const onSubmit = async (data) => {
  
    let isLogged = await login(data);
    if(!isLogged) reset();
    if(isLogged) navigate('/');
  };

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="login-page">
      <div className="form">
        <h1>Entrar</h1>

        {Object.entries(errors).length > 0 && <span><CgDanger/>Dados inválidos</span>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="email-input">
            <TfiEmail fontSize={19} />
            <input 
              type="email" 
              placeholder="E-mail" 
              name="email" 
              {...register('email')}
            />
          </div>
          <div className="password-input">
            <AiOutlineLock fontSize={21}/>
            <input 
              type="password" 
              placeholder="Senha"
              name="password" 
              {...register('password')}
            />
          </div>

          {/* <Link to="/forget" className="forget-password">
            Esqueceu a senha ? Clique aqui
          </Link> */}

          <button>Entrar</button>
          <Link to="/signup" className="register-btn">Cadastrar</Link>
        </form>
      </div>

      <div className="image">
        <img src={main_image} alt="main_image" width="300" height="200" />
      </div>
    </div>
  )
}