import React, { useState } from "react";
import { useSelector } from "react-redux";
import regions from "../../../../lib/constants/regions";
import villes from "../../../../lib/constants/villes";
import types from "../../../../lib/constants/types";
import years from "../../../../lib/constants/years";
import statusList from "../../../../lib/constants/status";
import { saveCompany } from "../../../../lib/crud";
import { Navigate } from "react-router-dom";
export default function LegalInfo({ setLegalcomponent }) {
  const style1 = {
    font: "normal normal 600 15px/15px Montserrat",
    letterSspacing: "0px",
    color: "#707070",
    opacity: 1,
  };
  const InputStyle = {
    font: "normal normal 600 15px/15px Montserrat",
    letterSspacing: "0px",
    color: "#707070",
    opacity: 1,
  };
  const profil = useSelector((state) => state.profile.identite);

  const organismeSize = ["Start-up", "TPE", "PME", "PMI", "GE"];
  const nombreEmployes = ["De 1 à 10", "De 10 à 250", "Plus de 250"];

  const style = "fw-bold";

  const [identitie, setIdentitie] = useState(profil);
  const [showUpdateButton, setShowUpdateButton] = useState(0);
  const style2 = {
    bottom: "0",
    right: "300px",
    color: "white",
    padding: "8px",
    borderRadius: "8px",
  };

  const handleInputChange = (field, e) => {
    setShowUpdateButton(1);
    let identite = { ...identitie };
    identite[field] = e.target.value;
    setIdentitie(identite);
  };
  const handleOnSave = () => {
    const token = localStorage.getItem("token");
    saveCompany(identitie, token);
    console.log("compay updated");
    Navigate("/profil");
    //Make api request with saveCompany
  };
  return (
    <div className="row py-4 px-1 identite-form">
      <div>
        {" "}
        <img
          src="/imgs/next.png"
          onClick={() => setLegalcomponent(1)}
          className="next-btn cursor-pointer"
          alt=""
        />
      </div>

      <div className="row form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Raison Social :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <input
            type="text"
            id="prenom_nom"
            name="prenom_nom"
            style={InputStyle}
            onChange={(e) => handleInputChange("raison_ou_nom", e)}
            defaultValue={identitie.raison_ou_nom}
          />
        </div>
      </div>
      <div className="row mt-4 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Année de Creation :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <select
            name="annee"
            id="annee"
            style={InputStyle}
            onChange={(e) => handleInputChange("annee_creation", e)}
            defaultValue={identitie.annee_creation}
          >
            {years.map((opt) => (
              <option value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-4 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Statut :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <select
              name="statut"
              id="statut"
              style={InputStyle}
              onChange={(e) => handleInputChange("statut", e)}
              defaultValue={identitie.statut}
            >
              {statusList.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-4 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Taille d'Organisme :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <select
              name="organisme_taille"
              id="organisme_taille"
              style={InputStyle}
              onChange={(e) => handleInputChange("taille", e)}
              defaultValue={identitie.taille}
            >
              {organismeSize.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-4 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Nombres D'employés:</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <select
              name="nombre_employés"
              id="nombre_employés"
              style={InputStyle}
              onChange={(e) => handleInputChange("nombre_employes", e)}
              defaultValue={identitie.nombre_employes}
            >
              {nombreEmployes.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-1 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Type d'organisme :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <select
              name="organisme_type"
              id="organisme_type"
              onChange={(e) => handleInputChange("type", e)}
              defaultValue={identitie.type}
              style={InputStyle}
            >
              {types.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-4 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Pays:</p>
          </div>
        </div>
        <div className="col-md-5 mt-2">
          <div>
            <input
              type="text"
              id="pays"
              name="pays"
              defaultValue={identitie.pays}
              style={InputStyle}
            />
          </div>
        </div>
        <div className="col-md-1 mt-2"></div>
      </div>

      <div className="row mt-4 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>ICE :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <input
              type="number"
              id="ice"
              name="ice"
              onChange={(e) => handleInputChange("ice", e)}
              defaultValue={identitie.ice}
              style={InputStyle}
            />
          </div>
        </div>
      </div>

      <div className="row mt-4 mb-1 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Région :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <select
              name="region"
              id="region"
              defaultValue={identitie.region}
              onChange={(e) => handleInputChange("region", e)}
              style={InputStyle}
            >
              {regions.map((region) => {
                return <option value={region}>{region}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-1 form-boxes">
        <div className="col-md-6 mt-2">
          <div>
            <p style={style1}>Ville :</p>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div>
            <select
              name="ville"
              id="ville"
              defaultValue={identitie.ville}
              onChange={(e) => handleInputChange("ville", e)}
              style={InputStyle}
            >
              {villes[identitie.region].map((ville) => {
                return <option value={ville}>{ville}</option>;
              })}
            </select>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        {showUpdateButton == 1 ? (
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
  );
}
