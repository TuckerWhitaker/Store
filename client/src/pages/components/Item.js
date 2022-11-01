function Item() {
  return (
    <div
      className="Item"
      onClick={() => {
        document.getElementById("ItemPage").style.display = "flex";
      }}
    >
      <div>Kosher Dill Pickles</div>
      <img
        className="Image"
        src="https://cdn.gardengrocer.com/attachments/photos/big/905.jpg?8318"
        alt="Italian Trulli"
      ></img>
    </div>
  );
}

export default Item;
