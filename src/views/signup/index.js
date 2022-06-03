import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegister } from "../../store/profileSlice";
import { checkAuth, register } from "../../lib/auth";
import PageLoading from "../../components/PageLoading";
import "./styles.scss";
import PhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
const Signup = () => {
  const [selectedTitle, setSelectedTitle] = useState("input-xfl selected");
  const [selectedPoste, setSelectedPoste] = useState("input-xfl selected");
  const [value, setValue] = useState();
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
  const [registerForm, setRegisterForm] = useState({ legal: false, phone: "" });
  const [loading, setLoading] = useState(true);
  const [style, setStyle] = useState("form-check-label");
  const navigate = useNavigate();

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
    setRegisterForm(data);
  };
  const handleAgreementConditions = (e) => {
    let data = { ...registerForm };
    data.legal = !data.legal;
    console.log(`data.legal ${!data.legal}`);
    data.phone = value;
    setRegisterForm(data);
  };
  const handleConnect = () => {
    navigate("/");
  };
  const handleClick = async () => {
    if (registerForm.legal) {
      try {
        await register(registerForm);
        navigate("/");
      } catch (e) {
        let data = e.response?.data;
        showErrors(data.errors);
      }
    } else {
      console.log("You should agree about about the terms");
      setStyle((prev) => "form-check-label text-danger");
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
          <div className="d-flex align-items-center position-absolute qs-l">
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
            <div className="col-md-5 offset-lg-1">
              <input
                type="text"
                className="input-xfl"
                defaultValue={registerForm.nom}
                onChange={(e) => handleInputUpdate("nom", e)}
                placeholder="Nom"
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="input-xfl"
                value={registerForm.prenom}
                onChange={(e) => handleInputUpdate("prenom", e)}
                placeholder="Prenom"
              />
            </div>
          </div>
          <div className="row  " style={{ marginTop: "12px" }}>
            <div className="col-md-5 offset-lg-1">
              <select
                name="titre"
                className={selectedTitle}
                style={{ backgroundColor: "white" }}
                value={registerForm.titre}
                onChange={(e) => handleInputUpdate("titre", e)}
              >
                {/* <option value="Genre" disabled selected hidden>
                  {" "}
                </option> */}
                <option value="Genre" disabled selected hidden>
                  Genre
                </option>
                <option value="m">M</option>
                <option value="mme">Mme</option>
                <option value="dr">Dr</option>
                <option value="pr">Pr</option>
              </select>
              <small ref={titreRef} className="text-danger ms-2"></small>
            </div>
            <div className="col-md-5">
              <select
                name="poste"
                style={{ backgroundColor: "white" }}
                className={selectedPoste}
                placeholder="Poste Occupé"
                value={registerForm.poste}
                onChange={(e) => handleInputUpdate("poste", e)}
              >
                <option
                  className="text-red"
                  value="poste"
                  disabled
                  selected
                  hidden
                >
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
            </div>
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-10 offset-lg-1">
              {" "}
              <input
                type="text"
                className="input-xfl"
                value={registerForm.email}
                onChange={(e) => handleInputUpdate("email", e)}
                placeholder="Email"
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-10 offset-lg-1">
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
            </div>
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-10 offset-lg-1">
              {" "}
              <input
                type="password"
                className="input-xfl"
                placeholder="Mot de passe"
                value={registerForm.password}
                onChange={(e) => handleInputUpdate("password", e)}
              />
            </div>
          </div>
          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-10 offset-lg-1">
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
            <div className="col-md-11 offset-lg-1">
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
                  checked={registerForm.legal}
                  onChange={(e) => handleAgreementConditions(e)}
                />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-md-11 offset-lg-1">
              <button onClick={handleClick} className="pnl-xl">
                Confirmer
              </button>
            </div>
          </div>
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
