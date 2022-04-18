import React from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../store/profileSlice";
import { saveCatalogue } from "../../lib/crud";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Catalogue() {
  const dispatch = useDispatch();
  const catalogue = useSelector((state) => state.profile.catalogue);
  const handleInputUpdate = (field, e) => {
    let data = { ...catalogue };
    data[field] = e.target.value;
    dispatch(setCatalogue(data));
  };
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    saveCatalogue(catalogue, token)
      .then(() => {
        dispatch(setFormStage(4));
      })
      .catch((err) => {
        let data = err.response.data;
      });
  };

  const findElement = (element, list) => {
    return list.find((el) => element === el);
  };
  const handleMultiSelect = (field, e) => {
    let data = { ...catalogue };
    let val = e.target.value;
    if (findElement(val, data[field])) {
      let index = data[field].findIndex((el) => el === val);
      if (index > -1) {
        let list = [...data[field]];
        list.splice(index, 1);
        data[field] = list;
      }
    } else {
      data[field] = [...data[field], val];
    }
    dispatch(setCatalogue(data));
  };
  let InputStyle = {
    font: "normal normal normal 14px/11px Montserrat",
    letterspacing: "0px",
    color: "#707070",
    opacity: 1,
    border: "1px solid #A4A4A4",
    width: "100%",
    borderRadius: "36px",
    paddingLeft: "3px",
    textAlign: "center",
  };
  const accrochStyle = {
    font: "normal normal 600 20px/24px Montserrat",
    letterSpacing: "0px",
    color: "#00B5FF",
    opacity: 1,
    textAlign: "center",
    marginBottom: "35px",
  };
  return (
    <>
      <form className="container" name="form-identite" id="form-identite">
        <div className="page_number">1/2</div>
        <h4 className="ms-5 text-primary">Créez votre E-Catalogue</h4>
        <div className="form-identite-info d-block mt-3">
          <div className="row">
            <div className="col-10 offset-2">
              <h5 style={accrochStyle}>
                Parlez nous de votre activité et attirez plus de prospect
              </h5>
              <div className="row form-boxes">
                <div className="col-md-2">
                  <label htmlFor="vous_etes">Vous êtes:</label>
                </div>
                <div className="col-md-10">
                  <select
                    name="vous_etes"
                    id="vous_etes"
                    style={{
                      ...InputStyle,
                      width: "30%",
                      paddingTop: "5px",
                      paddingBottom: "5px",
                    }}
                    value={catalogue.vous_etes}
                    onChange={(e) => handleInputUpdate("vous_etes", e)}
                  >
                    <option value="franchisé">Franchisé</option>
                    <option value="franchiseur">Franchiseur</option>
                    <option value="aucun">Aucun</option>
                  </select>
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-lg-3">
                  <label htmlFor="activite">
                    Quelle est votre activité opérationnelle?
                  </label>
                </div>
                <div className="col-6 col-lg-3">
                  <label
                    htmlFor="matiere"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("matière première", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Matière première
                    <input
                      type="checkbox"
                      name="matiere"
                      id="matiere"
                      value="matière première"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("matiere", e)}
                    />
                  </label>
                </div>

                <div className=" col-6 col-lg-2">
                  <label
                    htmlFor="transformation"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("transformation", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Transformation
                    <input
                      type="checkbox"
                      name="matiere"
                      id="transformation"
                      value="transformation"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("matiere", e)}
                    />
                  </label>
                </div>

                <div className=" col-6 col-lg-2">
                  <label
                    htmlFor="distribution"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("distribution", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Distribution
                    <input
                      type="checkbox"
                      name="matiere"
                      id="distribution"
                      value="distribution"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("matiere", e)}
                    />
                  </label>
                </div>
                <div className="col-6 col-lg-2">
                  <label
                    htmlFor="revendeur"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("revendeur", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Revendeur
                    <input
                      type="checkbox"
                      name="matiere"
                      id="revendeur"
                      value="revendeur"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("matiere", e)}
                    />
                  </label>
                </div>
              </div>

              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="prenom_nome">
                    Quel est le type de business que vous entreprenez?
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="b2b"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("B2B", catalogue.business)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    B2B
                    <input
                      type="checkbox"
                      name="type"
                      id="b2b"
                      value="B2B"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("business", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="b2c"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("B2C", catalogue.business)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    B2C
                    <input
                      type="checkbox"
                      name="type"
                      id="b2c"
                      value="B2C"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("business", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="b2g"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("B2G", catalogue.business)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    B2G
                    <input
                      type="checkbox"
                      name="type"
                      id="b2g"
                      value="B2G"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("business", e)}
                    />
                  </label>
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="prenom_nome">
                    Où sont localisées vos activités?
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="offshore"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Offshore", catalogue.location)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Offshore
                    <input
                      type="checkbox"
                      name="location"
                      id="offshore"
                      value="Offshore"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("location", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="onshore"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Onshore", catalogue.location)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Onshore
                    <input
                      type="checkbox"
                      name="location"
                      id="onshore"
                      value="Onshore"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("location", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="nearshore"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Nearshore", catalogue.location)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Nearshore
                    <input
                      type="checkbox"
                      name="location"
                      id="nearshore"
                      value="Nearshore"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("location", e)}
                    />
                  </label>
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="organisme_type">
                    Quel moyen utilisez-vous pour vendre vos services?
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="online"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("En ligne", catalogue.moyen)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    En ligne
                    <input
                      type="checkbox"
                      name="moyen"
                      id="online"
                      value="En ligne"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("moyen", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="magasin"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("En magasin", catalogue.moyen)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    En magasin
                    <input
                      type="checkbox"
                      name="moyen"
                      id="magasin"
                      value="En magasin"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("moyen", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="usine"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("En usine", catalogue.moyen)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    En usine
                    <input
                      type="checkbox"
                      name="moyen"
                      id="usine"
                      value="En usine"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("moyen", e)}
                    />
                  </label>
                </div>
              </div>
              <div className="row form-boxes">
                <div className="col-md-5">
                  {" "}
                  <label htmlFor="organisme_taille">
                    De quelle façon vendez-vous vos produits?
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="detaillant"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Détaillant", catalogue.type_vente)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Détaillant
                    <input
                      type="checkbox"
                      name="moyen"
                      id="detaillant"
                      value="Détaillant"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("type_vente", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="grossiste"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Grossiste", catalogue.type_vente)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Grossiste
                    <input
                      type="checkbox"
                      name="moyen"
                      id="grossiste"
                      value="Grossiste"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("type_vente", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2"></div>
              </div>
              <div className="row form-boxes">
                <div className="col-md-5">
                  {" "}
                  <label htmlFor="nombre_employés">
                    Les produits que vous achetez sont:
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="importes"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Importés", catalogue.produit_achete)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Importés
                    <input
                      type="checkbox"
                      name="moyen"
                      id="importes"
                      value="Importés"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("produit_achete", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="locaux"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Locaux", catalogue.produit_achete)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Locaux
                    <input
                      type="checkbox"
                      name="moyen"
                      id="locaux"
                      value="Locaux"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("produit_achete", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2"></div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="nombre_employés">
                    De quelle façon distribuez-vous vos produits?
                  </label>
                </div>

                <div className="col-md-2">
                  <label
                    htmlFor="local"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Local", catalogue.distribution)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Local
                    <input
                      type="checkbox"
                      name="distribution"
                      id="local"
                      value="Local"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("distribution", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <label
                    htmlFor="export"
                    style={InputStyle}
                    className={`px-2 py-2 cursor-pointer ${
                      findElement("Export", catalogue.distribution)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    Export
                    <input
                      type="checkbox"
                      name="distribution"
                      id="export"
                      value="Export"
                      className="d-none"
                      onChange={(e) => handleMultiSelect("distribution", e)}
                    />
                  </label>
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
          <div className="d-flex mt-3 justify-content-end">
            <button
              type="button"
              className="btn pointer btn-outline-secondary rounded-pill px-4"
              onClick={() => dispatch(setFormStage(2))}
            >
              Précédent
            </button>
            <button
              type="button"
              className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5"
              onClick={() => handleSubmit()}
            >
              Suivant
            </button>
            <ToastContainer />
          </div>
        </div>
      </form>
    </>
  );
}

export default Catalogue;
