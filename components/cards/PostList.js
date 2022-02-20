import { useContext } from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { useRouter } from "next/router";
import {
	HeartOutlined,
	HeartFilled,
	CommentOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { UserContext } from "../../context";
import { imageSource } from "../../functions";
import Link from "next/link";
import Post from "./Post";

const PostList = ({
	posts,
	handleDelete,
	handlelike,
	handleUnlike,
	handleComment,
	removeComment,
}) => {
	const [state] = useContext(UserContext);
	const router = useRouter();
	return (
		<>
			{posts &&
				posts.map((post) => (
					<Post
						key={post._id}
						post={post}
						handleComment={handleComment}
						handleDelete={handleDelete}
						handleUnlike={handleUnlike}
						handlelike={handlelike}
						removeComment={removeComment}
					/>
				))}
		</>
	);
};
export default PostList;
