import React, { useEffect, useState } from "react";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { url, useEffectAsync } from "../../helper";
import yesNO from "../blocks/swal/yesNo";

const OrderPage = () => {
	const [orders, setOrders] = useState([]);
	const [forceRenderCount, setForceRenderCount] = useState(0);

	useEffectAsync(async () => {
		try {
			const result = await axios.get(url("/order/readall"), {});
            console.log(result.data.msg);
			setOrders(result.data.msg);
		} catch (error) {
            setOrders([])
			console.log(error);
		}
	}, [forceRenderCount]);

	const orderDeleteHandler = async (id, name) => {
		const yesCallback = async () => {
			try {
				await axios.delete(url("/order/delete"), {
					headers: {},
					data: {
						orderID: id,
					},
				});
				setForceRenderCount((x) => x + 1);
			} catch (error) {
				console.log(error);
			}
		};

		yesNO(`${name} details`, await yesCallback);
	};

	const renderorders = () => {
		if (orders) {
			return orders.map((order, index) => {
				return (
					<div className="order__item order" key={index}>
						<div className="order__item__id">
							{String(order._id).slice(17)}
						</div>
						<div className="order__item__name">
							{order.order_name}
						</div>
						<div className="order__item__paidstatus">
							{order.paid_status}
						</div>
						<div className="order__item__amountpaid">
							{order.amount_paid}
						</div>
						<div className="order__item__address">
							{order.address}
						</div>
						<div className="order__item__delete">
							<button
								className="button button__delete"
								onClick={() => {
									orderDeleteHandler(
										order._id,
										order.order_name
									);
								}}
							>
								Delete
							</button>
						</div>
					</div>
				);
			});
		}
	};

	return (
		<div className="view">
			<Navbar />
			<div className="wrapper_order">
				<div className="order">
					<div className="order__item order__header">
						<div className="order__item__id">ID</div>
						<div className="order__item__name">Order Name</div>
						<div className="order__item__paidstatus">
							Paid Status
						</div>
						<div className="order__item__amountpaid">
							Amount Paid
						</div>
						<div className="order__item__address">Address</div>
						<div className="order__item__delete">Action</div>
					</div>

					{renderorders()}
				</div>
			</div>
		</div>
	);
};

export default OrderPage;