import { SyncOutlined } from "@ant-design/icons";
const ForgotPasswordForm = ({ handleSubmit, email, setemail, loading }) => (
	<form onSubmit={handleSubmit}>
		<div className="form-group p-2">
			<small>
				<label className="text-muted">Enter Email</label>
			</small>
			<input
				value={email}
				onChange={(e) => setemail(e.target.value)}
				type="email"
				className="form-control"
				placeholder="Enter Email"
			/>
		</div>

		<div className="form-group p-2">
			<button disabled={!email || loading} className="btn btn-primary col-12 ">
				{loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
			</button>
		</div>
	</form>
);

export default ForgotPasswordForm;
