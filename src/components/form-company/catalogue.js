import React from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCatalogue } from "../../store/profileSlice";
import { saveCatalogue } from "../../lib/crud";
import { useSnackbar } from "react-simple-snackbar";

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
  return (
    <>
      <form className="container" name="form-identite" id="form-identite">
        <div className="page_number">1/2</div>
        <h4 className="ms-5 text-primary">Créez votre E-Catalogue</h4>
        <div className="form-identite-info d-block">
          <div className="row">
            <div className="col-10 offset-2">
              <div className="form-boxes">
                <label htmlFor="vous_etes">Vous êtes:</label>
                <select
                  name="vous_etes"
                  id="vous_etes"
                  value={catalogue.vous_etes}
                  onChange={(e) => handleInputUpdate("vous_etes", e)}
                >
                  <option value="franchisé">franchisé</option>
                  <option value="franchiseur">franchiseur</option>
                  <option value="aucun">aucun</option>
                </select>
              </div>
              <div className="form-boxes">
                <label htmlFor="activite">
                  Quelle est votre activité opérationnelle?
                </label>
                <div>
                  <label
                    htmlFor="matiere"
                    className={`border rounded px-2 cursor-pointer ${
                      findElement("matière première", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    matière première
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
                <div>
                  <label
                    htmlFor="transformation"
                    className={`border rounded px-2 cursor-pointer ${
                      findElement("transformation", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    transformation
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
                <div>
                  <label
                    htmlFor="distribution"
                    className={`border rounded px-2 cursor-pointer ${
                      findElement("distribution", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    distribution
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
                <div>
                  <label
                    htmlFor="revendeur"
                    className={`border rounded px-2 cursor-pointer ${
                      findElement("revendeur", catalogue.matiere)
                        ? "bg-secondary text-white"
                        : "text-black-50"
                    }`}
                  >
                    revendeur
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

              <div className="form-boxes">
                <label htmlFor="prenom_nome">
                  Quel est le type de business que vous entreprenez?
                </label>
                <div>
                  <label
                    htmlFor="b2b"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="b2c"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="b2g"
                    className={`border rounded px-2 cursor-pointer ${
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
              <div className="form-boxes">
                <label htmlFor="prenom_nome">
                  Où sont localisées vos activités?
                </label>
                <div>
                  <label
                    htmlFor="offshore"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="onshore"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="nearshore"
                    className={`border rounded px-2 cursor-pointer ${
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
              <div className="form-boxes">
                <label htmlFor="organisme_type">
                  Quel moyen utilisez-vous pour vendre vos services?
                </label>
                <div>
                  <label
                    htmlFor="online"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="magasin"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="usine"
                    className={`border rounded px-2 cursor-pointer ${
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
              <div className="form-boxes">
                <label htmlFor="organisme_taille">
                  De quelle façon vendez-vous vos produits?
                </label>
                <div>
                  <label
                    htmlFor="detaillant"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="grossiste"
                    className={`border rounded px-2 cursor-pointer ${
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
              </div>
              <div className="form-boxes">
                <label htmlFor="nombre_employés">
                  Les produits que vous achetez sont:
                </label>
                <div>
                  <label
                    htmlFor="importes"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="locaux"
                    className={`border rounded px-2 cursor-pointer ${
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
              </div>
              <div className="form-boxes">
                <label htmlFor="nombre_employés">
                  De quelle façon distribuez-vous vos produits?
                </label>
                <div>
                  <label
                    htmlFor="local"
                    className={`border rounded px-2 cursor-pointer ${
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
                <div>
                  <label
                    htmlFor="export"
                    className={`border rounded px-2 cursor-pointer ${
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
          </div>
        </div>
      </form>
    </>
  );
}

export default Catalogue;
