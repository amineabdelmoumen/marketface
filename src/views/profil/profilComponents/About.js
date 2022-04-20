import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function About() {
  const about = useSelector((state) => state.profile);
  const [aboutProfile, setAboutProfile] = useState(about);
  const formatPhoneNumber = (phoneNumber) => {
    let FormatedPhoneNumber = "";
    for (let i = 0; i < phoneNumber.length; i++) {
      if (i % 2 == 0) {
        FormatedPhoneNumber += phoneNumber[i];
      } else {
        FormatedPhoneNumber += phoneNumber[i] + " ";
      }
    }

    return FormatedPhoneNumber;
  };
  const styleText = {
    border: "none",
    resize: "none",
  };

  return (
    <div className="about position-relative">
      <i class="fa-solid fa-ellipsis eclipse"></i>
      <div className="about-flex">
        <div>
          <p className="title">A propos</p>{" "}
        </div>
        <textarea style={styleText} rows={8} col={30} className="text">
          Quis enim aut eum diligat quem metuat, aut eum a quo se metui putet?
          Coluntur tamen simulatione dumtaxat ad tempus. Quod si forte, ut fit
          plerumque, ceciderunt, tum intellegitur quam fuerint inopes amicorum.
          Quod Tarquinium dixisse ferunt, tum exsulantem se intellexisse quos
          fidos amicos habuisset, quos infidos, cum iam neutris gratiam referre
          posset.
        </textarea>
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
            <div className="row d-flex align-items-center mt-3">
              <div className="col-12 col-lg-4 address mt-2 ">
                <div className="d-flex">
                  <img className="local-image" src="/imgs/cafe.svg" alt="" />
                  <textarea
                    className="local-text"
                    style={styleText}
                    col={2}
                    rows={1}
                  >
                    {about.identite.region}
                  </textarea>
                </div>
              </div>

              <div className="col-12 col-lg-4 address mt-2">
                {" "}
                <div className="d-flex align-items-center">
                  <a href="#">
                    <img
                      className="local-image"
                      src="/imgs/communications.svg"
                      alt=""
                    />
                  </a>

                  <textarea
                    col={2}
                    rows={1}
                    style={styleText}
                    className="local-text"
                  >
                    Marketface.com
                  </textarea>
                </div>
              </div>
              <div className="col-12 col-lg-4 address mt-2">
                <div className="d-flex align-items-center">
                  <img className="local-image" src="/imgs/job.svg" alt="" />

                  <textarea
                    col={2}
                    rows={1}
                    style={styleText}
                    className="local-text1"
                    value={formatPhoneNumber(about.identite.telephone)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
