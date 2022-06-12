import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCompany } from "../../../../lib/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setIdentite } from "../../../../store/profileSlice";

export default function ContactInfo() {
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const identitie = useSelector((state) => state.profile.identite);
  const [showButton, setShowButton] = useState(0);

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
    dispatch(setIdentite(identite));
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
    <form className="container" name="form-identite" id="form-identite-gen">
      {/* <div className="page_number">1/2</div> */}

      <div className="form-identite-info d-block mt-3">
        <div className="row form-boxes">
          <div className="col-md-5 mt-2 ">
            <div>
              <label>Numéro du Téléphone :</label>
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
        <div className="row mt-3 form-boxes">
          <div className="col-md-3 mt-2">
            <div>
              <label>Site Web :</label>
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
              <label>Adresse:</label>
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
        {showButton == 1 ? (
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
      </div>
      <ToastContainer limit={1} />
    </form>
  );
}
