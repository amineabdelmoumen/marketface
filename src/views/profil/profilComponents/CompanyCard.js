import React from "react";
import { useSelector } from "react-redux";

export default function CompanyCard() {
  const company = useSelector((state) => state.profile.identite);
  return (
    <div className="flex-profile">
      <img
        className="comp-logo"
        src={`${process.env.REACT_APP_HOST_URL}/${company.logo}`}
        alt=""
      />
      <img className="office" src="/imgs/office-building.svg" alt="" />

      <p className="nom-entreprise">{company.raison_ou_nom}</p>

      <p className="slogan">
        Le slogan peut se definir comme une phrase percutante
      </p>
      <div className="badges">
        <div className="badges-container">
          <div className="elem">
            <img className="img-element" src="/imgs/medal.svg" alt="" />
          </div>

          <span className="badge rounded-pill bg-success">3</span>
        </div>
        <div className="badges-container">
          <div className="elem">
            <img className="img-element" src="/imgs/contract.svg" alt="" />
          </div>
          <span className="badge rounded-pill bg-orange-500">3</span>
        </div>
        <div className="badges-container">
          <div className="elem">
            <img className="img-element" src="/imgs/men.svg" alt="" />
          </div>

          <span className="badge rounded-pill bg-indigo-600 ">3</span>
        </div>
        <div className="badges-container">
          <div className="elem">
            <img className="img-element" src="/imgs/money.svg" alt="" />
          </div>

          <span className="badge rounded-pill bg-danger">3</span>
        </div>
      </div>
    </div>
  );
}
