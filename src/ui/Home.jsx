import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import UserName from "../features/user/UserName";
import Button from "./Button";

function Home() {
  const userName = useSelector((store) => store.user.userName);
  return (
    <div className="mt-10 flex flex-col items-center px-4">
      <h1 className="mb-8 text-center text-xl font-semibold text-stone-800 sm:mb-16 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-600">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!userName ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue Ordering ... , {userName}
        </Button>
      )}
    </div>
  );
}

export default Home;
