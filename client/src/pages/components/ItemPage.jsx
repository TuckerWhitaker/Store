import "./ItemPage.css"
import SlideShow from "./SlideShow";
function Item() {

    return ( <div className="ItemPageParent" id="ItemPageParent">
      <div className="ItemPage" id="ItemPage">
    <div className="ImageColumn">
      <SlideShow/>
    </div>

    <div className="InfoColumn">
      <div className="ItemPageName">Pickles</div>
      <div className="ItemPageDescription">
        These are delicious Vlasic Kosher Dill Pickle Spears
      </div>
      <div className="Option">

        <div className="OptionTitle">Size</div>

      <select className="OptionSelect">
        <option>32 oz</option>
        <option>16 oz</option>
      </select>
      </div>
      
      
    </div>
    <div className="AddCartParent"><button className="OptionAddCart">Add To Cart</button>
    </div>
    <div className="ExitButton" onClick={()=>{document.getElementById("ItemPageParent").style.display = "none"}}>X</div>
    
  </div>
  </div>);
}

export default Item;