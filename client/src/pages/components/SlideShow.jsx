import "./SlideShow.css"


function SlideShow(){
    var index = 0;
    var images = ["https://i5.walmartimages.com/asr/6e52ccf6-5917-474b-93ca-602af2f2f13e.ae5aee31cedf95cc6b87f0c9ab322e7f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF","https://i5.walmartimages.com/asr/96f0c5f5-3760-463f-99b8-7be86d175eca_1.27a6336c54e0b65aeb1948864553b6f1.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/64c6f289-98f4-4657-937f-bf1587a8c2f2_1.2faef9cfc80ae730a15414bb38f5e338.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF","https://i5.walmartimages.com/asr/a8548c59-0b8e-4f17-9bbb-f48ed23d4b8f_1.cdc57d4016899f0fd8937a51a66a8dc5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF", "https://i5.walmartimages.com/asr/22d28de5-9924-467c-b956-b209ed507158_1.f3384949d74118096f2418cdcd94a09f.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF"];

    const nextSlide = () => {
        const Slide = document.getElementById("SlideShowImage")
        index++;
        if(index > images.length-1){
            index = 0;
        }
        Slide.src=images[index]
        console.log(index)
        
    }
    const prevSlide = () => {
        const Slide = document.getElementById("SlideShowImage")
        index--;
        if(index < 0){
            index = images.length-1;
        }
        Slide.src=images[index]
        console.log(index)
    }

    return(<div className="SlideShowParent"><img
    className="SlideShowImage"
    id="SlideShowImage"
    src={images[0]}
    alt="Italian Trulli"
  ></img>
  <div className="ButtonParent">
    <button className="SlideBtn" onClick={()=>{prevSlide()}}>←</button>
  <button className="SlideBtn" onClick={()=>{nextSlide()}}>→</button>
  </div>
  
  
  </div>)
}

export default SlideShow;