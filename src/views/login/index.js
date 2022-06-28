import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../lib/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const Login = () => {
  const toastId = useRef(null);
  const toastPending = () =>
    (toastId.current = toast("Login en cours ......", {
      autoClose: 10000,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
    }));

  const toastSuccessUpdate = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Login En cours .....",
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastError = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Vous devez verifier votre adresse mail!",
      autoClose: 1800,
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER,
    }));
  const styleImage = {
    maxWidth: "100%",
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      toastPending();
      const response = await login(email, password);
      console.log("response: ", response);
      const user = response.data.data;
      localStorage.setItem("token", user.token);
      if (user.email_verified_at) {
        navigate("/profil");
      } else {
        toastError();
      }
    } catch (e) {
      toast(e.response.data.msg);
    }
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

          <div className="row" style={{ marginTop: "12px" }}>
            <div className="col-md-8 offset-lg-2">
              {" "}
              <input
                type="password"
                className="input-xfl"
                placeholder="Mot de passe"
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="row mt-1">
            <div className="col-md-8 offset-lg-2">
              <div className="d-flex justify-content-end ">
                <Link to="/reset-password">
                  <small className="pas-oub">Mot de passe oublié?</small>
                </Link>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
{
  /* <div className="background"></div>

<div className="container pt-5">
  <div className="text-center">
    <h1 className="text-secondary">Accédez au marché en temps réel!</h1>
    <p className="text-primary">
      Ne ratez aucune opportunité d'affaires! Créez votre compte dès
      aujourd'hui!
    </p>
  </div>
  <div className="row mt-4">
    <div className="col-md-6  d-flex justify-content-center align-items-start">
      
      <img
        className="image"
        src="/imgs/business-bag.png"
        alt=""
        width={400}
        style={styleImage}
      />
    </div>
    <div className="col-md-6">
      <div className="form-group mb-4">
        <input
          type="text"
          className="form-control rounded-pill border-0"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-4">
        <input
          type="password"
          className="form-control rounded-pill border-0"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-flex  mb-5 m-10">
        <div className="me-auto align-self-center">
          <Link to="/reset-password">
            <small>Mot de passe oublié?</small>
          </Link>
        </div>
        <div>
          <Link
            to="/signup"
            className="btn btn-light text-success border-success rounded-pill px-4 me-2 enreg"
          >
            S'enregistrer
          </Link>
          <button
            onClick={handleClick}
            className="btn btn-success text-white rounded-pill px-4"
          >
            Envoyer
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  </div>
</div> */
}
