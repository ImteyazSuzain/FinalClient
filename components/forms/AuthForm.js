import { SyncOutlined } from "@ant-design/icons";
const AuthForm = ({
	handleSubmit,
	name,
	setName,
	email,
	setemail,
	password,
	setpassword,
	secret,
	setsecret,
	loading,
	pages,
	about,
	setAbout,
	username,
	setUsername,
	profileupdate,
}) => (
	<form onSubmit={handleSubmit}>
		{profileupdate && (
			<>
				<div className="form-group p-2">
					<small>
						<label className="text-muted">UserName</label>
					</small>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						className="form-control"
						placeholder="Enter username"
					/>
				</div>
				<div className="form-group p-2">
					<small>
						<label className="text-muted">About</label>
					</small>
					<input
						value={about}
						onChange={(e) => setAbout(e.target.value)}
						type="text"
						className="form-control"
						placeholder="Enter About"
					/>
				</div>
			</>
		)}

		{pages !== "login" && (
			<div className="form-group p-2">
				<small>
					<label className="text-muted">Your Name</label>
				</small>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					className="form-control"
					placeholder="Enter name"
				/>
			</div>
		)}
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
				disabled={profileupdate}
			/>
		</div>
		<div className="form-group p-2">
			<small>
				<label className="text-muted">Password</label>
			</small>
			<input
				value={password}
				onChange={(e) => setpassword(e.target.value)}
				type="password"
				className="form-control"
				placeholder="Enter Password"
			/>
		</div>

		{pages !== "login" && (
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
		)}
		<div className="form-group p-2">
			<button
				disabled={
					profileupdate
						? loading
						: pages === "login"
						? !email || !password || loading
						: !name || !email || !password || !secret || loading
				}
				className="btn btn-primary col-12 "
			>
				{loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
			</button>
		</div>
	</form>
);

export default AuthForm;
