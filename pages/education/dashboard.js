import React, { useEffect, useState } from "react";
import { UserContext } from "../../context";
import { useContext } from "react";
import axios from "axios";
import Educationlist from "../../components/cards/Educationlist";
import { toast } from "react-toastify";
const dashboard = () => {
	const [state, setState] = useContext(UserContext);
	const [education, setEducation] = useState("");

	useEffect(() => {
		if (state && state.token) {
			educations();
		}
	}, [state && state.token]);
	const handleDelete = async (e) => {
		try {
			const answer = window.confirm("Are you sure?");
			if (!answer) return;
			const { data } = await axios.delete(`/delete-education/${e._id}`);

			educations();
			toast.error("Post Deleted");
		} catch (err) {
			console.log(err);
		}
	};
	const educations = async () => {
		try {
			const { data } = await axios.get(`/geteducation`);

			setEducation(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>{<Educationlist education={education} handleDelete={handleDelete} />}</>
	);
};

export default dashboard;
