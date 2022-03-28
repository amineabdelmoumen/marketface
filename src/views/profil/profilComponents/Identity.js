import React, { useState } from "react";
import ContactInfo from "./IdentityComponents/contactInfo";
import FinancialInfo from "./IdentityComponents/financialInfo";
import GeneralInfo from "./IdentityComponents/generalInfo";
import LegalInfo from "./IdentityComponents/legalInfo";

export default function Identity() {
  const [selectedComponent, setSelectedComponent] = useState(1);
  const style = {
    marginRight: "28px",
  };
  const style1 = {
    marginRight: "-10px",
  };
  const style2 = {
    marginRight: "-10px",
  };
  const style3 = {
    right: "48px",
    top: "38px",
  };

  return (
    <div className="row mt-2">
      <div className="col-12 col-md-4">
        <div className="d-flex flex-column">
          <div
            className="border-details p-5"
            onClick={() => setSelectedComponent(1)}
          >
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src={
                    selectedComponent == 1
                      ? "/imgs/greenGeneral.png"
                      : "/imgs/generale.png"
                  }
                  alt=""
                />
              </div>
              <div
                className={
                  selectedComponent == 1
                    ? "h5 text-select fw-normal text-success"
                    : "h5 text-select fw-normal text-primary"
                }
              >
                <p>Informations Generales</p>
              </div>
            </div>
          </div>

          <div
            className="border-details p-5 mt-1"
            onClick={() => setSelectedComponent(2)}
          >
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src={
                    selectedComponent == 2
                      ? "/imgs/greenLegal.png"
                      : "/imgs/legal.png"
                  }
                  alt=""
                />
              </div>
              <div style={style}>
                <p
                  className={
                    selectedComponent == 2
                      ? "h5 text-select fw-normal text-success"
                      : "h5 text-select fw-normal text-primary"
                  }
                >
                  Informations Legals
                </p>
              </div>
            </div>
          </div>
          <div
            className="border-details p-5 mt-1"
            onClick={() => setSelectedComponent(3)}
          >
            <div className="d-flex justify-content-between">
              <div>
                <img
                  src={
                    selectedComponent == 3
                      ? "/imgs/greenFinance.png"
                      : "/imgs/finance.png"
                  }
                  alt=""
                />
              </div>
              <div style={style1}>
                <p
                  className={
                    selectedComponent == 3
                      ? "h5 text-select fw-normal text-success"
                      : "h5 text-select fw-normal text-primary"
                  }
                >
                  Informations Financieres
                </p>
              </div>
            </div>
          </div>
          <div
            className="border-details p-5 mt-1"
            onClick={() => setSelectedComponent(4)}
          >
            <div
              className="d-flex justify-content-between
            "
            >
              <div>
                <img
                  src={
                    selectedComponent == 4
                      ? "/imgs/greenContact.png"
                      : "/imgs/contact.png"
                  }
                  alt=""
                  className="green-icon"
                />
              </div>
              <div style={style2}>
                <p
                  className={
                    selectedComponent == 4
                      ? "h5 me-2 text-select fw-normal text-success"
                      : "h5 me-2 text-select fw-normal text-primary"
                  }
                >
                  contact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-8 form-box position-relative">
        <div className="position-absolute" style={style3}>
          <img src="/imgs/add.png" />
        </div>

        {
          {
            1: <GeneralInfo />,
            2: <LegalInfo />,
            3: <FinancialInfo />,
            4: <ContactInfo />,
          }[selectedComponent]
        }
      </div>
    </div>
  );
}
