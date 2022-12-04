import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../api/api";
import { useForm } from 'react-hook-form';
import {CgDanger} from 'react-icons/cg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import "./style.css"

export default function Create() {

  const [categories, setCategories] = useState();
  const [categoryId, setCategoryId] = useState(null);
  const [file, setFile] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    quantidade: Yup.number()
      .required('Quantidade is required'),
    price: Yup.number()
      .required("Price is required")
  });

  const { status } = useQuery('getCategories', async () => {
    setCategories((await api.get("/categories")).data);
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors } = formState;

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'error') return <p>Error while loading categories</p>;

  const onSubmit = async (data) => {
    if(categoryId === null) 
      return errors.category = "Categoria inválida";

    if(file === null) 
      return errors.category = "Arquivo inválido";

    data.categoryId = Number(categoryId);

    const formData = new FormData();
    
    formData.append('body', JSON.stringify(data));
    formData.append('photo', file, file.name);

    await api.post(`/createProduct`, formData)

    alert("Produto criado com sucesso");

    reset();
  }

  return (
    <div className="create-page">
      <form onSubmit={handleSubmit(onSubmit)}>
        {Object.entries(errors).length > 0 && 
        <span className="error"><CgDanger />Dados inválidos</span>}
        <span>Nome do Produto</span>
        <input
          type="text"
          placeholder="Nome do Produto"
          name="name"
          {...register('name')}
        />
        <span>Quantidade do Produto</span>
        <input
          type="number"
          placeholder="Quantidade do Produto"
          name="quantidade"
          {...register('quantidade')}
        />
        <span>Preço do Produto</span>
        <input
          type="number"
          placeholder="Preço do Produto"
          name="price"
          {...register('price')}
        />
        <span>Selecionar categoria</span>
        <select
          name="selectOptions"
          defaultValue="none"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option
            style={{ color: '#222' }}
            value="none"
            disabled
          >
            Selecionar categoria do produto
          </option>
          {categories?.map((category) => (
            <option
              key={category.id}
              style={{ color: '#222' }}
              value={category.id}>{category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          name="photo"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button>Criar</button>
      </form>
    </div>
  )
}