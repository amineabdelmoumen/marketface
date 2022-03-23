import React from "react";

export default function CompanyCard() {
  return (
    <div className="flex-profile">
      <img className="comp-logo" src="/imgs/comp-logo.png" alt="" />
      <img className="office" src="/imgs/office-building.svg" alt="" />

      <p className="nom-entreprise">Nom de L'entreprise</p>

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
