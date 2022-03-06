import {
	HeartOutlined,
	HeartFilled,
	CommentOutlined,
	EditOutlined,
	DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
const Educationlist = ({ education, handleDelete }) => {
	const router = useRouter();

	return (
		<>
			{education &&
				education.map((e) => (
					<div key={e._id} className="container col-md-8 offset-md-2 mb-5">
						<div className="card-header d-flex ">{e.startdate}</div>

						<div className="card-body d-flex">
							<div className="d-flex">
								{e.education}

								<span>{e.areaofinterest}</span>
							</div>

							<span>{e.percentage}</span>
						</div>
						<div className="card-body">{e.areaofinterest}</div>
						<div className="card-footer d-flex">
							<span>{e.enddate}</span>
							<>
								<EditOutlined
									onClick={() => router.push(`/education/${e._id}`)}
									className="text-danger pt-2 h5 px-2 ms-auto "
								/>
								<DeleteOutlined
									onClick={() => handleDelete(e)}
									className="text-danger pt-2 h5 px-2"
								/>
							</>
						</div>
					</div>
				))}
		</>
	);
};
export default Educationlist;
