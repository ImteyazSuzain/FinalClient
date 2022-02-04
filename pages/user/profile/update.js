import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { Modal, Avatar } from "antd";
import { UserContext } from "../../../context";
import AuthForm from "../../../components/forms/AuthForm";
import { useRouter } from "next/router";
import UserRoute from "../../../components/routes/UserRoute";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
const ProfileUpdate = () => {
	const [username, setUsername] = useState("");
	const [about, setAbout] = useState("");
	const [name, setName] = useState("");
	const [password, setpassword] = useState("");
	const [email, setemail] = useState("");
	const [secret, setsecret] = useState("");
	const [ok, setOk] = useState(false);
	const [loading, setloading] = useState(false);
	const [state, setState] = useContext(UserContext);
	//profile update
	const [images, setImages] = useState({});
	const [uploading, setuploading] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (state && state.user) {
			// console.log("user from state is", state.user);
			setUsername(state.user.username);
			setAbout(state.user.about);
			setemail(state.user.email);
			setName(state.user.name);
			setImages(state.user.images);
		}
	}, [state && state.user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(name,email,password,secret);

		try {
			setloading(true);
			const { data } = await axios.put(`/profile-update`, {
				username,
				about,
				name,
				email,
				password,
				secret,
				images,
			});
			console.log("updated respone ", data);
			if (data.error) {
				toast.error(data.error);
				setloading(false);
			} else {
				//update local storage,update user,keep token
				let auth = JSON.parse(localStorage.getItem("auth"));
				auth.user = data;
				localStorage.setItem("auth", JSON.stringify(auth));
				//update context
				setState({ ...state, user: data });
				setOk(true);
				// setState(data);
				setloading(false);
			}
		} catch (err) {
			toast.error(err.response.data);
			setloading(false);
		}
	};
	const handleImage = async (e) => {
		const file = e.target.files[0];
		let formData = new FormData();
		formData.append("images", file);

		setuploading(true);
		try {
			const { data } = await axios.post(`/upload-image`, formData);
			// console.log("uploaded images", data);
			setImages({
				url: data.url,
				public_id: data.public_id,
			});
			setuploading(false);
		} catch (err) {
			console.log(err);
			setuploading(false);
		}
	};
	return (
		<UserRoute>
			<div className="container-fluid">
				<div className="row py-5 bg-default-image text-light">
					<div className="col text-center">
						<h1>Profile Update Page</h1>
					</div>
				</div>
				{/* 
			{loading ? <h1>Loading</h1> : ""} */}

				<div className="row py-5">
					<div className="col-md-6 offset-md-3">
						{/* upload image */}

						<label className="d-flex justify-content-center h5">
							{images && images.url ? (
								<Avatar size={30} src={images.url} className="" />
							) : uploading ? (
								<LoadingOutlined className="mt-1" />
							) : (
								<CameraOutlined className="mt-1" />
							)}
							<input
								onChange={handleImage}
								type="file"
								accept="images/*"
								hidden
							></input>
						</label>
						<AuthForm
							profileupdate={true}
							username={username}
							setUsername={setUsername}
							about={about}
							setAbout={setAbout}
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
							footer=""
						>
							<p>You have successfully updated your profile</p>
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
		</UserRoute>
	);
};
export default ProfileUpdate;
