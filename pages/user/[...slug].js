import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Emailverify() {
	const router = useRouter();
	const [validUrl, setValidUrl] = useState(true);
	let query = router.query.slug;
	const _id = query?.[0];
	const token = query?.[2];
	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const { data } = await axios.get(`/user/${_id}/verify/${token}`);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [_id, token]);

	return (
		<>
			{validUrl ? (
				<div>
					<h1>Email verified successfully</h1>
					<Link href="/login">
						<a>helloo</a>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	);
}
