// import { Link } from "react-router-dom";

import { Link } from "react-router-dom";

function LinkButton({ children, to }) {
  return (
    <Link to={to}>
      <span className="text-sm text-blue-500 hover:text-blue-600 hover:underline">
        {children}
      </span>
    </Link>
  );
}

export default LinkButton;
