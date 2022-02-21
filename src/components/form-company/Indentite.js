import React, {useState} from "react";
import { Icon } from "@iconify/react";
import {setFormStage} from "../../store/rootSlice";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {setIdentite} from "../../store/profileSlice";

function Indentite() {
  const dispatch = useDispatch()
  const identite = useSelector((state) => state.profile.identite)
  const activites = [
    "Agriculture, Sylviculture Et Pêche",
    "Industries Extractives",
    "Industrie Manufacturière",
    "Production Et Distribution D'électricité, De Gaz, De Vapeur Et D'air Conditionné",
    "Production Et Distribution D'eau ; Assainissement, Gestion Des Déchets Et Dépollution ",
    "Construction",
    "Commerce ; Réparation D'automobiles Et De Motocycles",
    "Transports Et Entreposage",
    "Hébergement Et Restauration",
    "Information Et Communication",
    "Activités Financières Et D'assurance",
    "Activités Immobilières",
    "Activités Spécialisées, Scientifiques Et Techniques",
    "Activités De Services Administratifs Et De Soutien",
    "Administration Publique",
    "Enseignement",
    "Santé Humaine Et Action Sociale",
    "Arts, Spectacles Et Activités Récréatives",
    "Autres Activités De Services",
    "Activités Extra-Territoriales",
];
  const statutsList = [
    "SARL",
    "SA",
    "SARLAU",
    "SNC",
    "SAS",
    "SCS",
    "SCA",
    "SP",
    "GIE",
    "SCOP",
    "SCIC",
  ];
  const organismeType = [
    "Entreprise",
    "Auto-entrepreneur",
    "Coopérative",
    "Activité Libérale",
    "Etablissement public",
    "Association",
    "Fondation",
    "Fédération",
    "ONG",
    "Autorité/Gouvernement",
  ];

  const organismeSize = ["Start-up", "TPE", "PME", "PMI", "GE"];
  const nombreEmployes = ["De 1 à 10", "De 10 à 250", "Plus de 250"];
  const chaiffreDafaireList = ["< 10 MDhs", "< 75 MDhs", "> 75 MDhs"];

  const [logo, setLogo] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
  };
  const handleChooseFile = () => {
    const inputElement = document.getElementById("logo-input");
    inputElement.click();
  };
  const uploadLogo = (event) => {
    const file = event.files[0];
    const photo = URL.createObjectURL(file)
    setLogo(photo)
  };

  function save() {
    dispatch(setIdentite({}))
  }

  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
        onSubmit={handleSubmit}
      >
        <h3>Dites-nous plus sur vous</h3>
        <div className="logo">
          <p>*Insere votre logo</p>
          <p className="icon-img">
            {
              logo ?
                <img src={logo} width={40} />
                :
                <Icon id="icon-ingerprint" icon="bi:fingerprint" />
            }
          </p>
          <input
            onChange={(e) => uploadLogo(e.target)}
            hidden
            id="logo-input"
            type="file"
          />
          <button onClick={handleChooseFile} className="pointer">
            Choisir un fichier
          </button>
        </div>
        <div className="form-identite-info">
          {/*Information legal */}
          <section>
            <p className="section-title">Informations légales</p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">
                *Raison social / prenom et nom:
              </label>
              <input type="text" id="prenom_nome" name="prenom_nome" />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Activité:</label>
              <select name="" id="">
                {
                  activites.map((activite) => {
                    return (
                      <option value={activite}>{activite}</option>
                    )
                  })
                }
              </select>
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Statut:</label>
              <select name="statut" id="statu">
                {statutsList.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*ICE:</label>
              <input type="text" id="prenom_nome" name="prenom_nome" />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">
                L'année de création de votre organisme:
              </label>
              <input type="annee" id="annee" name="annee" />
            </p>
            <p className="form-boxes">
              <label htmlFor="organisme_type">
                *Le type de votre organisme:
              </label>
              <select name="organisme_type" id="organisme_type">
                {organismeType.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </p>
            <p className="form-boxes">
              <label htmlFor="organisme_taille">
                *La taille de votre organisme:
              </label>
              <select name="organisme_taille" id="organisme_taille">
                {organismeSize.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </p>
            <p className="form-boxes">
              <label htmlFor="nombre_employés">*Le nombre d'employés:</label>
              <select name="organisme_taille" id="organisme_taille">
                {nombreEmployes.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </p>
            <p className="info-obg">
              *Les informations obligatoire pour accéder à la plateforme
            </p>
          </section>
          {/*Line */}
          <p className="line"></p>
          {/*Information financier */}
          <section>
            <p className="section-title">Informations financières</p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Capital:</label>
              <input type="text" id="prenom_nome" name="prenom_nome" />
            </p>
            <p className="form-boxes">
              <label htmlFor="chiffre_affaire">Chiffre d'affaires:</label>
              <select name="organisme_taille" id="organisme_taille">
                {chaiffreDafaireList.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </p>
            <p className="section-title">Contact:</p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Siège social:</label>
              <input type="text" id="prenom_nome" name="prenom_nome" />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Région:</label>
              <input type="text" id="prenom_nome" name="prenom_nome" />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Ville:</label>
              <input
                type="text"
                id="prenom_nome"
                name="prenom_nome"
              />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Pays:</label>
              <input
                type="text"
                id="prenom_nome"
                name="prenom_nome"
              />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Numéro de téléphone:</label>
              <input
                type="text"
                id="prenom_nome"
                name="prenom_nome"
              />
            </p>

            <div className="buttons">
              <button type="button" className="btn pointer btn-outline-success rounded-pill px-4" onClick={() => save()}>
                Enregistrer
              </button>
              <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4" onClick={() => dispatch(setFormStage(2))}>
                Suivant
              </button>
            </div>
          </section>
        </div>
      </form>
    </>
  );
}

export default Indentite;
