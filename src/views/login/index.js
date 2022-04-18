import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../lib/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.scss";

const Login = () => {
  const styleImage = {
    maxWidth: "100%",
  };
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async () => {
    try {
      const response = await login(email, password);
      console.log("response: ", response);
      const user = response.data.data;
      localStorage.setItem("token", user.token);
      if (user.email_verified_at) {
        navigate("/company-setting");
      }
    } catch (e) {
      toast(e.response.data.msg);
    }
  };

  return (
    <>
      <div className="background"></div>

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
            {/*<img src="https://via.placeholder.com/300" alt="" />*/}
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
      </div>
    </>
  );
};

export default Login;
