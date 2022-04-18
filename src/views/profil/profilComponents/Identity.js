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
    <div className="row mt-2">
      <div className="col-12 col-md-4">
        <div className="d-flex flex-column">
          <div
            className={
              selectedComponent == 1
                ? "border-details clicked py-4"
                : "border-details py-4"
            }
            onClick={() => setSelectedComponent(1)}
          >
            <div className="d-flex justify-content-center">
              <div style={{ width: "75px" }}>
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
                    ? " text-select cursor-pointer fw-normal text-success"
                    : " text-select cursor-pointer fw-normal text-primary"
                }
              >
                <p>Informations Generales</p>
              </div>
            </div>
          </div>

          <div
            className={
              selectedComponent == 2
                ? "border-details clicked py-4"
                : "border-details py-4"
            }
            onClick={() => setSelectedComponent(2)}
          >
            <div className="d-flex justify-content-center">
              <div style={{ width: "75px" }}>
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
                      ? " text-select cursor-pointer fw-normal text-success"
                      : " text-select cursor-pointer fw-normal text-primary"
                  }
                >
                  Informations Legals
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              selectedComponent == 3
                ? "border-details clicked py-4"
                : "border-details py-4"
            }
            onClick={() => setSelectedComponent(3)}
          >
            <div className="d-flex justify-content-center">
              <div style={{ width: "75px" }}>
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
                      ? " text-select cursor-pointer fw-normal text-success "
                      : " text-select cursor-pointer fw-normal text-primary"
                  }
                >
                  Informations Financieres
                </p>
              </div>
            </div>
          </div>
          <div
            className={
              selectedComponent == 4
                ? "border-details clicked py-4"
                : "border-details py-4"
            }
            onClick={() => setSelectedComponent(4)}
          >
            <div
              className="d-flex justify-content-center
            "
            >
              <div style={{ width: "75px" }}>
                <img
                  src={
                    selectedComponent == 4
                      ? "/imgs/greenContact.png"
                      : "/imgs/contact.png"
                  }
                  alt=""
                />
              </div>
              <div style={style2}>
                <p
                  className={
                    selectedComponent == 4
                      ? " text-select  cursor-pointer fw-normal text-success "
                      : " text-select cursor-pointer fw-normal text-primary"
                  }
                >
                  Contact <div style={widthStyle}></div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-8 form-box position-relative">
        {
          {
            1: <GeneralInfo />,
            2: {
              0: <LegalInfo setLegalcomponent={setLegalcomponent} />,
              1: <LegalInformPat2 setLegalcomponent={setLegalcomponent} />,
            }[legalComponent],
            3: <FinancialInfo />,
            4: <ContactInfo />,
          }[selectedComponent]
        }
      </div>
    </div>
  );
}
