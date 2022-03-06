import { useContext } from "react";

import { useRouter } from "next/router";

import { UserContext } from "../../context";

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
