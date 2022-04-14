import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
          Quis enim aut eum diligat quem metuat, aut eum a quo se metui putet?
          Coluntur tamen simulatione dumtaxat ad tempus. Quod si forte, ut fit
          plerumque, ceciderunt, tum intellegitur quam fuerint inopes amicorum.
          Quod Tarquinium dixisse ferunt, tum exsulantem se intellexisse quos
          fidos amicos habuisset, quos infidos, cum iam neutris gratiam referre
          posset.
        </div>
        <h5 className="activite-title">Activities</h5>
        <div className="px-4 mt-2">
          <div className="row">
            {about.cible.activites.map((activite) => {
              return (
                <p className="activite col-12 col-md-4 mt-3 me-4 px-4">
                  {activite}
                </p>
              );
            })}
          </div>
          <div className="form-area">
            <div className="row  mt-3">
              <div className="col-12 col-lg-4 address mt-2 ">
                <div className="d-flex">
                  <img className="local-image" src="/imgs/cafe.svg" alt="" />
                  <span className="local-text">{about.identite.region}</span>
                </div>
              </div>

              <div className="col-12 col-lg-4 address mt-2">
                {" "}
                <div className="d-flex">
                  <img
                    className="local-image"
                    src="/imgs/communications.svg"
                    alt=""
                  />

                  <span>
                    {" "}
                    <a href="" className="local-text">
                      Marketface.com
                    </a>
                  </span>
                </div>
              </div>
              <div className="col-12 col-lg-4 address mt-2">
                <div className="d-flex">
                  <img className="local-image" src="/imgs/job.svg" alt="" />
                  <span className="local-text1">
                    {about.identite.telephone}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-end gap-3 mt-3">
              <button
                type="submit"
                className="btn btn-success contact text-white rounded-pill px-4"
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
