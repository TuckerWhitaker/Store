import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminPage.css";

function AdminPage() {
	const [ItemList, SetItemList] = useState([]);

	const GetItemList = () => {
		axios.post("http://localhost:3001/api/GetItems").then((response) => {
			SetItemList(response.data);
		});
	};

	useEffect(() => {
		GetItemList();
		console.log(ItemList);
	}, []);

	return (
		<div className="AdminPage">
			<table>
				<tbody>
					<tr>
						<td>ID</td>
						<td>Name</td>
						<td>Price</td>
						<td>Options</td>

						<td>Images</td>
						<td>LimitedTimeDate</td>
						<td>Status</td>
					</tr>
					{ItemList.map((item, index) => {
						return (
							<tr key={index}>
								<td> {item.id}</td>
								<td>{item.name}</td>
								<td>{item.price}</td>
								<td>
									{item.options.map((info, index) => {
										return <div key={"OptN" + index}>{info[0]}</div>;
									})}
								</td>

								<td>
									{item.imageNames.map((info, index) => {
										return <div key={"Img" + index}>{info}</div>;
									})}
								</td>
								<td>{item.endDate}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default AdminPage;
