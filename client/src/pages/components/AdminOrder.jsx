import axios from "axios";
import React, { useState, useEffect } from "react";
import "./AdminOrder.css";
function AdminOrder() {
	const [OrderList, SetOrderList] = useState([]);

	useEffect(() => {
		axios.post("http://localhost:3001/api/GetOrders").then((response) => {
			SetOrderList(response.data);
			console.log(response.data);
		});
	}, []);
	return (
		<div className="AdminOrder">
			<table>
				<tbody>
					<tr>
						<th>ID</th>
						<th>Item Name</th>
						<th>Item Price</th>
						<th>Options</th>
						<th>Custom Text</th>
						<th>etc</th>
					</tr>
					{OrderList.map((info, index) => {
						return (
							<tr className="QAdminOrderItem" key={index}>
								<td> {info.id}</td>
								<td> {info.name}</td>
								<td> {info.price}</td>
								<td>
									{info.SelectedOptions.map((info2, index2) => {
										return <div key={"SelectedOptions" + index2}>{info2}</div>;
									})}
								</td>
								<td>
									{" "}
									{info.customTextArray.map((info3, index3) => {
										return <div key={"customTextArray" + index3}>{info3}</div>;
									})}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

//customTextArray

export default AdminOrder;
