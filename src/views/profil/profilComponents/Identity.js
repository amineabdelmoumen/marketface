import React, { useState, useEffect } from "react";
import ContactInfo from "./IdentityComponents/contactInfo";
import FinancialInfo from "./IdentityComponents/financialInfo";
import GeneralInfo from "./IdentityComponents/generalInfo";
import LegalInfo from "./IdentityComponents/legalInfo";
import LegalInformPat2 from "./IdentityComponents/legalInformPat2";

export default function Identity() {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const [legalComponent, setLegalcomponent] = useState(0);
  const style = {
    marginRight: "28px",
  };
  const style1 = {
    marginRight: "-10px",
    fontSize: "20px",
  };
  const style2 = {
    marginRight: "-10px",
  };
  const widthStyle = {
    width: "150px",
  };

  return (
    <div className="row" style={{ marginLeft: "7px", marginTop: "56px" }}>
      {" "}
      {/* <div className="about position-relative">
        <i class="fa-solid fa-ellipsis eclipse"></i>
        <div className="about-flex">
          <div className="col-md-5 position-relative">
            <div className="d-flex  ">
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/user.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex  align-items-center">
                <p className="txg">Information generales</p>
              </div>
            </div>
            <div className="iden-line"></div>
            <div className="d-flex" style={{ marginTop: "40px" }}>
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/legal21.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex  align-items-center">
                <p className="txg">Informations légales</p>
              </div>
            </div>
            <div className="iden-line" style={{ top: "183px" }}></div>
            <div className="d-flex " style={{ marginTop: "40px" }}>
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/finance21.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex  align-items-center">
                <p className="txg">Informations financières </p>
              </div>
            </div>
            <div className="iden-line" style={{ top: "296px" }}></div>
            <div className="d-flex " style={{ marginTop: "40px" }}>
              <div className="circles" style={{ width: "90px" }}>
                <div className="circle1">
                  <div className="circle2">
                    <div className="d-flex justify-content-center align-items-center circle3">
                      <img src="/imgs/contact21.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex  align-items-center">
                <p className="txg">Contact</p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
