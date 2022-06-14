import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import regions from "../../../../lib/constants/regions";
import villes from "../../../../lib/constants/villes";
import types from "../../../../lib/constants/types";
import years from "../../../../lib/constants/years";
import statusList from "../../../../lib/constants/status";
import { saveCompany } from "../../../../lib/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";
import { Navigate } from "react-router-dom";
import { setIdentite } from "../../../../store/profileSlice";
export default function LegalInfo({ setLegalcomponent }) {
  const toastId = useRef(null);
  const dispatch = useDispatch();
  const identitie = useSelector((state) => state.profile.identite);

  const organismeSize = ["Start-up", "TPE", "PME", "PMI", "GE"];
  const nombreEmployes = ["De 1 à 10", "De 10 à 250", "Plus de 250"];

  const style = "fw-bold";

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
    dispatch(setIdentite(identite));
  };
  const toastPending = () =>
    (toastId.current = toast(
      "L'Enregistrement des modification est en cours ......",
      {
        autoClose: 10000,
        type: toast.TYPE.INFO,
        position: toast.POSITION.TOP_CENTER,
      }
    ));

  const toastSuccessUpdate = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Vos Infos légales ont été Modifié  avec succés",
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastError = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Echec de Modification !",
      autoClose: 1500,
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER,
    }));

  const handleOnSave = async () => {
    try {
      toastPending();
      const token = localStorage.getItem("token");

      const res = await saveCompany(identitie, token);
      console.log("response is", res);
      toastSuccessUpdate();

      console.log("compay updated");
    } catch (error) {
      toastError();
    }

    //Make api request with saveCompany
  };
  return (
    <form className="container" name="form-identite" id="form-identite-gen">
      {/* <div className="page_number">1/2</div> */}

      <div className="form-identite-info d-block mt-3">
        <div className="row form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>Raison Social :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <input
              type="text"
              id="prenom_nom"
              name="prenom_nom"
              onChange={(e) => handleInputChange("raison_ou_nom", e)}
              value={identitie.raison_ou_nom}
            />
          </div>
        </div>
        <div className="row mt-4 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>Année de Creation :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <select
              name="annee"
              id="annee"
              onChange={(e) => handleInputChange("annee_creation", e)}
              value={identitie.annee_creation.substring(0, 4)}
            >
              {years.map((opt) => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-4 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>Statut :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <select
                name="statut"
                id="statut"
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
          <div className="col-md-4 mt-2">
            <div>
              <label>Taille d'Organisme :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <select
                name="organisme_taille"
                id="organisme_taille"
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
          <div className="col-md-4 mt-2">
            <div>
              <label>Nombres D'employés:</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <select
                name="nombre_employés"
                id="nombre_employés"
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
          <div className="col-md-4 mt-2">
            <div>
              <label>Type d'organisme :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <select
                name="organisme_type"
                id="organisme_type"
                onChange={(e) => handleInputChange("type", e)}
                defaultValue={identitie.type}
              >
                {types.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-4 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>Pays:</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <input
                type="text"
                id="pays"
                name="pays"
                defaultValue={identitie.pays}
              />
            </div>
          </div>
          <div className="col-md-1 mt-2"></div>
        </div>

        <div className="row mt-4 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>ICE :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <input
                type="number"
                id="ice"
                name="ice"
                onChange={(e) => handleInputChange("ice", e)}
                defaultValue={identitie.ice}
              />
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-1 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>Région :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <select
                name="region"
                id="region"
                defaultValue={identitie.region}
                onChange={(e) => handleInputChange("region", e)}
              >
                {regions.map((region) => {
                  return <option value={region}>{region}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="row mt-3 mb-1 form-boxes">
          <div className="col-md-4 mt-2">
            <div>
              <label>Ville :</label>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <select
                name="ville"
                id="ville"
                defaultValue={identitie.ville}
                onChange={(e) => handleInputChange("ville", e)}
              >
                {villes[identitie.region].map((ville) => {
                  return <option value={ville}>{ville}</option>;
                })}
              </select>
            </div>
          </div>
        </div>

        {showUpdateButton == 1 ? (
          <div className="buttons d-flex justify-content-end">
            <div
              className=" d-flex justify-content-center  sv-btn col-12 col-md-2 "
              onClick={handleOnSave}
            >
              <p style={{ fontSize: "16px" }} className="suivant-iden">
                Enregistrer
              </p>
            </div>
          </div>
        ) : (
          ""
        )}

        <ToastContainer limit={1} />
      </div>
    </form>
  );
}
