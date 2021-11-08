import React, { useEffect, useState } from "react";
import Navbar from "../blocks/Navbar";
import axios from "axios";
import { HEADER_PAYLOAD, url, useEffectAsync } from "../../helper";
import yesNO from "../blocks/swal/yesNo";

const OrderPage = () => {
	const [orders, setOrders] = useState([]);
	const [forceRenderCount, setForceRenderCount] = useState(0);

	useEffectAsync(async () => {
		try {
			const result = await axios.get(url("/order/xread"), {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(
						"accessToken"
					)}`,
				},
			});
			setOrders(result.data.msg);
		} catch (error) {
			setOrders([]);
		}
	}, [forceRenderCount]);

	const orderDeleteHandler = async (id, name) => {
		const yesCallback = async () => {
			try {
				const delRes = await axios.delete(url("/order/delete"), {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
					data: {
						orderID: id,
					},
				});
				if (delRes.status === 200) {
					setForceRenderCount((x) => x + 1);
				}
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
							{order.items_ordered}
						</div>
						<div className="order__item__amountpaid">
							{order.amount_paid}
						</div>
						<div className="order__item__address">
							{order.address}
						</div>
						<div
							className="order__item__delete"
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<button
								className="button button-delete"
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
							Items Ordered
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
