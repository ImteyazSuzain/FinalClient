import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import UserRoute from "../../components/routes/UserRoute";
import TextField from "@mui/material/TextField";

import axios from "axios";
import { toast } from "react-toastify";

const education = () => {
	const router = useRouter();
	const [formFields, setFormFields] = useState([
		{
			areaofinterest: "",
			percentage: "",
			education: "",
			startdate: "",
			enddate: "",
		},
	]);

	const handleFormChange = (event, index) => {
		let data = [...formFields];
		data[index][event.target.name] = event.target.value;
		setFormFields(data);
	};
	const removeFields = (index) => {
		let data = [...formFields];
		data.splice(index, 1);
		setFormFields(data);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`/education`, {
				formFields,
			});
			if (data.ok) {
				toast.success("Education Updated");
			}
			router.push("/education/dashboard");
		} catch (err) {
			console.log(err);
		}
	};

	const addFields = () => {
		let object = {
			areaofinterest: " ",
			percentage: "",
			education: "",
			startdate: "",
			enddate: "",
		};

		setFormFields([...formFields, object]);
	};
	return (
		<UserRoute>
			<div className="col-md-8 offset-md-2 py-5">
				<form onSubmit={handleSubmit}>
					{formFields.map((form, index) => {
						return (
							<div key={index}>
								<TextField
									name="startdate"
									id="date"
									type="date"
									onChange={(event) => handleFormChange(event, index)}
									value={form.startdate}
								/>
								<TextField
									name="enddate"
									id="date"
									type="date"
									onChange={(event) => handleFormChange(event, index)}
									value={form.enddate}
								/>
								<div className="form-group p-2">
									<small>
										<label className="text-muted">Area Of Interest</label>
									</small>
									<select
										name="areaofinterest"
										value={form.areaofinterest}
										onChange={(event) => handleFormChange(event, index)}
										className="form-control"
									>
										<option value="">Education Level</option>
										<option value="Xth">Class Xth</option>
										<option value="Xth">Class Xth</option>
										<option value="Udergraduate">Undergraduate</option>
										<option value="PostGraduate">PostGraduate</option>
									</select>
								</div>
								<div className="form-group p-2">
									<small>
										<label className="text-muted">Pick Education Level</label>
									</small>
									<select
										name="education"
										value={form.education}
										onChange={(event) => handleFormChange(event, index)}
										className="form-control"
									>
										<option value="">Education Level</option>
										<option value="Xth">Class Xth</option>
										<option value="Xth">Class Xth</option>
										<option value="Udergraduate">Undergraduate</option>
										<option value="PostGraduate">PostGraduate</option>
									</select>
								</div>
								<div className="form-group p-2">
									<small>
										<label className="text-muted">Percentage</label>
									</small>
									<input
										name="percentage"
										value={form.percentage}
										onChange={(event) => handleFormChange(event, index)}
										type="number"
										className="form-control"
										placeholder="Enter your equivalent percentage"
									/>
								</div>
								<button onClick={() => removeFields(index)}>Remove</button>
							</div>
						);
					})}
				</form>
				<button onClick={addFields}>Add More..</button>
				<br />
				<button onClick={handleSubmit}>Submit</button>
			</div>
		</UserRoute>
	);
};
export default education;
