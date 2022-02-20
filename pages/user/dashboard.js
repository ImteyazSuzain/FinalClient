import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";
import People from "../../components/cards/People";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import CommentForm from "../../components/forms/commentForm";
import Search from "../../components/Search";
import io from "socket.io-client";
const Home = () => {
	const [state, setState] = useContext(UserContext);
	//state
	const [content, setContent] = useState("");
	const [images, setImages] = useState({});
	const [uploading, setuploading] = useState(false);

	//posts
	const [posts, setPosts] = useState([]);

	//PEOPLE
	const [people, setPeople] = useState([]);

	//COMMENTS
	const [comment, setComment] = useState("");
	//Modal showing
	const [visible, setVisible] = useState(false);
	//for commenting on current post
	const [currentPost, setCurrentPost] = useState({});
	//pagination
	const [totalPost, settotalPost] = useState(0);
	//setting the page
	const [page, setpage] = useState(1);
	//router
	const router = useRouter();
	// const newsFeed = async () => {
	// 	try {
	// 		const { data } = await axios.get(`/news-feed`);
	// 		setPosts(data);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }; fetchall the post function

	useEffect(() => {
		if (state && state.token) {
			newsFeed();
			findPeople();
		}
	}, [state && state.token, page]);

	useEffect(() => {
		try {
			axios.get("/total-posts").then(({ data }) => settotalPost(data));
			console.log(totalPost);
		} catch (err) {
			console.log(err);
		}
	}, [page]);
	const socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {
		reconnection: true,
	});
	const newsFeed = async () => {
		try {
			const { data } = await axios.get(`/news-feed/${page}`);
			// console.log(data);
			// console.log(totalPost);
			setPosts(data);
		} catch (err) {
			console.log(err);
		}
	};
	const findPeople = async () => {
		try {
			const { data } = await axios.get("/find-people");
			// console.log(data);
			setPeople(data);
		} catch (err) {
			console.log(err);
		}
	};
	const postSubmit = async (e) => {
		e.preventDefault();
		// console.log("post =>", content);
		try {
			//we will sending the content as request.body
			const { data } = await axios.post(`/create-post`, { content, images });
			console.log("create post response=>", data);
			if (data.error) {
				toast.error(data.error);
			} else {
				setpage(1);
				newsFeed();
				toast.success("Post Created");
				setContent("");
				setImages({});
				//socket
				socket.emit("new-post", data);
			}
		} catch (err) {
			console.log(err);
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
	const handleDelete = async (post) => {
		try {
			const answer = window.confirm("Are you sure?");
			if (!answer) return;
			const { data } = await axios.delete(`/delete-post/${post._id}`);

			toast.error("Post Deleted");
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};

	const handleFollow = async (user) => {
		// console.log("add this user to following list", user);
		try {
			const { data } = await axios.put("/user-follow", { _id: user._id });
			// console.log("handle follow response =>", data);
			//update local storage, update user ,keep token
			let auth = JSON.parse(localStorage.getItem("auth"));

			auth.user = data;
			localStorage.setItem("auth", JSON.stringify(auth));
			//update context
			setState({ ...state, user: data });
			//update people state
			let filtered = people.filter((p) => p._id !== user._id);
			setPeople(filtered);
			setpage(1);
			newsFeed();
			toast.success(`Followed ${user.name}`);
		} catch (err) {
			console.log(err);
		}
	};

	const handlelike = async (_id) => {
		// console.log("like this post", _id);
		try {
			const { data } = await axios.put("/post-like", { _id });
			// console.log("liked", data);
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};
	const handleUnlike = async (_id) => {
		// console.log("Unlike this post", _id);
		try {
			const { data } = await axios.put("/post-unlike", { _id });
			// console.log("unliked", data);
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};
	const handleComment = (post) => {
		setCurrentPost(post);
		setVisible(true);
	};

	const addComment = async (e) => {
		e.preventDefault();
		// console.log("comment to this post", currentPost);
		// console.log("save comment to db", comment);
		try {
			const { data } = await axios.put("/add-comment", {
				postId: currentPost._id,
				comment,
			});

			setComment("");
			setVisible(false);
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};
	const removeComment = async (postId, comment) => {
		// console.log(postId, comment);
		let answer = window.confirm("Are you sure?");
		if (!answer) return;
		try {
			const { data } = await axios.put("/remove-comment", {
				postId,
				comment,
			});
			console.log("comment removed", data);
			newsFeed();
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<UserRoute>
			<div className="container-fluid">
				<div className="row py-5 bg-default-image text-light">
					<div className="col text-center">
						<h1>NewsFeed</h1>
					</div>
				</div>
				<div className="row py-3">
					<div className="col-md-8 col-md-offset-2">
						<PostForm
							content={content}
							setContent={setContent}
							postSubmit={postSubmit}
							handleImage={handleImage}
							uploading={uploading}
							images={images}
						/>
						<br></br>
						<PostList
							posts={posts}
							handleDelete={handleDelete}
							handlelike={handlelike}
							handleUnlike={handleUnlike}
							handleComment={handleComment}
							removeComment={removeComment}
						/>
						{settotalPost}
						<Pagination
							defaultCurrent={1}
							current={page}
							total={Math.round((totalPost / 3) * 10)}
							onChange={(value) => setpage(value)}
							className="pb-5"
						/>
					</div>

					<div className="col-md-4">
						<Search />
						{state && state.user && state.user.following && (
							<Link href={`/user/following`}>
								<a className="h6">{state.user.following.length} Following</a>
							</Link>
						)}

						<People people={people} handleFollow={handleFollow} />
					</div>
				</div>
				<Modal
					visible={visible}
					onCancel={() => setVisible(false)}
					title="Comment"
					footer={null}
				>
					<CommentForm
						comment={comment}
						addComment={addComment}
						setComment={setComment}
					/>
				</Modal>
			</div>
		</UserRoute>
	);
};

export default Home;
