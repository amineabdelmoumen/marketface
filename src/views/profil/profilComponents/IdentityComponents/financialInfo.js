import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveCompany } from "../../../../lib/crud";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles.scss";
import { setIdentite } from "../../../../store/profileSlice";
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
  const identitie = useSelector((state) => state.profile.identite);
  const [showButton, setShowButton] = useState(0);
  const [Ischecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!Ischecked);
  };

  const handleInputChange = (field, e) => {
    setShowButton(1);
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
    <form className="container" name="form-identite" id="form-identite-gen">
      {/* <div className="page_number">1/2</div> */}

      <div className="form-identite-info d-block mt-3">
        <div className="row form-boxes ">
          <div className="col-md-3 mt-2">
            <div>
              <label>capital:</label>
            </div>
          </div>
          <div className="col-md-9 mt-2 ">
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
        <div className="row mt-4 form-boxes">
          <div className="col-md-3 mt-2">
            <div>
              <label>Chifre d'affaire :</label>
            </div>
          </div>
          <div className=" col-md-9 mt-2 ">
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

        <div className="row mt-4 ">
          <div className="col-md-3 mt-2">
            <div>
              <label>cote en bourse :</label>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="todo"
                  name="todo"
                  value="todo"
                  checked={Ischecked}
                  onChange={(e) => handleOnChange(e)}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexCheckChecked"
                ></label>
              </div>
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
        <ToastContainer limit={1} />
      </div>
    </form>
  );
}
