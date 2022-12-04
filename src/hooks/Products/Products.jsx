import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/api";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineModeEditOutline, MdOutlineDelete } from "react-icons/md";
import {BsHandbag} from "react-icons/bs";
import { GrAddCircle } from "react-icons/gr"
import "./style.css";
import { useContext } from "react";
import { FilterContext } from "../../contexts/FilterContext";
import { FavoriteContext } from "../../contexts/FavoritesContext";
import { BagContext } from "../../contexts/BagContext";

function Products({ isInventory }) {

  const { filter } = useContext(FilterContext);
  const {
    favorites,
    setFavorites,
    setIsShowing
  } = useContext(FavoriteContext);

  const {
    bag,
    setBag,
    setIsShowingBag
  } = useContext(BagContext);

  let { data, status } = useQuery('products', async () => {
    return (await api('/products')).data;
  });

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'error') return <p>Error while loading products</p>;

  if (filter !== null) data = data.filter(x => x.categories.id === filter);

  const handleDelete = async (id) => {

    let confirm = window.confirm("Tem certeza em excluir ?");

    if (confirm) {
      await api.delete(`/product/delete/${id}`);
      alert("Produto excluído com sucesso, o sistema atualizará automaticamente");
    }
  };

  const addToFavorites = (product) => {
    setIsShowing(true);

    let alreadFavorited = favorites.find(x => x.id === product.id);
    if (alreadFavorited) return;

    let newFavorites = [...favorites, product];
    setFavorites(newFavorites);

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addToBag = (product) => {
    setIsShowingBag(true);
    
    let alreadInBag = bag.find(x => x.id === product.id);

    if(alreadInBag) return;

    let newBag = [...bag, product];
    setBag(newBag);

    localStorage.setItem('bag', JSON.stringify(newBag));
  };

  return (
    <div className="products">
      {isInventory && (
        <Link to="/create">
          <GrAddCircle className="add-product" />
        </Link>
      )}
      {
        data.map((product, index) => (

          <div className="card-product" key={index}>
            {!isInventory && (
              <>
                <div className="icons">
                  <BsHandbag
                    className="bag-icon"
                    onClick={() => addToBag(product)}
                  />

                  <AiOutlineHeart
                    className="favorite-icon"
                    onClick={() => addToFavorites(product)}
                    id={index}
                  />
                </div>

              </>
            )}
            <img
              src={`http://localhost:5555/productImage/${product.image}`}
              alt="CardProductImage"
            />
            <h2>{product.name}</h2>
            <p className="priceText">R$ {product.price}</p>

            {isInventory && (
              <div className="card-actions" >
                <span>
                  <Link style={{ color: "#222" }} to={`/edit/${product.id}`}>
                    <MdOutlineModeEditOutline />
                  </Link>
                </span>
                <span>
                  QTDE: {product.quantidade}
                </span>
                <span>
                  <button
                    style={{
                      color: "#222",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer"
                    }}
                    onClick={() => handleDelete(product.id)}
                  >
                    <MdOutlineDelete fontSize={16} />
                  </button>
                </span>
              </div>
            )}
          </div>

        ))
      }
    </div>
  )
}

export default Products;