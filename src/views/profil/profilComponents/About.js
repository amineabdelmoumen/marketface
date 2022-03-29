import React from "react";
import { useSelector } from "react-redux";

export default function About() {
  const about = useSelector((state) => state.profile.identite);
  console.log(about.telephonne);
  return (
    <div className="about">
      <div className="about-flex">
        <div className="title">
          {" "}
          <p>A propos</p>{" "}
        </div>
        <div className="text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo,
          consequatur. Vitae quod minus voluptatem numquam.
        </div>
        <div className="form-area">
          <form action="" className="form">
            <input type="text" className="input" placeholder="Section" />
            <input type="text" className="input" placeholder="Section" />
            <input type="text" className="input" placeholder="Section" />
            <input type="text" className="input1" placeholder="Section" />
            <div className="d-flex flex-column flex-lg-row justify-content-around gap-4 mt-3 comp-info">
              <div className="address ">
                <img className="local-image" src="/imgs/cafe.svg" alt="" />
                <span className="local-text">{about.region}</span>
              </div>
              <div className="address">
                {" "}
                <img
                  className="local-image"
                  src="/imgs/communications.svg"
                  alt=""
                />
                <span className="local-text">Marketface.com</span>
              </div>
              <div className="address">
                {" "}
                <img className="local-image" src="/imgs/job.svg" alt="" />
                <span className="local-text1">{about.telephone}</span>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-end gap-3 mt-3">
              <button
                type="submit"
                className="btn btn-outline-primary rounded-pill"
              >
                Proumouvoir votre marque
              </button>
              <button type="submit" className="btn btn-primary rounded-pill">
                Lancer une Simulation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
