import React, { useState } from "react";
import { resetPassword } from "../../lib/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

function ResetPassword(props) {
  const [email, setEmail] = useState("");
  const handleClick = () => {
    const token = localStorage.getItem("token");
    resetPassword({ email }, token)
      .then(() => {
        toast(
          "Le lien de réinitialisation a été envoyé à votre adresse e-mail !"
        );
      })
      .catch(() => {
        toast("Erreur lors de l'envoi du lien de réinitialisation");
      });
  };
  return (
    <>
      <div className="row  " style={{ margin: "10px" }}>
        <div className="col-md-5 me-4 d-none d-lg-block position-relative">
          <img src="/imgs/background.png" alt="" className="img-xfg" />
          <div className="sign-text-login">
            <p className="bienv-text">
              Bienvenue dans la premiere marketplace B2B au maroc
            </p>
          </div>
          <div className="d-flex align-items-center position-absolute qs-login">
            <div className="sug me-auto">Vous n'avez pas un compte ?</div>
            <div style={{ marginLeft: "180px" }}>
              <Link to="/signup">
                <button className="connect-btn"> S'enregistrer</button>
              </Link>
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
                Ne ratez aucune opportunité d’affaires ! !
              </p>
            </div>
          </div>

          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-8 offset-lg-2">
              {" "}
              <input
                type="text"
                className="input-xfl"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 offset-lg-2">
              <button onClick={handleClick} className="pnl-xl">
                Envoyer
              </button>
            </div>
          </div>

          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
{
  /* <div className="background"></div>

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
        <ToastContainer />
      </div>
    </div>
  </div>
</div> */
}
