import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setRegister} from "../../store/profileSlice";
import {checkAuth, register} from "../../lib/auth";
import { useSnackbar } from 'react-simple-snackbar'
import snackbarStyles from "../../lib/snackbarStyles";
import PageLoading from "../../components/PageLoading";

const Signup = () => {
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarStyles)
  const dispatch = useDispatch()
  const registerForm = useSelector((state) => state.profile.register)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    checkAuth(token)
      .then(() => {
        navigate('/company-setting')
        setLoading(false)
      }).catch(() => {
        setLoading(false)
    })
  }, [])
  const handleInputUpdate = (field, e) => {
    let data = { ...registerForm }
    data[field] = e.target.value
    dispatch(setRegister(data))
  }
  const handleClick = async () => {
    try {
      await register(registerForm)
      navigate('/login')
    }catch(e) {
      let data = e.response.data
      openSnackbar(
        <ul>
          {
            Object.values(data.errors).map((errors) => errors.map((error) => <li>{error}</li>))
          }
        </ul>
      )
    }
  };

  return (
    <>
      <div className="background"></div>
      { loading ?
        <PageLoading/>
        :
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
              <select
                name="titre"
                className="form-control rounded-pill border-0"
                placeholder="Titre"
                defaultValue={registerForm.titre}
                onChange={(e) => handleInputUpdate('titre', e)}
              >
                <option value="m">M</option>
                <option value="mme">Mme</option>
                <option value="dr">Dr</option>
                <option value="pr">Pr</option>
              </select>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-pill border-0"
                    placeholder="Prénom"
                    defaultValue={registerForm.prenom}
                    onChange={(e) => handleInputUpdate('prenom', e)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-pill border-0"
                    placeholder="Nom"
                    defaultValue={registerForm.nom}
                    onChange={(e) => handleInputUpdate('nom', e)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group mb-4">
              <select
                name="poste"
                className="form-control rounded-pill border-0"
                placeholder="Poste Occupé"
                defaultValue={registerForm.poste}
                onChange={(e) => handleInputUpdate('poste', e)}
              >
                <option value="directeur_general">Directeur général</option>
                <option value="directeur_commercial">Directeur Commercial</option>
                <option value="directeur_marketing">Directeur Marketing</option>
                <option value="directeur_finance">Directeur Finance</option>
                <option value="directeur_achat">Directeur Achat</option>
                <option value="directeur_communication">
                  Directeur Communication
                </option>
                <option value="directeur_informatique">
                  Directeur Informatique
                </option>
                <option value="directeur_ressource_humaine">
                  Directeur Ressource humaine
                </option>
                <option value="directeur_technique">Directeur Technique</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control rounded-pill border-0"
                placeholder="E-mail"
                defaultValue={registerForm.email}
                onChange={(e) => handleInputUpdate('email', e)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="text"
                className="form-control rounded-pill border-0"
                placeholder="Téléphone"
                defaultValue={registerForm.phone}
                onChange={(e) => handleInputUpdate('phone', e)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control rounded-pill border-0"
                placeholder="Mot de passe"
                defaultValue={registerForm.password}
                onChange={(e) => handleInputUpdate('password', e)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control rounded-pill border-0"
                placeholder="Confirmer votre mot de passe"
                defaultValue={registerForm.password_confirmation}
                onChange={(e) => handleInputUpdate('password_confirmation', e)}
              />
            </div>
            <div className="d-flex flex-column align-items-end mb-5">
              <p className="small">
                En cliquant sur s'inscrire, vous acceptez nos{" "}
                <a href="#">Conditions d'utilisation</a>
              </p>
              <button
                onClick={handleClick}
                className="btn btn-success text-white rounded-pill px-4"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Signup;
