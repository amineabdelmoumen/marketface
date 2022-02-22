import React, {useState} from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch} from "react-redux";
import Select from 'react-select';

const regions = [
  {
    value: 'Tangier-Tétouan-Al Houceima',
    label: 'Tangier-Tétouan-Al Houceima',
  },
  {
    value: 'Oriental',
    label: 'Oriental',
  },
  {
    value: 'Fez-Meknès',
    label: 'Fez-Meknès',
  },
  {
    value: 'Rabat-Salé-Kénitra',
    label: 'Rabat-Salé-Kénitra',
  },
  {
    value: 'Beni Mellal-Khenifra',
    label: 'Beni Mellal-Khenifra',
  },
  {
    value: 'Settat-Casablanca',
    label: 'Settat-Casablanca',
  },
  {
    value: 'Marrakech-Safi',
    label: 'Marrakech-Safi',
  },
  {
    value: 'Drâa-Tafilalt',
    label: 'Drâa-Tafilalt',
  },
  {
    value: 'Souss-Massa',
    label: 'Souss-Massa',
  },
  {
    value: 'Guelmim-Oued Noun',
    label: 'Guelmim-Oued Noun',
  },
  {
    value: 'Lâayoune-Sakia El Hamra',
    label: 'Lâayoune-Sakia El Hamra',
  },
  {
    value: 'Dakhla-Oued Eddahab',
    label: 'Dakhla-Oued Eddahab',
  },
];

const activites = [
  {
    value: "Agriculture, Sylviculture Et Pêche",
    label: "Agriculture, Sylviculture Et Pêche"
  },
  {
    value: "Industries Extractives",
    label: "Industries Extractives"
  },
  {
    value: "Industrie Manufacturière",
    label: "Industrie Manufacturière"
  },
  {
    value: "Production Et Distribution D'électricité, De Gaz, De Vapeur Et D'air Conditionné",
    label: "Production Et Distribution D'électricité, De Gaz, De Vapeur Et D'air Conditionné"
  },
  {
    value: "Production Et Distribution D'eau ; Assainissement, Gestion Des Déchets Et Dépollution ",
    label: "Production Et Distribution D'eau ; Assainissement, Gestion Des Déchets Et Dépollution "
  },
  {
    value: "Construction",
    label: "Construction"
  },
  {
    value: "Commerce ; Réparation D'automobiles Et De Motocycles",
    label: "Commerce ; Réparation D'automobiles Et De Motocycles"
  },
  {
    value: "Transports Et Entreposage",
    label: "Transports Et Entreposage"
  },
  {
    value: "Hébergement Et Restauration",
    label: "Hébergement Et Restauration"
  },
  {
    value: "Information Et Communication",
    label: "Information Et Communication"
  },
  {
    value: "Activités Financières Et D'assurance",
    label: "Activités Financières Et D'assurance"
  },
  {
    value: "Activités Immobilières",
    label: "Activités Immobilières"
  },
  {
    value: "Activités Spécialisées, Scientifiques Et Techniques",
    label: "Activités Spécialisées, Scientifiques Et Techniques"
  },
  {
    value: "Activités De Services Administratifs Et De Soutien",
    label: "Activités De Services Administratifs Et De Soutien"
  },
  {
    value: "Administration Publique",
    label: "Administration Publique"
  },
  {
    value: "Enseignement",
    label: "Enseignement"
  },
  {
    value: "Santé Humaine Et Action Sociale",
    label: "Santé Humaine Et Action Sociale"
  },
  {
    value: "Arts, Spectacles Et Activités Récréatives",
    label: "Arts, Spectacles Et Activités Récréatives"
  },
  {
    value: "Autres Activités De Services",
    label: "Autres Activités De Services"
  },
  {
    value: "Activités Extra-Territoriales",
    label: "Activités Extra-Territoriales"
  },
];

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
                <Select isMulti options={regions}></Select>
              </p>
              <p className="form-boxes">
                <label htmlFor="activite">Activité:</label>
                <Select isMulti options={activites}></Select>
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
            <a href="/profil/save" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5">
              Suivant
            </a>
          </div>
        </div>
      </form>
    </>
  )
}

export default Cible;