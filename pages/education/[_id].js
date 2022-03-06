import { useEffect, useState } from "react";
import { DatePicker, Space } from "antd";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";
const { RangePicker } = DatePicker;
const education = () => {
	const router = useRouter();
	const _id = router.query._id;
	const [startdate, setstartdate] = useState("");
	const [enddate, setendDate] = useState("");
	const [education, seteducation] = useState("");
	const [areaofinterest, setareaofinterest] = useState("");
	const [percentage, setpercentage] = useState("");
	const [data, setData] = useState("");
	useEffect(() => {
		if (_id) fetchdata();
	}, [_id]);
	const fetchdata = async () => {
		try {
			const { data } = await axios.get(`/user-education/${_id}`);
			setData(data);
			setstartdate(data.startdate);
			setendDate(data.enddate);
			seteducation(data.education);
			setareaofinterest(data.areaofinterest);
			setpercentage(data.percentage);
		} catch (err) {
			console.log(err);
		}
	};
	const onChangestart = (date, dateString) => {
		console.log(dateString);
		setstartdate(dateString);
	};
	const onChange = (date, dateString) => {
		setendDate(dateString);
	};
	const Submit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.put(`/update-education/${_id}`, {
				startdate,
				enddate,
				education,
				areaofinterest,
				percentage,
			});
			if (data.error) {
				toast.error(data.error);
			} else {
				toast.success("Education is Updated");
				router.push("/education/dashboard");
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			{data && (
				<div className="col-md-8 offset-md-2 py-5">
					<form onSubmit={Submit}>
						<div className="form-group p-2" style={{ textAlign: "end" }}>
							<Space direction="vertical" size={12} value="startdate">
								<DatePicker
									placeholder="Start Date"
									value={moment(startdate)}
									onChange={onChangestart}
								/>
								<DatePicker
									placeholder="End Date"
									value={moment(enddate)}
									onChange={onChange}
								/>
							</Space>
						</div>
						<div className="form-group p-2">
							{console.log(startdate)}
							<small>
								<label className="text-muted">Pick Education Level</label>
							</small>
							<select
								value={education}
								onChange={(e) => seteducation(e.target.value)}
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
								<label className="text-muted">Area Of Interest</label>
							</small>
							<select
								value={areaofinterest}
								onChange={(e) => setareaofinterest(e.target.value)}
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
								value={percentage}
								onChange={(e) => setpercentage(e.target.value)}
								type="number"
								className="form-control"
								placeholder="Enter your equivalent percentage"
							/>
						</div>
						<div className="form-group p-2">
							<button className="btn btn-sm btn-primary mt-1" onSubmit={Submit}>
								submit
							</button>
						</div>
					</form>
				</div>
			)}
		</>
	);
};
export default education;
