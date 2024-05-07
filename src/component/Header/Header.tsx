import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
  return (
    <div className="nav">
      <Link to={"/"} className="nav__text">
        Home
      </Link>
      <Link to={"/result"} className="nav__text">
        Result
      </Link>
      <Link to={"/standings"} className="nav__text">
        Standings
      </Link>
    </div>
  );
};

export default Header;
