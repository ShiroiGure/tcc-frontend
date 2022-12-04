import { FiUser } from 'react-icons/fi';
import { BsHandbag } from 'react-icons/bs';
import { AiOutlineHeart } from 'react-icons/ai';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext'
import Favorites from '../Favorites';
import { FavoriteContext } from '../../contexts/FavoritesContext';
import { BsArrowBarRight } from "react-icons/bs";
import { BagContext } from '../../contexts/BagContext';
import Bag from '../Bag';

export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { isShowing, setIsShowing } = useContext(FavoriteContext);
  const { isShowingBag, setIsShowingBag } = useContext(BagContext);

  const navigate = useNavigate();
  return (
    <>
      <Favorites />
      <Bag />
      <header>
        <div className="logo">
          <h1
            style={{
              cursor: "pointer"
            }}
            onClick={() => { navigate("/") }}
          >JÓIAS BRAGA</h1>
        </div>

        <div className="nav">
       
        </div>

        <div className="icons">
          <Link to={isAuthenticated ? '/inventory' : '/login'}>
            <FiUser fontSize={19} />
          </Link>
          
          {
            isAuthenticated && (
              <button
                style={{
                  cursor: "pointer",
                  background: "none",
                  border: "none"
                }}
                onClick={() => { setIsShowingBag(!isShowingBag) }}
              >
                <BsHandbag fontSize={19} />
              </button>
            )}

          <button
            style={{
              cursor: "pointer",
              background: "none",
              border: "none",
              marginLeft: "10px"
            }}
            onClick={() => { setIsShowing(!isShowing) }}
          >
            <AiOutlineHeart fontSize={19} />
          </button>
          {
            isAuthenticated && (
            <button
              style={{
                cursor: "pointer",
                background: "none",
                border: "none",
                marginLeft: "10px"
              }}
              onClick={() => { logout() }}
            >
              <BsArrowBarRight fontSize={19} />
            </button>
          )}

        </div>
      </header>

    </>
  )
}