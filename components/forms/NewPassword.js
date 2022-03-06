import { SyncOutlined } from "@ant-design/icons";
const NewPassword = ({
	handleSubmit,
	newPassword,
	setnewPassword,
	loading,
}) => (
	<form onSubmit={handleSubmit}>
		<div className="form-group p-2">
			<small>
				<label className="text-muted">Enter New Password</label>
			</small>
			<input
				value={newPassword}
				onChange={(e) => setnewPassword(e.target.value)}
				type="password"
				className="form-control"
				placeholder="Enter New Password"
			/>
		</div>

		<div className="form-group p-2">
			<button
				disabled={!newPassword || loading}
				className="btn btn-primary col-12 "
			>
				{loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
			</button>
		</div>
	</form>
);

export default NewPassword;
