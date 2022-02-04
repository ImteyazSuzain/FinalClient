import { Avatar } from "antd";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import ReactQuill from "react-quill";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";

const PostForm = ({
	content,
	setContent,
	postSubmit,
	handleImage,
	uploading,
	images,
}) => {
	return (
		<div className="card">
			<div className="card-body pb-3">
				<form action="" className="form-group">
					<ReactQuill
						theme="snow"
						value={content}
						onChange={(e) => setContent(e)}
						className="form-control"
						placeholder="Write Something"
					/>
				</form>
			</div>

			<div className="card-footer d-flex justify-content-between text-muted">
				<button
					disabled={!content}
					onClick={postSubmit}
					className="btn btn-sm btn-primary mt-1"
				>
					Post
				</button>
				<label>
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
			</div>
		</div>
	);
};
export default PostForm;
