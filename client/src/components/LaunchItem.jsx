import { Link } from "react-router-dom";
import Moment from 'react-moment';

export const LaunchItem = ({
  mission_name,
  flight_number,
  launch_date_local,
  launch_success,
}) => {
  return (
    <div style={{width: "49%"}} className="card border-light my-5 position-relative">
      <div className="card-header">№{flight_number}</div>
      <div className="card-body">
        <h4 className="card-title mb-0">
          Mission:{" "}
          <span className={launch_success ? "text-success" : "text-danger"}>
            {mission_name}
          </span>
        </h4>
        <p>
          <Moment format="DD-MM-YYYY HH:mm">{launch_date_local}</Moment>
        </p>
        <Link
          style={{ right: "3%", bottom: "10%" }}
          to={`/${flight_number}`}
          className="btn btn-outline-info position-absolute"
        >
          Details
        </Link>
      </div>
    </div>
  );
};
