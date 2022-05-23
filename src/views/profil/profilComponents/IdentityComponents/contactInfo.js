import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { saveCompany } from "../../../../lib/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactInfo() {
  const toastId = useRef(null);
  const profil = useSelector((state) => state.profile);
  const [showButton, setShowButton] = useState(0);
  const [identitie, setIdentitie] = useState(profil.identite);

  const style1 = {
    font: "normal normal normal 14px/11px Montserrat",
    letterspacing: "0px",
    color: "#707070",
    opacity: 1,
    marginTop: "10px",
  };
  const InputStyle = {
    font: "normal normal normal 14px/11px Montserrat",
    letterspacing: "0px",
    color: "#707070",
    opacity: 1,
  };

  const handleInputChange = (field, e) => {
    setShowButton(1);
    let identite = { ...identitie };
    identite[field] = e.target.value;
    setIdentitie(identite);
  };

  const toastPending = () =>
    (toastId.current = toast("L'ajout de l'article est en cours ......", {
      autoClose: 10000,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
    }));

  const toastSuccessUpdate = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Vos Infos financiéres ont été Modifié  avec succés",
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
      toastSuccessUpdate();
      console.log("compay updated");
    } catch (err) {
      toastError();
    }

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
          <div className="col-md-5 mt-2 ">
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
        <div className="row mt-3 form-boxes">
          <div className="col-md-3 mt-2">
            <div>
              <p style={style1}>Site Web :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <input
              onChange={(e) => handleInputChange("website", e)}
              value={
                identitie?.website != null
                  ? `${identitie?.website.toLowerCase()}`
                  : ""
              }
            />
          </div>
        </div>
        <div className="row mt-3 form-boxes">
          <div className="col-md-3 mt-2">
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
      <ToastContainer limit={1} />
    </div>
  );
}
