import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api/api";
import "./style.css";

export default function Edit() {

  const { id } = useParams();

  const [quantidade, setQuantidade] = useState();
  const [price, setPrice] = useState();

  const navigate = useNavigate();

  const { status } = useQuery('edit', async () => {
    let response = (await api.get(`/product/${id}`)).data

    setQuantidade(response.quantidade);
    setPrice(response.price);
    
    return response;
  });

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'error') return <p>Error while loading product</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.put(`/product/update`, {
      id,
      quantidade,
      price
    })

    navigate("/inventory");
  }

  return (
    <div className="edit-page">
      <h2>Editar</h2>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <span>Quantidade</span>
        <input
          name="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <span>Preço</span>
        <input
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button>Salvar</button>
      </form>
    </div>
  )
}