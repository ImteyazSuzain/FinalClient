import React from "react";
import { useState } from "react";

import moment from "moment";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import axios from "axios";

function skill() {
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

	const submit = (e) => {
		e.preventDefault();
		console.log(formFields);
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

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="App">
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
	);
}

export default skill;
