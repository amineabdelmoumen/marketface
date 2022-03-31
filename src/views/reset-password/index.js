import React, { useState } from "react";
import { useSnackbar } from "react-simple-snackbar";
import { resetPassword } from "../../lib/auth";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const [openSnackbar, closeSnackbar] = useSnackbar();
  const handleClick = () => {
    const token = localStorage.getItem("token");
    resetPassword({ email }, token)
      .then(() => {
        openSnackbar(
          "Le lien de réinitialisation a été envoyé à votre adresse e-mail !"
        );
      })
      .catch(() => {
        openSnackbar("Erreur lors de l'envoi du lien de réinitialisation");
      });
  };
  return (
    <>
      <div className="background"></div>

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
            {/*<img src="https://via.placeholder.com/300" alt="" />*/}
            <img src="/imgs/business-bag.png" alt="" width={400} />
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <input
                type="text"
                className="form-control rounded-pill border-0"
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column align-items-end my-5">
              <button
                onClick={() => handleClick()}
                className="btn btn-success text-white rounded-pill px-4"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
