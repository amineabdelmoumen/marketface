import React from "react";
import { useSelector } from "react-redux";

export default function CompanyCard() {
  const company = useSelector((state) => state.profile.identite);

  return (
    <div>
      <div className="row mb-2">
        <div className=" col-6 col-md-8">
          <p className="fty">Mon profile</p>
        </div>
      </div>

      <div className="row  " style={{ marginTop: "39px" }}>
        {" "}
        <div className="flex-profile position-relative">
          <div className="xline"></div>
          <i class="fa-solid fa-ellipsis eclipse"></i>
          <img
            className="comp-logo"
            src={`${process.env.REACT_APP_HOST_URL}/${company.logo}`}
            alt=""
          />

          <div className="d-flex justify-content-center ">
            <p className="nom-entreprise gradient ">{company.raison_ou_nom}</p>
          </div>
          <div className="anx d-flex justify-content-center">
            {""}
            {company.annee_creation
              ? `Depuis ${company.annee_creation.substring(0, 4)}`
              : ""}
          </div>

          <p className="slogan">
            Le slogan peut se definir comme une phrase percutante
          </p>
          <div className="d-flex justify-content-around">
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "30px" }}
            >
              <div
                style={{ width: "50px" }}
                className="outer-circle d-flex justify-content-center align-items-center p-2"
              >
                <img
                  style={{ padding: "1px" }}
                  src="/imgs/medal21.png"
                  alt=""
                />
              </div>
              <div>
                <p className="any">lorem ipsum</p>
              </div>
              <div>
                <p className="numfg gradient align-item-center">3</p>
              </div>
            </div>
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "30px" }}
            >
              <div
                style={{ width: "50px" }}
                className="outer-circle d-flex justify-content-center align-items-center p-2"
              >
                <img
                  style={{ padding: "1px" }}
                  src="/imgs/contract21.png"
                  alt=""
                />
              </div>
              <div>
                <p className="any">lorem ipsum</p>
              </div>
              <div>
                {" "}
                <p className=" numfg gradient  align-item-center">9</p>
              </div>
            </div>
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "30px" }}
            >
              <div
                style={{ width: "50px" }}
                className="outer-circle d-flex justify-content-center align-items-center p-2"
              >
                <img style={{ padding: "1px" }} src="/imgs/men21.png" alt="" />
              </div>
              <div>
                <p className="any">lorem ipsum</p>
              </div>
              <div>
                {" "}
                <p className="numfg gradient align-item-center">40</p>
              </div>
            </div>
            <div
              className="d-flex flex-column align-items-center"
              style={{ width: "30px" }}
            >
              <div
                style={{ width: "50px" }}
                className="outer-circle d-flex justify-content-center align-items-center p-2"
              >
                <img
                  style={{ padding: "1px" }}
                  src="/imgs/money21.png"
                  alt=""
                />
              </div>
              <div>
                <p className="any">lorem ipsum</p>
              </div>
              <div>
                {" "}
                <p className="numfg  gradient align-item-center">+99k</p>
              </div>
            </div>

            {/* <div className="outer-circle d-flex justify-content-center align-items-center p-2">
              <img style={{ padding: "3px" }} src="/imgs/medal21.png" alt="" />
            </div>
            <div className="outer-circle d-flex justify-content-center align-items-center p-2">
              <img style={{ padding: "3px" }} src="/imgs/medal21.png" alt="" />
            </div>
            <div className="outer-circle d-flex justify-content-center align-items-center p-2">
              <img style={{ padding: "3px" }} src="/imgs/medal21.png" alt="" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
