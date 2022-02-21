import React, {useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch} from "react-redux";

function Catalogue() {
  const dispatch = useDispatch()
  const [matiere, setMatiere] = useState('')
  const [business, setBusiness] = useState('')
  const [location, setLocation] = useState('')
  const [moyen, setMoyen] = useState('')
  const [typeVente, setTypeVente] = useState('')
  const [produitAchete, setProduitAchete] = useState('')
  const [distribution, setDistribution] = useState('')
  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
      >
        <div className="page_number">1/2</div>
        <h4 className="ms-5 text-primary">Créez votre E-Catalogue</h4>
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
                <div>
                  <label htmlFor="matiere"
                         className={`border rounded px-2 cursor-pointer ${matiere == 'matière première' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    matière première
                    <input type="checkbox" name="matiere" id="matiere" value="matière première" className="d-none"
                           onChange={(e) => setMatiere(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="transformation"
                         className={`border rounded px-2 cursor-pointer ${matiere == 'transformation' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    transformation
                    <input type="checkbox" name="matiere" id="transformation" value="transformation" className="d-none"
                           onChange={(e) => setMatiere(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="distribution"
                         className={`border rounded px-2 cursor-pointer ${matiere == 'distribution' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    distribution
                    <input type="checkbox" name="matiere" id="distribution" value="distribution" className="d-none"
                           onChange={(e) => setMatiere(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="revendeur"
                         className={`border rounded px-2 cursor-pointer ${matiere == 'revendeur' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    revendeur
                    <input type="checkbox" name="matiere" id="revendeur" value="revendeur" className="d-none"
                           onChange={(e) => setMatiere(e.target.value)}/>
                  </label>
                </div>
              </p>

              <p className="form-boxes">
                <label htmlFor="prenom_nome">Quel est le type de business que vous entreprenez?</label>
                <div>
                  <label htmlFor="b2b"
                         className={`border rounded px-2 cursor-pointer ${business == 'B2B' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    B2B
                    <input type="checkbox" name="type" id="b2b" value="B2B" className="d-none"
                           onChange={(e) => setBusiness(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="b2c"
                         className={`border rounded px-2 cursor-pointer ${business == 'B2C' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    B2C
                    <input type="checkbox" name="type" id="b2c" value="B2C" className="d-none"
                           onChange={(e) => setBusiness(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="b2g"
                         className={`border rounded px-2 cursor-pointer ${business == 'B2G' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    B2G
                    <input type="checkbox" name="type" id="b2g" value="B2G" className="d-none"
                           onChange={(e) => setBusiness(e.target.value)}/>
                  </label>
                </div>
              </p>
              <p className="form-boxes">
                <label htmlFor="prenom_nome">
                  Où sont localisées vos activités?
                </label>
                <div>
                  <label htmlFor="offshore"
                         className={`border rounded px-2 cursor-pointer ${location == 'Offshore' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Offshore
                    <input type="checkbox" name="location" id="offshore" value="Offshore" className="d-none"
                           onChange={(e) => setLocation(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="onshore"
                         className={`border rounded px-2 cursor-pointer ${location == 'Onshore' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Onshore
                    <input type="checkbox" name="location" id="onshore" value="Onshore" className="d-none"
                           onChange={(e) => setLocation(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="nearshore"
                         className={`border rounded px-2 cursor-pointer ${location == 'Nearshore' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Nearshore
                    <input type="checkbox" name="location" id="nearshore" value="Nearshore" className="d-none"
                           onChange={(e) => setLocation(e.target.value)}/>
                  </label>
                </div>
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_type">
                  Quel moyen utilisez-vous pour vendre vos services?
                </label>
                <div>
                  <label htmlFor="online"
                         className={`border rounded px-2 cursor-pointer ${moyen == 'En ligne' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    En ligne
                    <input type="checkbox" name="moyen" id="online" value="En ligne" className="d-none"
                           onChange={(e) => setMoyen(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="magasin"
                         className={`border rounded px-2 cursor-pointer ${moyen == 'En magasin' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    En magasin
                    <input type="checkbox" name="moyen" id="magasin" value="En magasin" className="d-none"
                           onChange={(e) => setMoyen(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="usine"
                         className={`border rounded px-2 cursor-pointer ${moyen == 'En usine' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    En usine
                    <input type="checkbox" name="moyen" id="usine" value="En usine" className="d-none"
                           onChange={(e) => setMoyen(e.target.value)}/>
                  </label>
                </div>
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_taille">
                  De quelle façon vendez-vous vos produits
                </label>
                <div>
                  <label htmlFor="detaillant"
                         className={`border rounded px-2 cursor-pointer ${typeVente == 'Détaillant' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Détaillant
                    <input type="checkbox" name="moyen" id="detaillant" value="Détaillant" className="d-none"
                           onChange={(e) => setTypeVente(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="grossiste"
                         className={`border rounded px-2 cursor-pointer ${typeVente == 'Grossiste' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Grossiste
                    <input type="checkbox" name="moyen" id="grossiste" value="Grossiste" className="d-none"
                           onChange={(e) => setTypeVente(e.target.value)}/>
                  </label>
                </div>
              </p>
              <p className="form-boxes">
                <label htmlFor="nombre_employés">Les produits que vous achetez sont:</label>
                <div>
                  <label htmlFor="importes"
                         className={`border rounded px-2 cursor-pointer ${produitAchete == 'Importés' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Importés
                    <input type="checkbox" name="moyen" id="importes" value="Importés" className="d-none"
                           onChange={(e) => setProduitAchete(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="locaux"
                         className={`border rounded px-2 cursor-pointer ${produitAchete == 'Locaux' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Locaux
                    <input type="checkbox" name="moyen" id="locaux" value="Locaux" className="d-none"
                           onChange={(e) => setProduitAchete(e.target.value)}/>
                  </label>
                </div>
              </p>
              <p className="form-boxes">
                <label htmlFor="nombre_employés">De quelle façon distribuez-vous vos produits?</label>
                <div>
                  <label htmlFor="local"
                         className={`border rounded px-2 cursor-pointer ${distribution == 'Local' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Local
                    <input type="checkbox" name="distribution" id="local" value="Local" className="d-none"
                           onChange={(e) => setDistribution(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="export"
                         className={`border rounded px-2 cursor-pointer ${distribution == 'Export' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Export
                    <input type="checkbox" name="distribution" id="export" value="Export" className="d-none"
                           onChange={(e) => setDistribution(e.target.value)}/>
                  </label>
                </div>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(2))}>
              Précédent
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