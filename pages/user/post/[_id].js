import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../../components/routes/UserRoute";
import PostForm from "../../../components/forms/PostForm";
import { toast } from "react-toastify";
const EditPost = () => {
	const [content, setContent] = useState("");
	const [images, setImages] = useState({});
	const [uploading, setuploading] = useState(false);

	const [post, setPost] = useState({});
	const router = useRouter();
	console.log("router", router);
	const _id = router.query._id;
	useEffect(() => {
		if (_id) fetchPost();
	}, [_id]);
	const fetchPost = async () => {
		try {
			const { data } = await axios.get(`/user-post/${_id}`);
			setPost(data);
			console.log(data);
			setContent(data.content);
			setImages(data.images);
		} catch (err) {
			console.log(err);
		}
	};
	const postSubmit = async (e) => {
		e.preventDefault();
		// console.log("submit post to update", content, images);
		try {
			const { data } = await axios.put(`/update-post/${_id}`, {
				content,
				images,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success("Post is Updated");
				router.push("/user/dashboard");
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
					</div>
					{/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
				</div>
			</div>
		</UserRoute>
	);
};

export default EditPost;
