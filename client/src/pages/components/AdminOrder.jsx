import axios from "axios";
import React, { useState, useEffect } from "react";

function AdminOrder() {
	const [OrderList, SetOrderList] = useState([]);

	useEffect(() => {
		axios.post("http://localhost:3001/api/GetOrders").then((response) => {
			SetOrderList(response.data);
			console.log(response.data);
		});
	}, []);
	return (
		<div>
			{OrderList.map((info, index) => {
				return <div key={index}>{info.id}</div>;
			})}
		</div>
	);
}

export default AdminOrder;
