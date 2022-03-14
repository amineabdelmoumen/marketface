import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../../lib/auth";

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    try {
      const response = await login(email, password)
      const user = response.data.data
      localStorage.setItem('token', user.token)
      if(user.verified_at) {
        navigate("/profil")
      }
    }catch (e) {
      console.log(e)
    }
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
            <img src="/imgs/business-bag.png" alt="" width={400}/>
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
            <div className="d-flex flex-column align-items-end mb-5">
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
    </>
  );
};

export default Login;
