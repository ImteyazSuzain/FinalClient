import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { UserContext } from "../context";
import AuthForm from "../components/forms/AuthForm";
const Login = () => {
	const [password, setpassword] = useState("");
	const [email, setemail] = useState("");
	const [loading, setloading] = useState(false);

	const [state, setState] = useContext(UserContext);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(name,email,password,secret);

		try {
			setloading(true);
			const { data } = await axios.post(`/login`, {
				email,
				password,
			});

			if (data.error) {
				toast.error(data.error);
				setloading(false);
			} else {
				setState({
					user: data.user,
					token: data.token,
				});

				window.localStorage.setItem("auth", JSON.stringify(data));
				router.push("/user/dashboard");
			}
		} catch (err) {
			toast.error(err.response.data);
			setloading(false);
		}

		// .then((res) => {
		// 	setOk(res.data.ok);
		// })
		// //how we get the error messaage it is error.response.data
		// .catch((err) => toast.error(err.response.data));
	};
	if (state && state.token) router.push("/user/dashboard");
	return (
		<div className="container-fluid">
			<div className="row py-5 bg-default-image text-light">
				<div className="col text-center">
					<h1>Login Page</h1>
				</div>
			</div>
			{/* 
			{loading ? <h1>Loading</h1> : ""} */}
			<div className="row py-5">
				<div className="col-md-6 offset-md-3">
					<AuthForm
						handleSubmit={handleSubmit}
						email={email}
						setemail={setemail}
						password={password}
						setpassword={setpassword}
						loading={loading}
						pages="login"
					/>
				</div>
			</div>

			<div className="row">
				<div className="col">
					<p className="text-center">
						Not yet Register ?{" "}
						<Link href="/register">
							<a>Register</a>
						</Link>
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<p className="text-center">
						<Link href="/forgot-password">
							<a className="text-danger">Forgot Password</a>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Login;
