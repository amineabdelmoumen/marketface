import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegister } from "../../store/profileSlice";
import { checkAuth, register } from "../../lib/auth";
import { useSnackbar } from "react-simple-snackbar";
import snackbarStyles from "../../lib/snackbarStyles";
import PageLoading from "../../components/PageLoading";

const Signup = () => {
  const styleImage = {
    maxWidth: "100%",
  };
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarStyles);
  const dispatch = useDispatch();
  const registerForm = useSelector((state) => state.profile.register);
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
    let data = { ...registerForm };
    data[field] = e.target.value;
    dispatch(setRegister(data));
  };
  const handleAgreementConditions = (e) => {
    let data = { ...registerForm };
    data.terms = e.target.checked;
    dispatch(setRegister(data));
  };
  const handleClick = async () => {
    if (registerForm.terms) {
      try {
        await register(registerForm);
        navigate("/");
      } catch (e) {
        let data = e.response.data;
        openSnackbar(
          <ul>
            {Object.values(data.errors).map((errors) =>
              errors.map((error) => <li>{error}</li>)
            )}
          </ul>
        );
      }
    } else {
      console.log("You should agree about about the terms");
      setStyle((prev) => "form-check-label text-danger");
    }
  };

  return (
    <>
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
              {/*<img src="https://via.placeholder.com/300" alt="" />*/}
              <img
                src="/imgs/business-bag.png"
                alt=""
                width={400}
                style={styleImage}
              />
            </div>
            <div className="col-md-6">
              <div className="form-group mb-4">
                <select
                  name="titre"
                  className="form-control rounded-pill border-0"
                  placeholder="Titre"
                  defaultValue={registerForm.titre}
                  onChange={(e) => handleInputUpdate("titre", e)}
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
                      onChange={(e) => handleInputUpdate("prenom", e)}
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
                      onChange={(e) => handleInputUpdate("nom", e)}
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
                  onChange={(e) => handleInputUpdate("poste", e)}
                >
                  <option value="directeur">Directeur</option>
                  <option value="commercial">Commercial</option>
                  <option value="marketing">Marketing</option>
                  <option value="finance"> Finance</option>
                  <option value="achat"> Achat</option>
                  <option value="communication">Communication</option>
                  <option value="informatique">Informatique</option>
                  <option value="ressource_humaine">Ressource humaine</option>
                  <option value="technique">Technique</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control rounded-pill border-0"
                  placeholder="E-mail"
                  defaultValue={registerForm.email}
                  onChange={(e) => handleInputUpdate("email", e)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control rounded-pill border-0"
                  placeholder="Téléphone"
                  defaultValue={registerForm.phone}
                  onChange={(e) => handleInputUpdate("phone", e)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  type="password"
                  className="form-control rounded-pill border-0"
                  placeholder="Mot de passe"
                  defaultValue={registerForm.password}
                  onChange={(e) => handleInputUpdate("password", e)}
                />
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
    </>
  );
};

export default Signup;
