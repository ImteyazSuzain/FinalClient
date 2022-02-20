import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { UserContext } from "../context";
import { useRouter } from "next/router";
const Nav = () => {
	const [state, setstate] = useContext(UserContext);

	const [current, setCurrent] = useState("");
	useEffect(() => {
		process.browser && setCurrent(window.location.pathname);
	}, [process.browser && window.location.pathname]);

	console.log(current);
	const router = useRouter();
	const logout = () => {
		window.localStorage.removeItem("auth");
		setstate(null);
		router.push("/login");
	};

	return (
		<>
			<Head>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
					crossOrigin="anonymous"
				></script>
			</Head>
			<nav className="navbar navbar-expand-lg navbar-light bg-dark d-flex justify-content-between">
				<div className="container-fluid">
					{/* <a className="navbar-brand disabled text-light">Navbar</a> */}
					<Link href="/">
						<a
							className={`nav-link text-light logo ${
								current === "/" && "active"
							}`}
							aria-current="page"
						>
							MERNCAMP
						</a>
					</Link>

					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="true"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div
						className="collapse show navbar-collapse"
						id="navbarSupportedContent"
					>
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							{state !== null ? (
								<>
									<li className="nav-item">
										<Link href="/user/dashboard">
											<a
												className={`nav-link text-light ${
													current === "/user/dashboard" && "active"
												}`}
											>
												{state && state.user && state.user.name}
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link href="/user/profile/update">
											<a
												className={`nav-link text-light ${
													current === "/user/profile/update" && "active"
												}`}
											>
												Profile
											</a>
										</Link>
									</li>
									{state.user.role === "Admin" && (
										<li className="nav-item">
											<Link href="/admin">
												<a
													className={`nav-link text-light ${
														current === "/admin" && "active"
													}`}
												>
													Admin
												</a>
											</Link>
										</li>
									)}
									<li className="nav-item">
										<a onClick={logout} className="nav-link text-light ">
											Logout
										</a>
									</li>
								</>
							) : (
								<>
									<li className="nav-item">
										<Link href="/login">
											<a
												className={`nav-link text-light ${
													current === "/login" && "active"
												}`}
											>
												Login
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link href="/register">
											<a
												className={`nav-link text-light ${
													current === "/register" && "active"
												}`}
											>
												Register
											</a>
										</Link>
									</li>
								</>
							)}
						</ul>
						{/* <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
					</div>
				</div>
			</nav>
		</>
	);
};
export default Nav;
