import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        placeholder="search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-2 py-1 transition-all duration-300 focus:outline-offset-1 focus:outline-yellow-400 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
