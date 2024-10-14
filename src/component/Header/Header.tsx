import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <header className="nav">
      <Link to={"/"} className="nav__text">
        Home
      </Link>
      <Link to={"/result"} className="nav__text">
        Result
      </Link>
      {/* <Link to={"/standings"} className="nav__text">
        Standings
      </Link> */}
    </header>
  );
};

export default Header;
