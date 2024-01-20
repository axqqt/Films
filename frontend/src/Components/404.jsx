import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={{ margin: "2%" }}>
      <h1>Weird, but this is an unknown path</h1>
      <Link to="/">Click here to go back to Home!</Link>
    </div>
  );
};

export default PageNotFound;
