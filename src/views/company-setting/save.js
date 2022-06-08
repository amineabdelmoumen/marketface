import React from "react";
import { saveDocuments } from "../../lib/crud";
import { useNavigate, useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let form = new FormData();

function Save(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDocsUpload = (e) => {
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      form.append(`documents[${i}]`, files[i]);
    }
  };

  const sendDocs = () => {
    const token = localStorage.getItem("token");
    saveDocuments(form, token)
      .then((res) => {
        form = new FormData();
        toast("Votre demande de vérification de compte a été bien envoyée");
      })
      .then(() => {
        setTimeout(() => {
          navigate("/profil");
        }, 3000);
      })
      .catch((err) => {
        toast("Veuillez joindre la demande de vérification");
      });
  };

  return (
    <div className="container mt-5" id="form-identite">
      <div className="d-flex justify-content-center">
        <img src="/imgs/logo.png" alt="logo" width={100} />
      </div>
      <div className="row">
        <div className="col-10 offset-2">
          {location.state && location.state?.auth === 1 ? (
            <p className="title-identite" style={{ fontSize: "27px" }}>
              Félicitation! vous avez complété votre profil avec succès !
            </p>
          ) : (
            <p
              className="title-identite"
              style={{ color: "#707070", fontSize: "18px" }}
            >
              Vérification de votre compte
            </p>
          )}
          <div className="row">
            <div className="col-md-11 ">
              <p
                className="title-identite-des"
                style={{
                  fontSize: "17px",
                  textAlign: "center",
                }}
              >
                Le document ci-après nous permet de vérifier l’identité de votre
                entreprise et garantir votre sécurité. Vous pourrez alors
                accéder à un réseau de confiance et de fiabilité !
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-9">
              <p
                className="title-identite-des my-3"
                style={{
                  fontSize: "14px",
                  color: "#36A9E1",
                  marginLeft: "52px",
                }}
              >
                Votre demande de vérification de votre compte à Marketface est
                gratuite.
              </p>
            </div>
          </div>
          <div
            className="row company-steps-icons"
            style={{ marginTop: "-36px", marginLeft: "-62px" }}
          >
            <div
              className="   steps-icons"
              style={{ width: "84%", margin: "1px" }}
            >
              <div className=" col-md-3 step step-active">
                <p
                  className="d-flex justify-content-center align-items-center step-icon"
                  style={{ width: "70px", height: "70px" }}
                >
                  <img src="/imgs/printer.png" alt="" />
                </p>
                <p className="cmp-ls mt-2">Rédigez et imprimez la demande </p>
              </div>
              <div className="col-md-3 step step-active">
                <p
                  className="d-flex justify-content-center align-items-center step-icon"
                  style={{ width: "70px", height: "70px" }}
                >
                  <img src="/imgs/contract2.png" alt="" />
                </p>
                <p className="cmp-ls mt-2">Signez* et cachetez la demande </p>
              </div>
              <div className="col-md-3 step step-active">
                <p
                  className="d-flex justify-content-center align-items-center step-icon"
                  style={{ width: "70px", height: "70px" }}
                >
                  <img src="/imgs/barcode.png" alt="" />
                </p>
                <p className="cmp-ls mt-2">Scannez et joignez la demande </p>
              </div>
              <div className="col-md-3 step step-active">
                <p
                  className="d-flex justify-content-center align-items-center step-icon"
                  style={{ width: "70px", height: "70px" }}
                >
                  <img src="/imgs/checMark.png" alt="" />
                </p>
                <p className="cmp-ls mt-2">Compte verifié </p>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div
              className="col-md-6 offset-lg-2"
              style={{ marginLeft: "170px" }}
            >
              <label
                htmlFor="docs"
                className="wrapper-ident  d-flex justify-content-center "
                style={{
                  borderRadius: "14px",
                  border: "1px solid tfransparent",
                }}
              >
                <p className="title-identite me-4" style={{ fontSize: "15px" }}>
                  Joindre votre demande
                </p>
                <input
                  id="docs"
                  type="file"
                  name="documents[]"
                  multiple
                  className="d-none"
                  onChange={(e) => handleDocsUpload(e)}
                />
                <img src="/imgs/clip.png" width={30} alt="clip" />
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <a
              href={`${process.env.REACT_APP_HOST_URL}/../Demande.pdf`}
              target="_blank"
            >
              <small
                className="cmp-ls"
                style={{ fontSize: "16px", marginLeft: "-92px" }}
              >
                Téléchargez le modèle de la demande de vérification
              </small>
            </a>
          </div>
          <div className="row mt-4" style={{ marginLeft: "-92px" }}>
            <div className="col-7 offset-3">
              <div className="d-flex justify-content-center">
                <div
                  className=" d-flex justify-content-center  wrapper-ident  col-12 col-md-6 me-3"
                  onClick={() => navigate("/profil")}
                >
                  <p style={{ fontSize: "16px" }} className="rg-iden">
                    Plus tard
                  </p>
                </div>

                <div
                  className=" d-flex justify-content-center  sv-btn col-12 col-md-6 "
                  onClick={() => sendDocs()}
                >
                  <p style={{ fontSize: "16px" }} className="suivant-iden">
                    Suivant
                  </p>
                </div>
                {/* <button
                  className="btn pointer btn-outline-success rounded-pill me-3 px-4"
                  onClick={() => navigate("/profil")}
                >
                  Plus tard
                </button> */}
                {/* <button
                  className="btn btn-success text-white rounded-pill px-5"
                  onClick={() => sendDocs()}
                >
                  Envoyer
                </button> */}
                <ToastContainer />
              </div>
            </div>
          </div>
          <small className="sg-nm" style={{ marginLeft: "-217px" }}>
            *La signature numérique est autorisée
          </small>
        </div>
      </div>
    </div>
  );
}

export default Save;
