import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal } from "antd";
import { UserContext } from "../context";
import AuthForm from "../components/forms/AuthForm";
import { useRouter } from "next/router";
const Register = () => {
	const [name, setName] = useState("");
	const [password, setpassword] = useState("");
	const [email, setemail] = useState("");
	const [secret, setsecret] = useState("");
	const [ok, setOk] = useState(false);
	const [loading, setloading] = useState(false);
	const [state, setState] = useContext(UserContext);
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(name,email,password,secret);

		try {
			setloading(true);
			const { data } = await axios.post(`/register`, {
				name,
				email,
				password,
				secret,
			});
			if (data.error) {
				toast.error(data.error);
				setloading(false);
			} else {
				setName("");
				setemail("");
				setpassword("");
				setsecret("");
				setOk(data.ok);
				setloading(false);
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
	if (state && state.token) router.push("/");
	return (
		<div className="container-fluid">
			<div className="row py-5 bg-default-image text-light">
				<div className="col text-center">
					<h1>Register Page</h1>
				</div>
			</div>
			{/* 
			{loading ? <h1>Loading</h1> : ""} */}
			<div className="row py-5">
				<div className="col-md-6 offset-md-3">
					<AuthForm
						handleSubmit={handleSubmit}
						name={name}
						setName={setName}
						email={email}
						setemail={setemail}
						password={password}
						setpassword={setpassword}
						secret={secret}
						setsecret={setsecret}
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
						footer="i am footer"
					>
						<p>You have successfully registered</p>
						<Link href="/">
							<a className="btn btn-primary btn-sm">Login</a>
						</Link>
					</Modal>
				</div>
			</div>
			<div className="row">
				<div className="col">
					<p className="text-center">
						Already Register ?{" "}
						<Link href="/login">
							<a>Login</a>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};
export default Register;
