import React from "react";

export default function About() {
  return (
    <div className="about">
      <div className="about-flex">
        <div className="title">
          {" "}
          <p>A props</p>{" "}
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
            <div className="comp-info">
              <div className="address">
                <img className="local-image" src="/imgs/cafe.svg" alt="" />
                <span className="local-text">Casablanca,Maroc</span>
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
                <span className="local-text1">06 00 00 00 00</span>
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
