import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCompany } from "../../../../lib/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles.scss";
export default function FinancialInfo() {
  const toastId = useRef(null);
  const style2 = {
    bottom: "0",
    right: "300px",
    color: "white",
    padding: "8px",
    borderRadius: "8px",
  };
  const InputStyle = {
    font: "normal normal normal 14px/11px Montserrat",
    letterspacing: "0px",
    color: "#707070",
    opacity: 1,
  };
  const style1 = {
    font: "normal normal normal 14px/11px Montserrat",
    letterspacing: "0px",
    color: "#707070",
    opacity: 1,
    marginTop: "10px",
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
    } catch (err) {
      toastError();
    }

    //Make api request with saveCompany
  };
  const style = "fw-bold";
  return (
    <div className="row py-4 px-1 text-font position-relative">
      <div className="identite-form">
        <div className="col-md-8 offset-md-3 py-5 ">
          <div className="row ">
            <div className="col-md-3 mt-2">
              <div>
                <p style={style1}>capital:</p>
              </div>
            </div>
            <div className="col-md-6 mt-2 form-boxes">
              <div>
                <input
                  style={InputStyle}
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
          <div className="row mt-4">
            <div className="col-md-3 mt-2">
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
                  style={InputStyle}
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
          <div className="row mt-4">
            <div className="col-md-3 mt-2">
              <div>
                <p style={style1}>Bilan:</p>
              </div>
            </div>
            <div className="col-md-6 mt-2 form-boxes">
              <div className="mx-2">
                <p>--------</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 mt-2">
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
          <ToastContainer limit={1} />
        </div>
      </div>
    </div>
  );
}
