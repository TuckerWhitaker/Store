import "./AdminPage.css";
import React, { useState } from "react";

import CreateItem from "./components/CreateItem";
import axios, { Axios } from "axios";

function AdminPage() {
	return (
		<div className="AdminPage">
			<button className="AdminBtn">Create New Item</button>
			<button className="AdminBtn"> Update Item</button>
			<button className="AdminBtn">Orders</button>
		</div>
	);
}

export default AdminPage;
