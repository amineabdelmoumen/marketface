import React, { useState, useEffect } from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../store/profileSlice";
import { saveCatalogue } from "../../lib/crud";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Catalogue() {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,

      padding: 20,
      fontSize: "14px",
      fontFamily: "Lato",
      color: "#092d58",
    }),
  };
  const dispatch = useDispatch();
  const catalogue = useSelector((state) => state.profile.catalogue);
  const [defaultBusiness, setDefaultBusiness] = useState([]);
  const [defaultBusiness2, setDefaultBusiness2] = useState([]);

  const [defaultMatieres, setDefaultMatieres] = useState([]);
  const [defaultMatieres2, setDefaultMatieres2] = useState([]);
  const [defaultLocations, setDefaultLocations] = useState([]);
  const [defaultLocations2, setDefaultLocations2] = useState([]);

  const [defaultMoyens, setDefaultMoyens] = useState([]);
  const [defaultMoyens2, setDefaultMoyens2] = useState([]);
  const [defaultTypes, setDefaultTypes] = useState([]);
  const [defaultTypes2, setDefaultTypes2] = useState([]);

  const [defaultProduits, setDefaultProduits] = useState([]);
  const [defaultProduits2, setDefaultProduits2] = useState([]);

  const [defaultDistribution, setDefaultDistribution] = useState([]);
  const [defaultDistribution2, setDefaultDistribution2] = useState([]);
  const [loading, setLoading] = useState(true);
  const business = [
    { value: "B2B", label: "B2B" },
    { value: "B2C", label: "B2C" },
    { value: "B2G", label: "B2G" },
  ];
  const matieres = [
    { value: "Matière première", label: "Matière première" },
    { value: "Distribution", label: "Distribution" },
    { value: "Revendeur", label: "Revendeur" },
    { value: "Transformation", label: "Transformation" },
  ];
  const locations = [
    { value: "offshore", label: "Offshore" },
    { value: "onshore", label: "Onshore" },
    { value: "nearshore", label: "Nearshore" },
  ];
  const moyens = [
    { value: "En ligne", label: "En ligne" },
    { value: "En magasin", label: "En magasin" },
    { value: "En usine", label: "En usine" },
  ];
  const typesVents = [
    { value: "Détaillant", label: "Détaillant" },
    { value: "Grossiste", label: "Grossiste" },
  ];

  const produits = [
    { value: "Importés", label: "Importés" },
    { value: "Locaux", label: "Locaux" },
  ];
  const distribution = [
    { value: "Local", label: "Local" },
    { value: "Export", label: "Export" },
  ];
  useEffect(() => {
    let data = [];
    if (catalogue.business && catalogue.business.length) {
      catalogue.business.forEach((business) => {
        data.push({
          label: business,
          value: business,
        });
      });
      setDefaultBusiness2(data);
      data = [];
    } else {
      setDefaultBusiness2([]);
    }
  }, [defaultBusiness]);
  useEffect(() => {
    let data = [];
    if (catalogue.matiere && catalogue.matiere.length) {
      catalogue.matiere.forEach((matiere) => {
        data.push({
          label: matiere,
          value: matiere,
        });
      });
      setDefaultMatieres2(data);
      data = [];
    } else {
      setDefaultMatieres2([]);
    }
  }, [defaultMatieres]);
  useEffect(() => {
    let data = [];
    if (catalogue.location && catalogue.location.length) {
      catalogue.location.forEach((location) => {
        data.push({
          label: location,
          value: location,
        });
      });
      setDefaultLocations2(data);
      data = [];
    } else {
      setDefaultLocations2([]);
    }
  }, [defaultLocations]);
  useEffect(() => {
    let data = [];
    if (catalogue.moyen && catalogue.moyen.length) {
      catalogue.moyen.forEach((moyen) => {
        data.push({
          label: moyen,
          value: moyen,
        });
      });
      setDefaultMoyens2(data);
      data = [];
    } else {
      setDefaultMoyens2([]);
    }
  }, [defaultMoyens]);

  useEffect(() => {
    let data = [];
    if (catalogue.type_vente && catalogue.type_vente.length) {
      catalogue.type_vente.forEach((type) => {
        data.push({
          label: type,
          value: type,
        });
      });
      setDefaultTypes2(data);
      data = [];
    } else {
      setDefaultTypes2([]);
    }
  }, [defaultTypes]);

  useEffect(() => {
    let data = [];
    if (catalogue.produit_achete && catalogue.produit_achete.length) {
      catalogue.produit_achete.forEach((prod) => {
        data.push({
          label: prod,
          value: prod,
        });
      });
      setDefaultProduits2(data);
      data = [];
    } else {
      setDefaultProduits2([]);
    }
  }, [defaultProduits]);
  useEffect(() => {
    let data = [];
    if (catalogue.distribution && catalogue.distribution.length) {
      catalogue.distribution.forEach((distr) => {
        data.push({
          label: distr,
          value: distr,
        });
      });
      setDefaultDistribution2(data);
      data = [];
    } else {
      setDefaultDistribution2([]);
    }
  }, [defaultDistribution]);

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
  const handleMultiSelect = (field, values) => {
    let data = { ...catalogue };
    let elements = [];
    // eslint-disable-next-line array-callback-return

    values.map((val) => {
      elements.push(val.value);
    });

    data[field] = elements;
    dispatch(setCatalogue(data));
    let selectedElements = [];
    if (catalogue.field && catalogue.field.length) {
      catalogue[field].forEach((elem) => {
        selectedElements.push({
          label: elem,
          value: elem,
        });
      });
    }
    if (field == "business") {
      setDefaultBusiness(selectedElements);
      console.log(defaultBusiness);
      selectedElements = [];
    }

    if (field == "matiere") {
      setDefaultMatieres(selectedElements);
      selectedElements = [];
    }
    if (field == "location") {
      setDefaultLocations(selectedElements);
      selectedElements = [];
    }
    if (field == "moyen") {
      setDefaultMoyens(selectedElements);
      selectedElements = [];
    }
    if (field == "type_vente") {
      setDefaultTypes(selectedElements);
      selectedElements = [];
    }
    if (field == "produit_achete") {
      setDefaultProduits(selectedElements);
      selectedElements = [];
    }
    if (field == "distribution") {
      setDefaultDistribution(selectedElements);
      selectedElements = [];
    }
  };

  const findElement = (element, list) => {
    return list.find((el) => element === el);
  };
  /*  const handleMultiSelect = (field, e) => {
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
  }; */
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
            <div className="col-md-7">
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
                    style={{ width: "100%", height: "40px" }}
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
                  <Select
                    isMulti
                    styles={customStyles}
                    options={matieres}
                    value={defaultMatieres2 == [] ? [{}] : defaultMatieres2}
                    onChange={(vals) => handleMultiSelect("matiere", vals)}
                  />
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
                  <Select
                    isMulti
                    styles={customStyles}
                    options={business}
                    value={defaultBusiness2 == [] ? [{}] : defaultBusiness2}
                    onChange={(vals) => handleMultiSelect("business", vals)}
                  />
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="prenom_nome" style={{ fontSize: "13px" }}>
                    Où sont localisées vos activités?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <Select
                    styles={customStyles}
                    isMulti
                    options={locations}
                    value={defaultLocations2 == [] ? [{}] : defaultLocations2}
                    onChange={(vals) => handleMultiSelect("location", vals)}
                  />
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="organisme_type " style={{ fontSize: "13px" }}>
                    Quel moyen utilisez-vous pour vendre vos services?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <Select
                    styles={customStyles}
                    isMulti
                    options={moyens}
                    value={defaultMoyens2 == [] ? [{}] : defaultMoyens2}
                    onChange={(vals) => handleMultiSelect("moyen", vals)}
                  />
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
                  <Select
                    styles={customStyles}
                    isMulti
                    options={typesVents}
                    value={defaultTypes2 == [] ? [{}] : defaultTypes2}
                    onChange={(vals) => handleMultiSelect("type_vente", vals)}
                  />
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
                  <Select
                    styles={customStyles}
                    isMulti
                    options={produits}
                    value={defaultProduits2 == [] ? [{}] : defaultProduits2}
                    onChange={(vals) =>
                      handleMultiSelect("produit_achete", vals)
                    }
                  />
                </div>
              </div>
              <div className=" row form-boxes">
                <div className="col-md-5">
                  <label htmlFor="nombre_employés" style={{ fontSize: "13px" }}>
                    De quelle façon distribuez-vous vos produits?
                  </label>
                </div>
                <div className="col-6 col-lg-6 ">
                  <Select
                    styles={customStyles}
                    isMulti
                    options={distribution}
                    value={
                      defaultDistribution2 == [] ? [{}] : defaultDistribution2
                    }
                    onChange={(vals) => handleMultiSelect("distribution", vals)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1 d-none d-lg-block position-relative">
              <p className="nm-cat"></p>
            </div>
            <div className="col-md-2 d-none d-lg-block">
              <img
                style={{ marginLeft: "-52px", marginTop: "149px" }}
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
