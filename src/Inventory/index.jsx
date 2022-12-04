import Categories from "../hooks/Categories";
import Products from "../hooks/Products/Products";
import "./style.css";

export default function Inventory() {
  return (
    <div className="inventory-page">
      <Categories />
      <Products isInventory />
    </div>
  );
}