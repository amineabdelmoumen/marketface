import React from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch} from "react-redux";

function Catalogue() {
  const dispatch = useDispatch()

  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
      >
        <h3>Créez votre E-Catalogue</h3>
        <div className="form-identite-info d-block">
          <div className="row">
            <div className="col-10 offset-2">
              <p className="form-boxes">
                <label htmlFor="vous_etes">Vous êtes:</label>
                <select name="vous_etes" id="vous_etes">
                  <option value="franchisé">franchisé</option>
                  <option value="franchiseur">franchiseur</option>
                  <option value="aucun">aucun</option>
                </select>
              </p>
              <p className="form-boxes">
                <label htmlFor="activite">Quelle est votre activité opérationnelle?</label>
                <span className="border rounded px-2 text-black-50">matière première</span>
                <span className="border rounded px-2 text-black-50">transformation</span>
                <span className="border rounded px-2 text-black-50">distribution</span>
                <span className="border rounded px-2 text-black-50">Revendeur</span>
              </p>

              <p className="form-boxes">
                <label htmlFor="prenom_nome">Quel est le type de business que vous entreprenez?</label>
                <span className="border rounded px-2 text-black-50">B2B</span>
                <span className="border rounded px-2 text-black-50">B2C</span>
                <span className="border rounded px-2 text-black-50">B2G</span>
              </p>
              <p className="form-boxes">
                <label htmlFor="prenom_nome">
                  Où sont localisées vos activités?
                </label>
                <span className="border rounded px-2 text-black-50">Offshore</span>
                <span className="border rounded px-2 text-black-50">Onshore</span>
                <span className="border rounded px-2 text-black-50">Nearshore</span>
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_type">
                  Quel moyen utilisez-vous pour vendre vos services?
                </label>
                <span className="border rounded px-2 text-black-50">En ligne</span>
                <span className="border rounded px-2 text-black-50">En magasin</span>
                <span className="border rounded px-2 text-black-50">En usine</span>
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_taille">
                  De quelle façon vendez-vous vos produits
                </label>
                <span className="border rounded px-2 text-black-50">Détaillant</span>
                <span className="border rounded px-2 text-black-50">Grossiste</span>
              </p>
              <p className="form-boxes">
                <label htmlFor="nombre_employés">Les produits que vous achetez sont:</label>
                <span className="border rounded px-2 text-black-50">Importés</span>
                <span className="border rounded px-2 text-black-50">Locaux</span>
              </p>
              <p className="form-boxes">
                <label htmlFor="nombre_employés">De quelle façon distribuez-vous vos produits?</label>
                <span className="border rounded px-2 text-black-50">Local</span>
                <span className="border rounded px-2 text-black-50">Export</span>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4">
              Enregistrer et ajouter
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5" onClick={() => dispatch(setFormStage(4))}>
              Suivant
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Catalogue;