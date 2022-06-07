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
    fontFamily: "Montserrat",
    letterSpacing: "0px",
    color: "#00B5FF",
    opacity: 1,
    textAlign: "center",
    marginBottom: "35px",
  };
  const areaScrollStyle = {
    border: "none",
    outline: "none",
    boxShadow: "none",
    overflow: "auto",
    resize: "none",
    display: "block",
  };
  return (
    <>
      <form className="container" name="form-identite" id="form-identite">
        {/* <div className="page_number">1/2</div> */}
        <div className="d-flex">
          {" "}
          <p className="title-identite" style={{ fontSize: "25px" }}>
            Créez votre E-Catalogue 1/2
          </p>
        </div>

        <div className="form-identite-info d-block mt-3">
          <div className="row">
            <div className="col-md-9">
              <h5 className="section-title" style={{ marginTop: "10px" }}>
                Parlez nous de votre activité et attirez plus de prospect
              </h5>
              <div className="row form-boxes">
                <div className="col-md-6">
                  <label htmlFor="vous_etes" style={{ fontSize: "13px" }}>
                    Vous êtes:
                  </label>
                </div>
                <div className="col-md-6">
                  <select
                    name="vous_etes"
                    id="vous_etes"
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
                <div className="col-lg-6">
                  <label htmlFor="activite" style={{ fontSize: "13px" }}>
                    Quelle est votre activité opérationnelle?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="matiere"
                    id="matiere"
                    value={catalogue.matiere}
                    onChange={(e) => handleMultiSelect("matiere", e)}
                  >
                    <option value="matière première">Matière première</option>
                    <option value="transformation">Transformation</option>
                    <option value="distribution">Distribution</option>
                    <option value="revendeur">Revendeur</option>
                    Revendeur
                  </select>
                </div>

                {/* <div className="col-6 col-lg-2">
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
                </div> */}
              </div>

              <div className=" row form-boxes">
                <div className="col-md-6">
                  <label htmlFor="prenom_nome" style={{ fontSize: "13px" }}>
                    Quel est le type de business que vous entreprenez?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="matiere"
                    id="matiere"
                    value={catalogue.business}
                    onChange={(e) => handleMultiSelect("business", e)}
                  >
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                    <option value="B2G">B2G</option>
                  </select>
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="prenom_nome" style={{ fontSize: "13px" }}>
                    Où sont localisées vos activités?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="location"
                    id="location"
                    value={catalogue.location}
                    onChange={(e) => handleMultiSelect("location", e)}
                  >
                    <option value="offshore"> Offshore</option>
                    <option value="onshore"> Onshore</option>
                    <option value="nearshore">Nearshore</option>
                  </select>
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="organisme_type " style={{ fontSize: "13px" }}>
                    Quel moyen utilisez-vous pour vendre vos services?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="moyen"
                    id="moyen"
                    value={catalogue.location}
                    onChange={(e) => handleMultiSelect("moyen", e)}
                  >
                    <option value="En ligne"> En ligne</option>
                    <option value=" En magasin"> En magasin</option>
                    <option value="En usine">En usine</option>
                  </select>
                </div>
              </div>
              <div className="row form-boxes">
                <div className="col-md-5">
                  {" "}
                  <label
                    htmlFor="organisme_taille"
                    style={{ fontSize: "13px" }}
                  >
                    De quelle façon vendez-vous vos produits?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="type_vente"
                    id="type_vente"
                    value={catalogue.type_vente}
                    onChange={(e) => handleMultiSelect("type_vente", e)}
                  >
                    <option value="Détaillant">Détaillant</option>
                    <option value=" Grossiste"> Grossiste</option>
                  </select>
                </div>
              </div>
              <div className="row form-boxes">
                <div className="col-md-5">
                  {" "}
                  <label htmlFor="nombre_employés" style={{ fontSize: "13px" }}>
                    Les produits que vous achetez sont:
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="produit_achete"
                    id="produit_achete"
                    value={catalogue.type_vente}
                    onChange={(e) => handleMultiSelect("produit_achete", e)}
                  >
                    <option value="Importés"> Importés</option>
                    <option value=" Locaux"> Locaux</option>
                  </select>
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="nombre_employés" style={{ fontSize: "13px" }}>
                    De quelle façon distribuez-vous vos produits?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <select
                    name="distribution"
                    id="distribution"
                    value={catalogue.type_vente}
                    onChange={(e) => handleMultiSelect("distribution", e)}
                  >
                    <option value="Local"> Local</option>
                    <option value="Export"> Export</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-1 d-none d-lg-block position-relative">
              <p className="nm-cat"></p>
            </div>
            <div className="col-md-2 d-none d-lg-block">
              <img
                style={{ marginLeft: "-246px", marginTop: "100px" }}
                src="/imgs/Img.png"
                alt=""
              />
            </div>
          </div>

          <div className="buttons d-flex justify-content-end">
            <div
              className=" d-flex justify-content-center  wrapper-ident  col-12 col-md-2 me-3"
              onClick={() => dispatch(setFormStage(2))}
            >
              <p style={{ fontSize: "16px" }} className="rg-iden">
                Précédent
              </p>
            </div>
            <div
              className=" d-flex justify-content-center  sv-btn col-12 col-md-2 "
              onClick={() => handleSubmit()}
            >
              <p style={{ fontSize: "16px" }} className="suivant-iden">
                Suivant
              </p>
            </div>
          </div>
          {/* <div className="d-flex mt-3 justify-content-end">
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
          </div> */}
        </div>
      </form>
    </>
  );
}

export default Catalogue;
