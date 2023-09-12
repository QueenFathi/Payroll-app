import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div
      className="container-fluid d-flex justify-content-between align-items-center flex-column"
      style={{ marginTop: "20vh" }}
    >
      <h1>Error: Page Not Found</h1>
      <pre>404 - Sorry, this page doesn't exists</pre>
      <Link to={"/"}>Home</Link>
    </div>
  );
}
