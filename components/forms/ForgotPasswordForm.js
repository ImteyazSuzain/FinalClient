import { SyncOutlined } from "@ant-design/icons";
const ForgotPasswordForm = ({
	handleSubmit,
	email,
	setemail,
	newPassword,
	setNewPassword,
	secret,
	setsecret,
	loading,
	pages,
}) => (
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
			<small>
				<label className="text-muted">New Password</label>
			</small>
			<input
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
				type="password"
				className="form-control"
				placeholder="Enter New Password"
			/>
		</div>

		<>
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Pick a Question</label>
				</small>
				<select className="form-control">
					<option value="">What is your favourite color?</option>
					<option value="">Who is your best friend?</option>
					<option value="">What is your nick name?</option>
				</select>
				<small className="form-text text-muted">
					You can you this to reset your password if forgotten.
				</small>
			</div>
			<div className="form-group p-2">
				<input
					value={secret}
					onChange={(e) => setsecret(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Write your answer here"
				/>
			</div>
		</>

		<div className="form-group p-2">
			<button
				disabled={!email || !newPassword || !secret || loading}
				className="btn btn-primary col-12 "
			>
				{loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
			</button>
		</div>
	</form>
);

export default ForgotPasswordForm;
