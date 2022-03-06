import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Modal } from "antd";
import NewPassword from "../../../components/forms/NewPassword";
import { toast } from "react-toastify";
const token = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [ok, setOk] = useState(false);
	const [newPassword, setnewPassword] = useState("");
	const [loading, setloading] = useState(false);
	const router = useRouter();
	const _id = router.query._id;
	const token = router.query.token;
	const verifyUrl = async () => {
		try {
			await axios.get(`/reset-password/${_id}/${token}`);
			setValidUrl(true);
			console.log("url is valid");
		} catch (error) {
			setValidUrl(false);
		}
	};
	useEffect(() => {
		if ((_id, token)) verifyUrl();
	}, [_id, token]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setloading(true);
			const { data } = await axios.post(`/reset-password/${_id}/${token}`, {
				newPassword,
			});
			console.log(data);
			if (data.error) {
				toast.error(data.error);
				setloading(false);
			}

			if (data.success) {
				setOk(true);
				setloading(false);
				toast.success(data.success);
				router.push("/login");
			}
		} catch (err) {
			console.log(err);
			setloading(false);
		}
	};

	return (
		<>
			{validUrl ? (
				<div className="container-fluid">
					<div className="row py-5 bg-default-image text-light">
						<div className="col text-center">
							<h1>Add New Password</h1>
						</div>
					</div>
					{/* 
			{loading ? <h1>Loading</h1> : ""} */}
					<div className="row py-5">
						<div className="col-md-6 offset-md-3">
							<NewPassword
								handleSubmit={handleSubmit}
								newPassword={newPassword}
								setnewPassword={setnewPassword}
								loading={loading}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col">
							<Modal
								title="Congratulations"
								visible={ok}
								onCancel={() => setOk(false)}
								footer=""
							>
								<p>Congrats! Now you have your new Password</p>
							</Modal>
						</div>
					</div>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
};

export default token;
