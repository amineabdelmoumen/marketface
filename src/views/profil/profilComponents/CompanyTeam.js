import React, { useState, useRef, useEffect } from "react";
import { setRegister } from "../../../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../../lib/auth";
import { AddMembre } from "../../../lib/crud";
export default function CompanyTeam({ setTeam }) {
  const toastId = useRef(null);
  const toastPending = () =>
    (toastId.current = toast("Création de Votre compte est en cours ......", {
      autoClose: 10000,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
    }));

  const toastSuccessUpdate = () =>
    (toastId.current = toast.update(toastId.current, {
      render:
        "Votre Compte est créer  avec succés ,Vérifier Votre Boite mail..",
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastError = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Echec de Création du compte !",
      autoClose: 1500,
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER,
    }));

  const [selectedTitle, setSelectedTitle] = useState("input-xfl selected");
  const [selectedPoste, setSelectedPoste] = useState("input-xfl selected");
  const [value, setValue] = useState();
  const [legal, setLegal] = useState(false);
  const navigate = useNavigate();
  const registerForm = useSelector((state) => state.profile.register);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState("form-check-label");
  const dispatch = useDispatch();
  const titreRef = useRef();
  const prenomRef = useRef();
  const nomRef = useRef();
  const posteRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    let data = { ...registerForm };
    data.phone = value;
    dispatch(setRegister(data));
    console.log("++++++++++++++", data.phone);
  }, [value]);

  const handleInputUpdate = (field, e) => {
    if (e.target.value != "Genre" && field == "titre") {
      setSelectedTitle("input-xfl border border-none");
    }
    if (e.target.value != "poste" && field == "poste") {
      setSelectedPoste("input-xfl");
    }
    let data = { ...registerForm };
    data[field] = e.target.value;
    dispatch(setRegister(data));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    toastPending();

    console.log("in++++++++++++++++++ ");
    const data = { ...registerForm };
    console.log("data to send", data);
    console.log("registerForm", registerForm);
    try {
      await AddMembre(registerForm, token);
      console.log("registerForm", registerForm);

      toastSuccessUpdate();
      setTimeout(setTeam(3, 0), 2000);
      dispatch(setRegister({}));
    } catch (e) {
      let data = e.response?.data;
      showErrors(data.errors);
      toastError();
    }
  };

  const showErrors = (errors) => {
    if (errors.titre) {
      titreRef.current.innerText = errors.titre[0];
    }
    if (errors.prenom) {
      prenomRef.current.innerText = errors.prenom[0];
    }
    if (errors.nom) {
      nomRef.current.innerText = errors.nom[0];
    }
    if (errors.poste) {
      posteRef.current.innerText = errors.poste[0];
    }
    if (errors.email) {
      emailRef.current.innerText = errors.email[0];
    }
    if (errors.phone) {
      phoneRef.current.innerText = errors.phone[0];
    }
    if (errors.poste) {
      posteRef.current.innerText = errors.poste[0];
    }
    if (errors.password) {
      passwordRef.current.innerText = errors.password[0];
    }
  };

  return (
    <div style={{ marginTop: "55px" }}>
      {" "}
      <form className="container" name="form-identite" id="form-identite-gen">
        <div className="form-identite-info d-block mt-3">
          <div className="row  " style={{ marginTop: "12px" }}>
            <div className="col-md-4 offset-lg-2">
              <input
                type="text"
                className="input-xfl"
                defaultValue={registerForm.nom}
                onChange={(e) => handleInputUpdate("nom", e)}
                placeholder="Nom"
              />
              <small ref={nomRef} className="text-danger ms-2"></small>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="input-xfl"
                value={registerForm.prenom}
                onChange={(e) => handleInputUpdate("prenom", e)}
                placeholder="Prenom"
              />
              <small ref={prenomRef} className="text-danger ms-2"></small>
            </div>
          </div>
          <div className="row  " style={{ marginTop: "12px" }}>
            <div className="col-md-4 offset-lg-2">
              <select
                name="titre"
                className={selectedTitle}
                style={{ backgroundColor: "white" }}
                value={registerForm ? registerForm.titre : ""}
                onChange={(e) => handleInputUpdate("titre", e)}
              >
                {/* <option value="Genre" disabled selected hidden>
                  {" "}
                </option> */}
                <option value="" disabled selected hidden>
                  Genre
                </option>
                <option value="m">M</option>
                <option value="mme">Mme</option>
                <option value="dr">Dr</option>
                <option value="pr">Pr</option>
              </select>
              <small ref={titreRef} className="text-danger ms-2"></small>
            </div>
            <div className="col-md-4">
              <select
                name="poste"
                style={{ backgroundColor: "white" }}
                className={selectedPoste}
                value={registerForm ? registerForm.poste : ""}
                onChange={(e) => handleInputUpdate("poste", e)}
              >
                <option value="" disabled selected hidden>
                  {" "}
                  Poste Occupé
                </option>
                <option value="directeur">Directeur</option>
                <option value="commercial">Commercial</option>
                <option value="marketing">Marketing</option>
                <option value="finance"> Finance</option>
                <option value="achat"> Achat</option>
                <option value="communication">Communication</option>
                <option value="informatique">Informatique</option>
                <option value="ressource_humaine">Ressource humaine</option>
                <option value="technique">Technique</option>
                <option value="autre">Autre</option>
              </select>
              <small ref={posteRef} className="text-danger ms-2"></small>
            </div>
          </div>

          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-8 offset-lg-2">
              {" "}
              <input
                type="text"
                className="input-xfl"
                value={registerForm.email}
                onChange={(e) => handleInputUpdate("email", e)}
                placeholder="Email"
              />
              <small ref={emailRef} className="text-danger ms-2"></small>
            </div>
          </div>

          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-8 offset-lg-2">
              <PhoneInput
                international
                country={"ma"}
                value={value}
                containerStyle={{ backgroundColor: "white" }}
                defaultValue={registerForm.phone}
                onChange={setValue}
                inputStyle={{
                  border: "1px solid #E4E6E8",
                  borderRadius: "10px",
                  overflow: "none",
                  resize: "none",
                  width: "100%",
                  height: "60px",
                }}
              />
              <small ref={phoneRef} className="text-danger ms-2"></small>
            </div>
          </div>

          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-8 offset-lg-2">
              {" "}
              <input
                type="password"
                className="input-xfl"
                placeholder="Mot de passe"
                value={registerForm.password}
                onChange={(e) => handleInputUpdate("password", e)}
              />
              <small ref={passwordRef} className="text-danger ms-2"></small>
            </div>
          </div>

          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-8 offset-lg-2">
              {" "}
              <input
                type="password"
                className="input-xfl"
                placeholder="Confirmer le mot de passe"
                defaultValue={registerForm.password_confirmation}
                onChange={(e) => handleInputUpdate("password_confirmation", e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-lg-2">
              <button onClick={(e) => handleClick(e)} className="pnl-xl">
                Ajouter
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}
