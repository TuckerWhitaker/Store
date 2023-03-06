import "./ImageCarousel.css";

function imageCarousel(props) {
	let ImageList = props.images;

	let i = 0;
	/*
	let AutoScroll = setInterval(function () {
		if (i > ImageList.length) {
			i = 0;
		}
		document.getElementById("ICMainImage").src =
			"http://localhost:3001/api/getImage?id=" + ImageList[i];

		i++;
	}, 5000);*/

	return (
		<div className="ImageCarousel">
			<img
				className="ICMainImage"
				id="ICMainImage"
				src={"http://localhost:3001/api/getImage?id=" + props.images[0]}
			></img>
			<div className="ICPreviewParent">
				{ImageList.map((info, index) => {
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
