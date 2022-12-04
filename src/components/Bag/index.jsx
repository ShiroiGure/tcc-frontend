import { useContext, useState } from "react";
import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { BsFillBagXFill } from "react-icons/bs";
import "./style.css";
import { BagContext } from "../../contexts/BagContext";
import { SlReload } from "react-icons/sl";

export default function Bag() {
  const {
    bag,
    setBag,
    isShowingBag,
    setIsShowingBag,
    showResult,
    setShowResult,
    resetBag
  } = useContext(BagContext);

  const [totalAmount, setTotalAmount] = useState(0);

  const removeFromFavorites = (id) => {
    let newBag = bag.filter(x => x.id !== id);

    if (!newBag.length) localStorage.removeItem('bag');

    setBag(newBag);
    localStorage.setItem('bag', JSON.stringify(newBag));
  };

  const generate = () => {
    let confirm = window.confirm("Confirmar emissão da nota")
    if(!confirm) return;
    setShowResult(true);
  }

  useEffect(() => {
    let isStoraged = localStorage.getItem('bag') !== null;

    if (isStoraged) {
      let newBag = JSON.parse(localStorage.getItem('bag') || "{}");

      setBag(newBag);
    };
  }, [setBag]);

  useEffect(() => {
    if (!showResult) return;

    let amount = 0;

    for (let product of bag) {
      amount += product.price;
    }

    setTotalAmount(amount);
    localStorage.removeItem('bag');
  }, [showResult, bag, resetBag]);

  return (
    <div className={`bags ${isShowingBag ? '' : 'hide'}`}>
      <RiCloseFill
        style={{
          cursor: "pointer",
          marginRight: "90%",
          fontSize: "26px"
        }}
        onClick={() => { setIsShowingBag(!isShowingBag) }}
      />
      {showResult ? (
        <>
          <ul style={{ marginBottom: 10 }}>
            {bag?.map((product) => (
              <li>
                 <img
                  src={`https://estoque-joiasbraga.herokuapp.com/productImage/${product.image}`}
                  alt="bag_itemImage"
                  className="imgNote"
                />
                {product.name}
                </li>
            ))}
          </ul>
          <h4 style={{ marginBottom: 0 }}>Valor total: R$ {totalAmount}</h4>
          <SlReload
            style={{ cursor: "pointer" }}
            onClick={() => { resetBag() }}
          />
          <br/>
          <br/>
          <p1 className="remember">Tire um print da Nota e nos</p1>
          <p1 className="remember">mande através do WhatsApp</p1>
        </>
      ) : (
        <>
          <div className="all-bag">
            {bag?.map((bag_item) => (
              <div className="bag-card" key={bag_item.id}>

                <BsFillBagXFill
                  className="unbag-icon"
                  onClick={() => { removeFromFavorites(bag_item.id) }}
                />

                <img
                  src={`https://estoque-joiasbraga.herokuapp.com/productImage/${bag_item.image}`}
                  alt="bag_itemImage"
                />
                <h2>{bag_item.name}</h2>
                <p>R$ {bag_item.price}</p>
              </div>
            ))}
            {bag.length > 0 && (
              <button
                className="generate-btn"
                onClick={() => { generate() }}
              >Gerar Nota</button>
            )}
          </div>
        </>
      )}

    </div>
  )
}