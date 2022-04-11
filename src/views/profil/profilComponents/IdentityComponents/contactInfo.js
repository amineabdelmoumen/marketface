import React, { useState } from "react";
import { useSelector } from "react-redux";
import { saveCompany } from "../../../../lib/crud";

export default function ContactInfo() {
  const profil = useSelector((state) => state.profile);
  const [showButton, setShowButton] = useState(0);
  const [identitie, setIdentitie] = useState(profil.identite);
  const style1 = {
    color: "#00b6ff",
    fontSize: "15px",
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
        <div>
          {showButton == 1 ? (
            <button
              className="bt btn-success position-absolute"
              onClick={handleOnSave}
              style={style2}
            >
              Save Changes
            </button>
          ) : (
            ""
          )}
        </div>
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
                onChange={(e) => handleInputChange("siege_social", e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}