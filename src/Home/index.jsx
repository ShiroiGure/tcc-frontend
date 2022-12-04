import Categories from "../hooks/Categories";
import Products from "../hooks/Products/Products";
import "./style.css";

export default function Home() {

  return (
    <>
      <div className="home-page">
        <Categories />
        <Products />
      </div>
    </>
  )
}