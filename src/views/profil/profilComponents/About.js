import React from "react";
import { useSelector } from "react-redux";

export default function About() {
  const about = useSelector((state) => state.profile);

  console.log(about.telephonne);
  return (
    <div className="about">
      <div className="about-flex">
        <div className="title">
          <p>A propos</p>{" "}
        </div>
        <div className="text">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo,
          consequatur. Vitae quod minus voluptatem numquam.
        </div>
        <h5 className="text-black-50 mt-2">Activities</h5>
        <div className="px-4 mt-2">
          <div className="row">
            <p className="activite col-12 col-md-3 mt-3 me-4 my-1 px-4">
              activite x
            </p>{" "}
            <p className="activite col-12 col-md-3 mt-3 me-4 px-4">
              activite y
            </p>{" "}
            <p className="activite col-12 col-md-3 mt-3 me-4 px-4">activiteZ</p>
            <p className="activite col-12 col-md-3 mt-3 me-4 my-1 px-4">
              activite x
            </p>{" "}
            <p className="activite col-12 col-md-3 mt-3 me-4 px-4">
              activite y
            </p>{" "}
            {/* {about.cible.activites.map((activite) => {
              return (
               
              );
            })} */}
          </div>
          <div className="form-area">
            <div className="d-flex flex-column align-items-around gap-3  mt-5 comp-info">
              <div className="address ">
                <img className="local-image" src="/imgs/cafe.svg" alt="" />
                <span className="local-text">{about.identite.region}</span>
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
                <span className="local-text1">{about.identite.telephone}</span>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-end gap-3 mt-3">
              <button
                type="submit"
                className="btn btn-success text-white rounded-pill px-4"
              >
                Contacter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
