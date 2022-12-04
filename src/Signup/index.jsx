import { FiUser } from 'react-icons/fi';
import { TfiEmail } from 'react-icons/tfi';
import { AiOutlineLock } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { CgDanger } from 'react-icons/cg';
import main_image from '../assets/images/main_image.webp';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import phoneRegExp from '../utils/phoneRegex';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function Signup() {

  const navigate = useNavigate();
  const { isAuthenticated, signup } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(3, "Name must be at least 3 characters"),
    tel: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    email: Yup.string()
      .required('E-mail is required')
      .email('E-mail is invalid'),
    confirmEmail: Yup.string()
      .required("Confirm e-mail is required")
      .email('Confirm e-mail is invalid'),
    password: Yup.string()
      .min(3, 'Confirm Password must be at least 3 characters')
      .required("Confirm password is required")
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (data) => {
    const { email, confirmEmail, password, confirmPassword } = data;

    if (email !== confirmEmail || password !== confirmPassword) {
      alert("Por favor verifique se os campos coincidem");
      return;
    };

    let isLogged = await signup(data);
    if(!isLogged) alert("Usuário já existe"); reset();
    if(isLogged) navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="signup-page">
      <div className="form">
        <h1>Entrar</h1>

        {Object.entries(errors).length > 0 && <span><CgDanger />Dados inválidos</span>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="email-input">
            <FiUser fontSize={19} />
            <input
              type="text"
              placeholder='Nome completo'
              name="name"
              {...register('name')}
            />
          </div>
          <div className="email-input">
            <BsTelephone fontSize={19} />
            <input
              type="phone"
              placeholder='Telefone'
              name="tel"
              {...register('tel')}
            />
          </div>
          <div className="email-input">
            <TfiEmail fontSize={19} />
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              {...register('email')}
            />
          </div>
          <div className="email-input">
            <TfiEmail fontSize={19} />
            <input
              type="email"
              placeholder="Confirmar E-mail"
              name="confirm-email"
              {...register('confirmEmail')}
            />
          </div>
          <div className="password-input">
            <AiOutlineLock fontSize={21} />
            <input
              type="password"
              placeholder="Senha"
              name="password"
              {...register('password')}
            />
          </div>
          <div className="password-input">
            <AiOutlineLock fontSize={21} />
            <input
              type="password"
              placeholder="Confirmar senha"
              name="confirm-password"
              {...register('confirmPassword')}
            />
          </div>

          <Link to="/login" className="forget-password">
            Já tem uma conta ? Clique aqui
          </Link>

          <button className='btn'>Cadastrar</button>
        </form>
      </div>

      <div className="image">
        <img src={main_image} alt="main_image" width="300" height="200" />
      </div>
    </div>
  )
}