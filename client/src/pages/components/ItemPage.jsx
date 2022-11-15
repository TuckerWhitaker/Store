import "./ItemPage.css"
import SlideShow from "./SlideShow";
function ItemPage(props) {



    return ( <div className="ItemPageParent" id="ItemPageParent">
      <div className="ItemPage" id="ItemPage">
    <div className="ImageColumn">
      <SlideShow/>
    </div>

    <div className="InfoColumn">
      <div className="ItemPageName" id="ItemPageName"></div>
      <div className="ItemPageDescription" id="ItemPageDescription">
      </div>
      <div className="OptionContainer">
      {props.OptionList.map((info, index)=>{

        return(<div className="Option" key={index}>

        <div key={index} className="OptionTitle">{info[0]}</div>

      <select className="OptionSelect">
        {props.OptionList[index].map((info, index2)=>{

          return(<option key={index2}>{info}</option>)
        })}

      </select>
      </div>)


      })}
      </div>
      
    </div>
    <div className="AddCartParent"><button className="OptionAddCart">Add To Cart</button>
    </div>
    <div className="ExitButton" onClick={()=>{document.getElementById("ItemPageParent").style.display = "none"}}>X</div>
    
  </div>
  </div>);
}

export default ItemPage;