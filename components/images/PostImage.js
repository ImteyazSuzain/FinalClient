const PostImage = ({ url }) => (
	<div
		style={{
			backgroundImage: "url( " + url + " )",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover",
			backgroundPosition: "center center",
			height: "300px",
		}}
	></div>
);
export default PostImage;
