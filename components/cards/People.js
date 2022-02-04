import { Avatar, List } from "antd";
import moment from "moment";
import { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const People = ({ people, handleFollow }) => {
	const [state, setState] = useContext(UserContext);
	const router = useRouter();

	const imageSource = (user) => {
		// console.log(user);
		if (user.images) {
			return user.images.url;
		} else {
			return "/images/default.webp";
		}
	};
	return (
		<>
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
										onClick={() => handleFollow(user)}
										className="text-primary click btn"
									>
										Follow
									</span>
								</div>
							}
						/>
					</List.Item>
				)}
			/>
		</>
	);
};
export default People;
