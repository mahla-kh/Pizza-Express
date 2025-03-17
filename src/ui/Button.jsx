import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClickHandler }) {
  const base =
    "rounded-full bg-yellow-400  font-semibold text-stone-800 transition-colors hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-offset-1";
  const styles = {
    primary: base + " px-4 py-3",
    small: base + " px-2.5 py-1",
    secondary:
      "rounded-full hover:bg-stone-300 border border-stone-300 px-2.5 py-2 font-semibold text-stone-300 hover:text-stone-800 transition-colors focus:bg-stone-300 focus:outline-none focus:ring focus:text-stone-800 focus:ring-stone-300 focus:ring-offset-2",
  };
  if (to)
    return (
      <Link onClick={onClickHandler} className={styles[type]} to={to}>
        {children}
      </Link>
    );

  return (
    <button
      onClick={onClickHandler}
      className={styles[type]}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
