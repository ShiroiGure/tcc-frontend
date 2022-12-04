import { useContext } from "react";
import { useQuery } from "react-query";
import { api } from "../../api/api";
import { FilterContext } from "../../contexts/FilterContext";
import "./style.css";

export default function Categories() {

  const { filter, setFilters } = useContext(FilterContext);

  const { data, status } = useQuery('categories', async () => {

    return (await api('/categories')).data;
  });

  if (status === 'loading') return <p>Loading...</p>;

  if (status === 'error') return <p>Error while loading products</p>;

  const handleClickFilter = (id) => {
    let isSelected = filter === id;
    let isDifferent = filter !== null && filter !== id;

    if (isSelected) {
      setFilters(null);
      document.getElementById(`filter${id}`).checked = false;
      return;
    };
    if (isDifferent) {
      document.getElementById(`filter${filter}`).checked = false;
      setFilters(id)
    }
    setFilters(id);
  }

  return (
    <>
      <div className="filters-component">
        <span className="text">Filtrar por: </span>
        <div className="filters">
          {data.map((category, index) => (
            <div key={index + 2}>
              <input
                type="radio"
                id={`filter${index + 2}`}
                onClick={() => { handleClickFilter(index + 2) }}
              />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}