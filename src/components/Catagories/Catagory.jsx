import { catagoryInfos } from "./CatagoriesFullInfo";
import classes from "./catagory.module.css";
import {Link} from "react-router-dom"

function Catagory() {
  return (
    <section className={classes.category__container}>
      {catagoryInfos.map((infos) => (
        <div className={classes.category} key={infos.name}>
          <Link to={`/category/${infos.name}`}>
            <span>
              <h2>{infos.title}</h2>
            </span>
            <img src={infos.imageLink} alt={infos.title} />
            <p>Shop Now</p>
          </Link>
        </div>
      ))}
    </section>
  );
}

export default Catagory;