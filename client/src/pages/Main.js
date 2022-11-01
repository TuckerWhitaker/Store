import "./Main.css";
import Item from "./components/Item";
import ItemPage from "./components/ItemPage";
function Main() {
  return (
    <div className="Parent">
      <div className="Main">
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
        <Item></Item>
      </div>
      <ItemPage />
    </div>
  );
}

export default Main;
