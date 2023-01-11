import "./ContactPage.css";
import { FaInstagramSquare, FaFacebook } from "react-icons/fa";

function ContactPage() {
	return (
		<div className="ContactPage">
			<div className="ContactPageText">Contact me on </div>
			<div
				className="ContactPageCard"
				id="insta"
				onClick={() => {
					window.location.href = "https://www.instagram.com/cwdesignsia/";
				}}
			>
				Instagram <FaInstagramSquare className="ContactIcon" />
			</div>
			<div className="ContactPageText"> or</div>
			<div
				className="ContactPageCard"
				id="facebook"
				onClick={() => {
					window.location.href = "https://www.facebook.com/carleewdesigns";
				}}
			>
				Facebook <FaFacebook className="ContactIcon" />
			</div>
		</div>
	);
}

export default ContactPage;
