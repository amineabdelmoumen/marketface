import React, { useState } from "react";
import { useSelector } from "react-redux";
import { saveCompany } from "../../../../lib/crud";

export default function ContactInfo() {
  const profil = useSelector((state) => state.profile);
  const [showButton, setShowButton] = useState(0);
  const [identitie, setIdentitie] = useState(profil.identite);
  const style1 = {
    font: "normal normal 600 15px/15px Montserrat",
    letterSspacing: "0px",
    color: "#707070",
    opacity: 1,
  };
  const InputStyle = {
    font: "normal normal 600 14px/15px Montserrat",
    letterSspacing: "0px",
    color: "#707070",
    opacity: 1,
  };

  const handleInputChange = (field, e) => {
    setShowButton(1);
    let identite = { ...identitie };
    identite[field] = e.target.value;
    setIdentitie(identite);
  };

  const handleOnSave = () => {
    const token = localStorage.getItem("token");
    saveCompany(identitie, token);
    console.log("compay updated");
    //Make api request with saveCompany
  };

  const style2 = {
    bottom: "0",
    right: "300px",
    color: "white",
    padding: "8px",
    borderRadius: "8px",
  };

  const style = "fw-bold";
  return (
    <div className="row py-5 px-1 mt-5">
      <div className="col-md-8 offset-md-3 py-4 identite-form">
        <div className="row form-boxes">
          <div className="col-md-6 mt-2 ">
            <div>
              <p style={style1}>Numéro du Téléphone :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <input
                type="text"
                value={identitie.telephone}
                style={InputStyle}
                onChange={(e) => handleInputChange("telephone", e)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 form-boxes">
          <div className="col-md-6 mt-2">
            <div>
              <p style={style1}>Site Web :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>----------</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <p style={style1}>Adresse:</p>
            </div>
          </div>
          <div className="col-md-6 offset-md-2 mt-2">
            <div>
              <input
                type="text"
                value={identitie.siege_social}
                style={InputStyle}
                onChange={(e) => handleInputChange("siege_social", e)}
              />
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          {showButton == 1 ? (
            <button
              type="button"
              className="btn pointer btn-success text-white m-4 rounded-pill px-4"
              onClick={handleOnSave}
            >
              Save Changes
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
