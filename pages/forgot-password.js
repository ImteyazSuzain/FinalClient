import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal } from "antd";
import { UserContext } from "../context";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";
import { useRouter } from "next/router";
const ForgotPassword = () => {
	const [email, setemail] = useState("");
	const [ok, setOk] = useState(false);
	const [loading, setloading] = useState(false);
	const [state, setState] = useContext(UserContext);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(name, email, password, secret);
			setloading(true);
			const { data } = await axios.post(`/forgot-password`, {
				email,
			});

			if (data.error) {
				toast.error(data.error);
				setloading(false);
			}

			if (data.success) {
				setemail("");

				setOk(true);
				setloading(false);
			}
		} catch (err) {
			console.log(err);
			setloading(false);
		}
	};

	return (
		<div className="container-fluid">
			<div className="row py-5 bg-default-image text-light">
				<div className="col text-center">
					<h1>Forgot Password</h1>
				</div>
			</div>
			{/* 
			{loading ? <h1>Loading</h1> : ""} */}
			<div className="row py-5">
				<div className="col-md-6 offset-md-3">
					<ForgotPasswordForm
						handleSubmit={handleSubmit}
						email={email}
						setemail={setemail}
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
						<p>Congrats! Password Reset link sent to your registered email</p>
						{/* <Link href="/login">
							<a className="btn btn-primary btn-sm">Login</a>
						</Link> */}
					</Modal>
				</div>
			</div>
		</div>
	);
};
export default ForgotPassword;
