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

	const newsFeed = async () => {
		try {
			const { data } = await axios.get(`/news-feed`);
			setPosts(data);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (state && state.token) {
			newsFeed();
			findPeople();
		}
	}, [state && state.token]);
	const findPeople = async () => {
		try {
			const { data } = await axios.get("/find-people");
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
				newsFeed();
				toast.success("Post Created");
				setContent("");
				setImages({});
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
			console.log(auth);
			auth.user = data;
			//update context
			setState({ ...state, user: data });
			//update people state
			let filtered = people.filter((p) => p._id !== user._id);
			setPeople(filtered);
			newsFeed();
			toast.success(`Followed ${user.name}`);
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
					<div className="col-md-8">
						<PostForm
							content={content}
							setContent={setContent}
							postSubmit={postSubmit}
							handleImage={handleImage}
							uploading={uploading}
							images={images}
						/>
						<br></br>
						<PostList posts={posts} handleDelete={handleDelete} />
					</div>

					<div className="col-md-4">
						{state && state.user && state.user.following && (
							<Link href={`/user/following`}>
								<a className="h6">{state.user.following.length} Following</a>
							</Link>
						)}
						<People people={people} handleFollow={handleFollow} />
					</div>
				</div>
			</div>
		</UserRoute>
	);
};

export default Home;
