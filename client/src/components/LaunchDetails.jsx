import { gql, useQuery } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import Slider from "react-slick";
import Moment from "react-moment";

const LAUNCH_QUERY = gql`
  query LaucnhQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      mission_name
      launch_date_local
      launch_success
      details
      rocket {
        rocket_name
        rocket_type
        rocket_id
      }
      links {
        mission_patch_small
        video_link
        flickr_images
      }
    }
  }
`;

export const LaunchDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number: +id },
  });

  const settings = {
    className: "slider-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (loading) {
    return <h1 className="w-50 mx-auto text-center my-5">Loading...</h1>;
  }

  if (error) console.log(error);

  const {
    mission_name,
    launch_date_local,
    launch_success,
    rocket,
    links,
    details,
  } = data && data.launch;

  const { flickr_images, mission_patch_small, video_link } = links;

  return (
    <div className="jumbotron w-75 mx-auto mt-lg-5 pt-4">
      <button
        className="btn btn-primary mb-5"
        onClick={() => history.goBack()}
      >
        Back
      </button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="display-4 my-3">
          <span className="text-dark">Mission:</span> {mission_name}
        </h1>
        <img
          src={mission_patch_small}
          alt="mission patch"
          className="pr-lg-5"
        />
      </div>
      <hr className="my-4" />
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">
          {" "}
          Success:{" "}
          {launch_success ? (
            <span className="text-success h6">yes</span>
          ) : (
            <span className="text-danger">no</span>
          )}
        </li>
        <li className="list-group-item">
          Date:{" "}
          <b>
            <Moment format="DD-MM-YYYY HH:mm">{launch_date_local}</Moment>
          </b>
        </li>
        <li className="list-group-item">
          {" "}
          Rocket:{" "}
          <Link to={`/rocket/${rocket.rocket_id}`}>{rocket.rocket_name}</Link>
        </li>
        {video_link && (
          <li className="list-group-item">
            <a href={video_link} rel="noreferrer" target="_blank">
              Click here to watch the video of launching
            </a>
          </li>
        )}
      </ul>

      <hr />
      <p className="h5">{details}</p>

      {flickr_images.length > 0 && (
        <div className="w-50 mx-auto h-50">
          <Slider {...settings}>
            {flickr_images &&
              flickr_images.map((link) => (
                <div style={{ overflow: "hidden", height: "100px" }}>
                  <img
                    src={link}
                    alt="Flickr images"
                    style={{
                      width: "700px",
                      height: "500px",
                      maxHeight: "700px",
                    }}
                  />
                </div>
              ))}
          </Slider>
        </div>
      )}
    </div>
  );
};
