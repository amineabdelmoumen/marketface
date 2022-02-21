import React, {useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch} from "react-redux";

function Cible() {
  const dispatch = useDispatch()
  const [taille, setTaille] = useState('')
  const [activite, setActivite] = useState('')
  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
      >
        <h3>Identifiez votre cible</h3>
        <div className="form-identite-info d-block">

          <h5 className="text-center text-primary">Identifiez votre cible, vous aurez ainsi plus de chance de décrocher des opportunités d'affaires</h5>
          <div className="row">
            <div className="col-10">

              <p className="form-boxes">
                <label htmlFor="cherche">
                  Que cherchez vous?
                </label>
                <select name="cherche" id="cherche">
                  <option value="Clients">Clients</option>
                  <option value="Fournisseurs">Fournisseurs</option>
                  <option value="Prestataire">Prestataire</option>
                </select>
              </p>
              <p className="form-boxes">
                <label htmlFor="zone">Zone géographique</label>
                <input
                  type="text"
                  id="zone"
                  name="zone"
                />
              </p>
              <p className="form-boxes">
                <label htmlFor="selected_zone">Mes sélections:</label>
                <select name="selected_zone" id="selected_zone">

                </select>
              </p>
              <p className="form-boxes">
                <label htmlFor="activite">Activité:</label>
                <input type="text" id="activite" name="activite" />
              </p>
              <p className="form-boxes">
                <label htmlFor="selected_activity">
                  Mes sélections
                </label>
                <input type="text" id="selected_activity" name="selected_activity" />
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_type">
                  Taille d'entreprise:
                </label>
                <div>
                  <label htmlFor="startup"
                         className={`border rounded px-2 cursor-pointer ${taille == 'Start-up' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Start-up
                    <input type="checkbox" name="moyen" id="startup" value="Start-up" className="d-none"
                           onChange={(e) => setTaille(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="tpe"
                         className={`border rounded px-2 cursor-pointer ${taille == 'TPE' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    TPE
                    <input type="checkbox" name="moyen" id="tpe" value="TPE" className="d-none"
                           onChange={(e) => setTaille(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="pmi"
                         className={`border rounded px-2 cursor-pointer ${taille == 'PMI' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    PMI
                    <input type="checkbox" name="moyen" id="pmi" value="PMI" className="d-none"
                           onChange={(e) => setTaille(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="pme"
                         className={`border rounded px-2 cursor-pointer ${taille == 'PME' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    PME
                    <input type="checkbox" name="moyen" id="pme" value="PME" className="d-none"
                           onChange={(e) => setTaille(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="ge"
                         className={`border rounded px-2 cursor-pointer ${taille == 'GE' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    GE
                    <input type="checkbox" name="moyen" id="ge" value="GE" className="d-none"
                           onChange={(e) => setTaille(e.target.value)}/>
                  </label>
                </div>
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_taille">
                  Activité opérationnelle:
                </label>
                <div>
                  <label htmlFor="matiere_premiere"
                         className={`border rounded px-2 cursor-pointer ${activite == 'Matière première' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Matière première
                    <input type="checkbox" name="moyen" id="matiere_premiere" value="Matière première" className="d-none"
                           onChange={(e) => setActivite(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="transformation"
                         className={`border rounded px-2 cursor-pointer ${activite == 'Transformation' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Transformation
                    <input type="checkbox" name="moyen" id="transformation" value="Transformation" className="d-none"
                           onChange={(e) => setActivite(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="distribution"
                         className={`border rounded px-2 cursor-pointer ${activite == 'Distribution' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Distribution
                    <input type="checkbox" name="moyen" id="distribution" value="Distribution" className="d-none"
                           onChange={(e) => setActivite(e.target.value)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="revendeur"
                         className={`border rounded px-2 cursor-pointer ${activite == 'Revendeur' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Revendeur
                    <input type="checkbox" name="moyen" id="revendeur" value="Revendeur" className="d-none"
                           onChange={(e) => setActivite(e.target.value)}/>
                  </label>
                </div>
              </p>
            </div>
          </div>

          {/*Line */}
          <div className="d-flex justify-content-end">
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(3))}>
              Précédent
            </button>
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4 ms-4">
              Enregistrer et ajouter
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Cible;