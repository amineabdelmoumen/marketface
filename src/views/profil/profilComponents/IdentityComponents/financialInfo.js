import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCompany } from "../../../../lib/crud";
import "../../styles.scss";
export default function FinancialInfo() {
  const style2 = {
    bottom: "0",
    right: "300px",
    color: "white",
    padding: "8px",
    borderRadius: "8px",
  };
  const style1 = {
    color: "#00b6ff",
    fontSize: "15px",
  };
  const chaiffreDafaireList = ["< 10 MDhs", "< 75 MDhs", "> 75 MDhs"];
  const dispatch = useDispatch();
  const profil = useSelector((state) => state.profile);
  const [showButton, setShowButton] = useState(0);
  const [identitie, setIdentitie] = useState(profil.identite);

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
  const style = "fw-bold";
  return (
    <div className="row py-4 px-1 text-font position-relative">
      <div className="identite-form">
        <div className="col-md-8 offset-md-3 py-5 ">
          <div className="row ">
            <div className="col-md-6 mt-2">
              <div>
                <p style={style1}>capital:</p>
              </div>
            </div>
            <div className="col-md-6 mt-2 form-boxes">
              <div>
                <input
                  type="number"
                  value={identitie.capital}
                  onChange={(e) => {
                    handleInputChange("capital", e);
                  }}
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 mt-2">
              <div>
                <p style={style1}>Chifre d'affaire :</p>
              </div>
            </div>
            <div className=" col-md-6 mt-2 form-boxes">
              <div>
                <p></p>
                <select
                  name="chiffre_affaire"
                  id="chiffre_affaire"
                  defaultValue={identitie.chiffre_affaire}
                  onChange={(e) => handleInputChange("chiffre_affaire", e)}
                >
                  {chaiffreDafaireList.map((opt) => (
                    <option value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 mt-2">
              <div>
                <p style={style1}>Bilan:</p>
              </div>
            </div>
            <div className="col-md-6 mt-2">
              <div>
                <p>--------</p>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6 mt-2">
              <div>
                <p style={style1}>cote en bourse :</p>
              </div>
            </div>
            <div className="col-md-6 mt-2">
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckChecked"
                    checked={true}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckChecked"
                  ></label>
                </div>
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
    </div>
  );
}
