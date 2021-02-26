import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { LaunchItem } from "../LaunchItem";
import { MissionKey } from "../MissionKey";
import classes from "./Launches.module.css";

const LAUNCHES_QUERY = gql`
  query LaucnhesQuery {
    launches {
      flight_number
      mission_name
      launch_success
      launch_date_local
    }
  }
`;

export const Launches = () => {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  const [state, setState] = useState({
    currentPage: 1,
    perPage: 6,
  });

  const { currentPage, perPage } = state;

  if (loading) {
    return <h1 className="w-50 mx-auto text-center my-5">Loading...</h1>;
  }

  if (error) {
    console.log(error);
  }

  const indexOfLastLaunch = currentPage * perPage,
    indexOfFirstLaunch = indexOfLastLaunch - perPage,
    currentLaunches =
      data && data.launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

  const handleClick = (evt) =>
    setState({ ...state, currentPage: Number(evt.target.id) });

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data && data.launches.length / perPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <span
        className={classes.paginationButton + " btn btn-primary mx-1"}
        style={{ opacity: `${number === currentPage ? "1" : ".6"}` }}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </span>
    );
  });

  const renderLaunches =
    currentLaunches &&
    currentLaunches.map((launch, id) => <LaunchItem key={id} {...launch} />);

  return (
    <>
      <p className="h4 mt-4 mx-auto w-50 font-weight-light">
        Launches ({data && data.launches.length + 1})
      </p>
      <MissionKey />
      <div
        className="mx-auto"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "60%",
          paddingBottom: "150px",
          position: "relative",
        }}
      >
        <div className={classes.launchesWrapper}>{renderLaunches}</div>
        <div className={classes.buttonsWrapper}>{renderPageNumbers}</div>
      </div>
    </>
  );
};
