import React from 'react';
import {setFormStage} from "../../store/rootSlice";
import {useDispatch, useSelector} from "react-redux";
import Select from 'react-select';
import {setCible} from "../../store/profileSlice";
import {useNavigate} from "react-router-dom";
import {saveCibles} from "../../lib/crud";

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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cible = useSelector((state) => state.profile.cible)

  const handleInputUpdate = (field, e) => {
    let data = { ...cible }
    data[field] = e.target.value
    dispatch(setCible(data))
  }

  const handleMultiSelect = (field, values) => {
    let data = { ...cible }
    let elements = []
    // eslint-disable-next-line array-callback-return
    values.map((val) => {
      elements.push(val.value)
    })
    data[field] = elements
    dispatch(setCible(data))
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('token')
    saveCibles(cible, token)
      .then(() => {
        navigate('/profil/save')
      })
  }
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

              <div className="form-boxes">
                <label htmlFor="cherche">
                  Que cherchez vous?
                </label>
                <select
                  name="cherche"
                  id="cherche"
                  className="w-50 py-1"
                  value={cible.cherche}
                  onChange={(e) => handleInputUpdate('cherche', e)}
                >
                  <option value="Clients">Clients</option>
                  <option value="Fournisseurs">Fournisseurs</option>
                  <option value="Prestataire">Prestataire</option>
                </select>
              </div>
              <div className="form-boxes">
                <label htmlFor="zone">Zone géographique</label>
                <div className="w-50">
                  <Select isMulti options={regions} onChange={(vals) => handleMultiSelect('regions', vals)}/>
                </div>
              </div>
              <div className="form-boxes">
                <label htmlFor="activite">Activité:</label>
                <div className="w-50">
                  <Select isMulti options={activites} onChange={(vals) => handleMultiSelect('activites', vals)}/>
                </div>
              </div>
              <div className="form-boxes">
                <label htmlFor="taille_entreprise">
                  Taille d'entreprise:
                </label>
                <div>
                  <label htmlFor="startup"
                         className={`border rounded px-2 cursor-pointer ${cible.taille_entreprise === 'Start-up' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Start-up
                    <input type="checkbox" name="moyen" id="startup" value="Start-up" className="d-none"
                           onChange={(e) => handleInputUpdate('taille_entreprise', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="tpe"
                         className={`border rounded px-2 cursor-pointer ${cible.taille_entreprise === 'TPE' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    TPE
                    <input type="checkbox" name="moyen" id="tpe" value="TPE" className="d-none"
                           onChange={(e) => handleInputUpdate('taille_entreprise', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="pmi"
                         className={`border rounded px-2 cursor-pointer ${cible.taille_entreprise === 'PMI' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    PMI
                    <input type="checkbox" name="moyen" id="pmi" value="PMI" className="d-none"
                           onChange={(e) => handleInputUpdate('taille_entreprise', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="pme"
                         className={`border rounded px-2 cursor-pointer ${cible.taille_entreprise === 'PME' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    PME
                    <input type="checkbox" name="moyen" id="pme" value="PME" className="d-none"
                           onChange={(e) => handleInputUpdate('taille_entreprise', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="ge"
                         className={`border rounded px-2 cursor-pointer ${cible.taille_entreprise === 'GE' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    GE
                    <input type="checkbox" name="moyen" id="ge" value="GE" className="d-none"
                           onChange={(e) => handleInputUpdate('taille_entreprise', e)}/>
                  </label>
                </div>
              </div>
              <div className="form-boxes">
                <label htmlFor="activite_oprationnelle">
                  Activité opérationnelle:
                </label>
                <div>
                  <label htmlFor="matiere_premiere"
                         className={`border rounded px-2 cursor-pointer ${cible.activite_oprationnelle === 'Matière première' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Matière première
                    <input type="checkbox" name="moyen" id="matiere_premiere" value="Matière première" className="d-none"
                           onChange={(e) => handleInputUpdate('activite_oprationnelle', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="transformation"
                         className={`border rounded px-2 cursor-pointer ${cible.activite_oprationnelle === 'Transformation' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Transformation
                    <input type="checkbox" name="moyen" id="transformation" value="Transformation" className="d-none"
                           onChange={(e) => handleInputUpdate('activite_oprationnelle', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="distribution"
                         className={`border rounded px-2 cursor-pointer ${cible.activite_oprationnelle === 'Distribution' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Distribution
                    <input type="checkbox" name="moyen" id="distribution" value="Distribution" className="d-none"
                           onChange={(e) => handleInputUpdate('activite_oprationnelle', e)}/>
                  </label>
                </div>
                <div>
                  <label htmlFor="revendeur"
                         className={`border rounded px-2 cursor-pointer ${cible.activite_oprationnelle === 'Revendeur' ? 'bg-secondary text-white': 'text-black-50'}`}>
                    Revendeur
                    <input type="checkbox" name="moyen" id="revendeur" value="Revendeur" className="d-none"
                           onChange={(e) => handleInputUpdate('activite_oprationnelle', e)}/>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/*Line */}
          <div className="d-flex justify-content-end">
            <button type="button" className="btn pointer btn-outline-secondary rounded-pill px-4" onClick={() => dispatch(setFormStage(4))}>
              Précédent
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5" onClick={() => handleSubmit()}>
              Suivant
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Cible;