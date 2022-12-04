import { useContext } from "react";
import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import {FaHeartBroken} from "react-icons/fa";
import { FavoriteContext } from "../../contexts/FavoritesContext";
import "./style.css";

export default function Favorites() {
  const {
    isShowing,
    setIsShowing,
    favorites,
    setFavorites
  } = useContext(FavoriteContext);

  const removeFromFavorites = (id) => {
    let newFavorites = favorites.filter(x => x.id !== id);

    if(!newFavorites.length) localStorage.removeItem('favorites');

    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    let isStoraged = localStorage.getItem('favorites') !== null;

    if(isStoraged) {
      let newFavorites = JSON.parse(localStorage.getItem('favorites') || "{}");

      setFavorites(newFavorites);
    };

  }, [setFavorites]);

  return (
    <div className={`favorites ${isShowing ? '' : 'hide'}`}>
      <RiCloseFill
        style={{ 
          cursor: "pointer", 
          marginRight: "90%",
          fontSize: "26px"
        }}
        onClick={() => { setIsShowing(!isShowing) }}
      />
      <div className="all-favorites">
        {favorites?.map((favorite) => (
          <div className="favorite-card" key={favorite.id}>

            <FaHeartBroken
              className="unfavorite-icon"
              onClick={() => {removeFromFavorites(favorite.id)}}
            />

            <img
              src={`https://estoque-joiasbraga.herokuapp.com/productImage/${favorite.image}`}
              alt="CardfavoriteImage"
            />
            <h2>{favorite.name}</h2>
            <p>R$ {favorite.price}</p>
          </div>
        ))}
      </div>
    </div>
  )
}