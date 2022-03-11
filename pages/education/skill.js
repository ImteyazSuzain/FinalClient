import React, { useState, useEffect } from "react";
import { Select, Tag } from "antd";
import axios from "axios";

function skill(props) {
	const [values, setvalues] = useState([]);
	const options = [
		{ value: "gold" },
		{ value: "lime" },
		{ value: "green" },
		{ value: "cyan" },
	];
	const { label, value, closable, onClose } = props;
	const onPreventMouseDown = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};
	const handleChange = (value) => {
		setvalues(value);
	};

	const handleSubmit = async () => {
		const { data } = await axios.post(`/add-skill`, {
			values,
		});
		console.log(data);
	};
	return (
		<>
			<Tag
				color={value}
				onMouseDown={onPreventMouseDown}
				closable={closable}
				onClose={onClose}
				style={{ marginRight: 3 }}
			>
				{label}
			</Tag>
			<Select
				onChange={handleChange}
				mode="multiple"
				showArrow
				skill={skill}
				style={{ width: "100%" }}
				options={options}
			/>
			<button onClick={handleSubmit}>Submit</button>
		</>
	);
}

export default skill;
