import { gql, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";

const ROCKET_QUERY = gql`
  query RocketQuery($rocket_id: String!) {
    rocket(rocket_id: $rocket_id) {
      rocket_name
      rocket_type
      success_rate_pct
      first_flight
      height {
        meters
        feet
      }
      mass {
        kg
        lb
      }
      diameter {
        meters
        feet
      }
      description
    }
  }
`;

export const RocketDetails = () => {
  const { rocket_id } = useParams();
  const { loading, error, data } = useQuery(ROCKET_QUERY, {
    variables: {
      rocket_id: rocket_id,
    },
  });
  const history = useHistory();

  if (loading) {
    return <h1 className="w-50 mx-auto text-center my-5">Loading...</h1>;
  }

  if (error) console.log(error);

  const {
    rocket_name,
    rocket_type,
    success_rate_pct,
    first_flight,
    height,
    mass,
    diameter,
    description,
  } = data && data.rocket;
  console.log(data);
  return (
    <div className="jumbotron w-75 mx-auto mt-lg-5 pt-4">
      <button className="btn btn-primary mb-5" onClick={() => history.goBack()}>
        Back
      </button>
      <div>
        <p className="h1">
          <span className="text-dark">Name:</span> {rocket_name}
        </p>
        <ul className="list-group">
          <li className="list-group-item">Type: {rocket_type}</li>
          <li className="list-group-item">
            Flight success rate: {success_rate_pct}
          </li>
          <li className="list-group-item">First flight: {first_flight}</li>
          <li className="list-group-item">
            Height: {height.meters} meters ({height.feet} feet)
          </li>
          <li className="list-group-item">
            Mass: {mass.kg} kg ({mass.lb} lb)
          </li>
          <li className="list-group-item">
            Diameter: {diameter.meters} meters ({diameter.feet} feet)
          </li>
        </ul>
        <hr />
        <p className="h4 text-dark">Description:</p>
        <p className="h5">{description}</p>
      </div>
    </div>
  );
};
