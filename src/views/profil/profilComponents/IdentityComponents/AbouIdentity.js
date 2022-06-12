import React, { useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function AbouIdentity({ identitySection, setIdentitySection }) {
  const percentage = 66;

  return (
    <div>
      <div className="row mb-2">
        <div className=" wrapper col-4 col-md-6">
          <div className="d-flex justify-content-center">
            {" "}
            <p style={{ fontSize: "16px" }} className="activite ">
              Identité
            </p>
          </div>
        </div>
      </div>
      <div className="row  " style={{ marginTop: "14px" }}>
        {" "}
        <div
          className="flex-profile position-relative"
          style={{ padding: "27px" }}
        >
          <div className="prog-bar position-relative">
            <div className=" d-flex " style={{ marginTop: "25px" }}>
              <div
                className=""
                style={{
                  width: "200px",
                  marginLeft: "20px",
                  marginRight: "3px",
                }}
              >
                <div
                  className="d-flex justify-content-end"
                  style={{ width: "80%" }}
                >
                  <CircularProgressbar
                    value={3}
                    text={`${percentage}%`}
                    maxValue={4}
                    circleRatio={1}
                    strokeWidth={6}
                    styles={buildStyles({
                      textColor: "white",
                      pathColor: "white",
                    })}
                  />
                  ;
                </div>
              </div>

              <div className="d-flex flex-column">
                <div className="pr-cmp" style={{}}>
                  Profil complet
                </div>
                <div
                  className="pr-cmp"
                  style={{
                    fontWeight: "500",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  Complétez votre profil pour débloquer toutes les
                  fonctionnalités
                </div>
              </div>
            </div>

            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "25px" }}
            >
              <div className="idn-vrf d-flex justify-content-center px-4 py-2">
                <p className="vrf-txt">Vérifier l'identité</p>
              </div>
            </div>
          </div>

          <div className="position-relative" style={{ marginTop: "37px" }}>
            <div className="d-flex  " onClick={() => setIdentitySection(1)}>
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/user.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              {identitySection == 1 ? (
                <div className="d-flex  align-items-center">
                  <p className="title-identite" style={{ fontSize: "14px" }}>
                    Information generales
                  </p>
                </div>
              ) : (
                <div className="d-flex  align-items-center">
                  <p className="txg" style={{ fontSize: "14px" }}>
                    Information generales
                  </p>
                </div>
              )}
            </div>
            <div className="iden-line"></div>
            <div
              className="d-flex"
              style={{ marginTop: "40px" }}
              onClick={() => setIdentitySection(2)}
            >
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/legal21.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {identitySection == 2 ? (
                <div className="d-flex  align-items-center">
                  <p className="title-identite" style={{ fontSize: "14px" }}>
                    Informations légales
                  </p>
                </div>
              ) : (
                <div className="d-flex  align-items-center">
                  <p className="txg" style={{ fontSize: "14px" }}>
                    Informations légales
                  </p>
                </div>
              )}
            </div>
            <div className="iden-line" style={{ top: "183px" }}></div>
            <div
              className="d-flex "
              style={{ marginTop: "40px" }}
              onClick={() => setIdentitySection(3)}
            >
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/finance21.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {identitySection == 3 ? (
                <div className="d-flex  align-items-center">
                  <p className="title-identite" style={{ fontSize: "14px" }}>
                    Informations financières
                  </p>
                </div>
              ) : (
                <div className="d-flex  align-items-center">
                  <p className="txg" style={{ fontSize: "14px" }}>
                    Informations financières
                  </p>
                </div>
              )}
            </div>
            <div className="iden-line" style={{ top: "296px" }}></div>
            <div
              className="d-flex "
              style={{ marginTop: "40px" }}
              onClick={() => setIdentitySection(4)}
            >
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/contact21.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              {identitySection == 4 ? (
                <div className="d-flex  align-items-center">
                  <p className="title-identite" style={{ fontSize: "14px" }}>
                    Contact
                  </p>
                </div>
              ) : (
                <div className="d-flex  align-items-center">
                  <p className="txg" style={{ fontSize: "14px" }}>
                    Contact
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
