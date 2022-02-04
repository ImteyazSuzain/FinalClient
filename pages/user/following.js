import { Avatar, List } from "antd";
import moment from "moment";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "react-toastify";

const Following = () => {
	const [state, setState] = useContext(UserContext);
	const [people, setPeople] = useState([]);
	const router = useRouter();

	const fetchfollowing = async (req, res) => {
		try {
			const { data } = await axios.get("/user-following");
			console.log("following list", data);
			setPeople(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (state && state.token) fetchfollowing();
	}, [state && state.token]);

	const imageSource = (user) => {
		// console.log(user);
		if (user.images) {
			return user.images.url;
		} else {
			return "/images/default.webp";
		}
	};
	const handleUnFollow = async (user) => {
		try {
			const { data } = await axios.put("/user-unfollow", { _id: user._id });
			let auth = JSON.parse(localStorage.getItem("auth"));

			auth.user = data;
			//update context
			setState({ ...state, user: data });
			//update people state
			let filtered = people.filter((p) => p._id !== user._id);
			setPeople(filtered);

			toast.error(`UnFollowing ${user.name}`);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="container">
			<div className=" row col-md-6 offset-md-3">
				<List
					itemLayout="horizontal"
					dataSource={people}
					renderItem={(user) => (
						<List.Item>
							<List.Item.Meta
								avatar={<Avatar src={imageSource(user)} />}
								title={
									<div className="d-flex justify-content-between">
										{user.username}{" "}
										<span
											style={{}}
											onClick={() => handleUnFollow(user)}
											className="text-danger click btn"
										>
											UnFollow
										</span>
									</div>
								}
							/>
						</List.Item>
					)}
				/>
				<Link href="/user/dashboard">
					<a className="d-flex justify-content-center pt-3">
						<RollbackOutlined />
					</a>
				</Link>
			</div>
		</div>
	);
};
export default Following;
