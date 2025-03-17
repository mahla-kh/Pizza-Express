import { useNavigate, useRouteError } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      {/* <p>{error}</p> */}
      <p>{error.data || error.massage || error.TypeError}</p>
      <button
        className="text-sm text-blue-500 transition-colors duration-300 hover:text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default Error;
