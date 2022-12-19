import "./AdminPage.css";
import React, { useState } from "react";

import CreateItem from "./components/CreateItem";
import axios, { Axios } from "axios";

function AdminPage() {
	return (
		<div className="AdminPage">
			<button
				className="AdminBtn"
				onClick={() => {
					window.location.href = "http://localhost:3000/Admin/CreateItem";
				}}
			>
				Manage Items
			</button>

			<button className="AdminBtn">Orders</button>
		</div>
	);
}

export default AdminPage;
