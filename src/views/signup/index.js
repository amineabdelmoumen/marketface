import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegister } from "../../store/profileSlice";
import { checkAuth, register } from "../../lib/auth";
import PageLoading from "../../components/PageLoading";
import "./styles.scss";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
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
  const styleImage = {
    maxWidth: "100%",
  };

  const titreRef = useRef();
  const prenomRef = useRef();
  const nomRef = useRef();
  const posteRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const registerForm = useSelector((state) => state.profile.register);
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState("form-check-label");
  const navigate = useNavigate();

  useEffect(() => {
    let data = { ...registerForm };
    data.phone = value;
    dispatch(setRegister(data));
    console.log("++++++++++++++", data.phone);
  }, [value]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    checkAuth(token)
      .then(() => {
        navigate("/company-setting");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
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
  const handleAgreementConditions = (e) => {
    setLegal(!legal);
    console.log(`data.legal ${legal}`);
  };
  const handleConnect = () => {
    navigate("/");
  };
  const handleClick = async () => {
    toastPending();
    const data = { ...registerForm };
    console.log("data to send", data);
    try {
      await register(registerForm);
      dispatch(setRegister({}));
      toastSuccessUpdate();
      navigate("/");
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
    <div>
      <div className="row" style={{ margin: "10px" }}>
        <div className="col-md-5 me-4 d-none d-lg-block position-relative">
          <img src="/imgs/background.png" alt="" className="img-xfg" />
          <div className="sign-text">
            <p className="bienv-text">
              Bienvenue dans la premiere marketplace B2B au maroc
            </p>
          </div>
          <div className="d-flex qs-l">
            <div className="sug me-auto">Vous avez deja un compte ?</div>
            <div style={{ marginLeft: "180px" }}>
              <button className="connect-btn" onClick={(e) => handleConnect(e)}>
                {" "}
                Se Connecter
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex flex-column align-items-center justify-content-center ">
            <div className="sign-xfl">
              <p style={{ marginTop: "60px" }}>
                Accédez au marché en temps réel!
              </p>
            </div>{" "}
            <div className="">
              <p className="oppor">
                Ne ratez aucune opportunité d’affaires ! Créez votre compte dès
                aujourd’hui !
              </p>
            </div>
          </div>
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
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-9 offset-lg-2">
              <label class="container">
                <p className={`${style} cred-des `}>
                  En cliquant sur S'inscrire, vous acceptez nos Conditions
                  d’utilisation.{" "}
                </p>
                <input
                  className="plg form-check-input"
                  type="checkbox"
                  value=""
                  name="radio"
                  checked={legal}
                  onChange={(e) => handleAgreementConditions(e)}
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-lg-2">
              <button onClick={handleClick} className="pnl-xl">
                Confirmer
              </button>
            </div>
          </div>
          <ToastContainer limit={1} />
        </div>
      </div>
    </div>
  );
};

export default Signup;

/* <>
<div className="background"></div>
{loading ? (
  <PageLoading />
) : (
  
  
  <div className="container pt-5">
    <div className="text-center">
      <h1 className="text-secondary">Accédez au marché en temps réel!</h1>
      <p className="text-primary">
        Ne ratez pas aucune opportunité d'affaires! Créez votre compte dès
        aujourd'hui!
      </p>
    </div>
    <div className="row mt-4">
      <div className="col-md-6 d-flex justify-content-center align-items-start">
       
        <img
          src="/imgs/business-bag.png"
          alt=""
          width={400}
          style={styleImage}
        />
      </div>
      <div className="col-md-6">
        <div className="form-group mb-4">
          
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded-pill border-0"
                placeholder="Prénom"
                defaultValue={registerForm.prenom}
                onChange={(e) => handleInputUpdate("prenom", e)}
              />
              <small ref={prenomRef} className="text-danger ms-2"></small>
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded-pill border-0"
                placeholder="Nom"
                defaultValue={registerForm.nom}
                onChange={(e) => handleInputUpdate("nom", e)}
              />
              <small ref={nomRef} className="text-danger ms-2"></small>
            </div>
          </div>
        </div>
        <div className="form-group mb-4">
          
          <small ref={posteRef} className="text-danger ms-2"></small>
        </div>
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control rounded-pill border-0"
            placeholder="E-mail"
            defaultValue={registerForm.email}
            onChange={(e) => handleInputUpdate("email", e)}
          />
          <small ref={emailRef} className="text-danger ms-2"></small>
        </div>
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control rounded-pill border-0"
            placeholder="Téléphone"
            defaultValue={registerForm.phone}
            onChange={(e) => handleInputUpdate("phone", e)}
          />
          <small ref={phoneRef} className="text-danger ms-2"></small>
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control rounded-pill border-0"
            placeholder="Mot de passe"
            defaultValue={registerForm.password}
            onChange={(e) => handleInputUpdate("password", e)}
          />
          <small ref={passwordRef} className="text-danger ms-2"></small>
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control rounded-pill border-0"
            placeholder="Confirmer votre mot de passe"
            defaultValue={registerForm.password_confirmation}
            onChange={(e) =>
              handleInputUpdate("password_confirmation", e)
            }
          />
        </div>
        <div className="d-flex flex-column align-items-end mb-5">
          <p>
            Conformément à la loi 09-08, vous disposez d'un droit d'accès,
            de rectifications et d'opposition au traitement de vos données
            personnelles. Ce traitement a été autorisé par la CNDP sous le
            n°XXXXX
          </p>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              checked={registerForm.terms}
              onChange={(e) => handleAgreementConditions(e)}
            />
            <label className={style} for="flexCheckDefault">
              J'ai lu et j'accepte les conditions générales d'utilisation,
              notamment la mention relative à la protection des données
              personnelles
            </label>
          </div>
          <button
            onClick={handleClick}
            className="btn btn-success text-white rounded-pill px-4"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</> */
