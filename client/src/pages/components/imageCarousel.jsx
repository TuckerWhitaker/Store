import "./ImageCarousel.css";

function imageCarousel(props) {
	return (
		<div className="ImageCarousel">
			<img
				className="ICMainImage"
				id="ICMainImage"
				src={"http://localhost:3001/api/getImage?id=" + props.images[0]}
			></img>
			<div className="ICPreviewParent">
				{props.images.map((info, index) => {
					return (
						<img
							className="ICpreviewimage"
							key={index}
							src={"http://localhost:3001/api/getImage?id=" + info}
							onClick={() => {
								document.getElementById("ICMainImage").src =
									"http://localhost:3001/api/getImage?id=" + info;
							}}
						></img>
					);
				})}
			</div>
		</div>
	);
}

export default imageCarousel;
