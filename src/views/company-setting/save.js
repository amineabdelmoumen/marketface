import React from "react";
import { saveDocuments } from "../../lib/crud";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "react-simple-snackbar";
import {
  snackbarErrorStyle,
  snackbarSuccessStyle,
} from "../../lib/snackbarStyles";

let form = new FormData();

function Save(props) {
  const navigate = useNavigate();
  const [openSuccessSnackbar, closeSuccessSnackbar] =
    useSnackbar(snackbarSuccessStyle);
  const [openErrorSnackbar, closeErrorSnackbar] =
    useSnackbar(snackbarErrorStyle);
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
        openSuccessSnackbar(
          "Votre demande de vérification de compte a été bien envoyée"
        );
      })
      .then(() => {
        setTimeout(() => {
          closeSuccessSnackbar();
          navigate("/profil");
        }, 3000);
      })
      .catch((err) => {
        openErrorSnackbar("Veuillez joindre la demande de vérification");
      });
  };

  return (
    <div className="container mt-5">
      <img src="/imgs/logo.png" alt="logo" width={100} />
      <div className="row">
        <div className="col-8 offset-2">
          <h5 className="text-secondary">Vérification de votre compte</h5>
          <p>
            Le document ci-après nous permet de vérifier l’identité de votre
            entreprise et garantir votre sécurité. Vous pourrez alors accéder à
            un réseau de confiance et de fiabilité !
          </p>
          <p className="my-4 text-primary">
            Votre demande de vérification de votre compte à Marketface est
            gratuite.
          </p>
          <img src="/imgs/stepper.png" alt="" height={140} />
          <label
            htmlFor="docs"
            className="border border-success w-50 py-3 mx-auto mt-5 d-flex justify-content-center gap-5"
            style={{ borderRadius: "14px" }}
          >
            <img src="/imgs/clip.png" width={30} alt="clip" />

            <p className="text-primary">Joindre votre demande</p>
            <input
              id="docs"
              type="file"
              name="documents[]"
              multiple
              className="d-none"
              onChange={(e) => handleDocsUpload(e)}
            />
          </label>
          <div className="d-flex justify-content-center mt-2">
            <a
              href={`${process.env.REACT_APP_HOST_URL}/../Demande.pdf`}
              target="_blank"
            >
              <small>
                <span className="fas fa-download mr-2"></span>Téléchargez le
                modèle de la demande de vérification
              </small>
            </a>
          </div>
          <div className="row">
            <div className="col-6 offset-3">
              <div className="d-flex justify-content-center my-5">
                <button
                  className="btn btn-success text-white rounded-pill px-5"
                  onClick={() => sendDocs()}
                >
                  Envoyer
                </button>
              </div>
            </div>
            <div className="col-3 d-flex justify-content-end align-items-baseline">
              <img src="/imgs/logo-lg.png" alt="logo" width={160} />
            </div>
          </div>
          <small>*La signature numérique est autorisée</small>
        </div>
      </div>
    </div>
  );
}

export default Save;
