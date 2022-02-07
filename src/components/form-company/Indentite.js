import React from "react";
import { Icon } from "@iconify/react";
import "./styles.scss";

function Indentite() {
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
  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
  };
  return (
    <>
      <section className="company-steps-icons">
        <h2>Création de votre profil</h2>

        <div className="steps-icons">
          {/* <p className="line"></p> */}
          <div className="step">
            <p className="step-icon">
              <Icon id="icon-ingerprint" icon="bi:fingerprint" />
            </p>
            <p className="title">Identité</p>
          </div>

          <div className="step">
            <p className="step-icon">
              <Icon id="icon-ingerprint" icon="fa-solid:bullhorn" />
            </p>
            <p className="title">Image de marque</p>
          </div>

          <div className="step">
            <p className="step-icon">
              <Icon id="icon-ingerprint" icon="iconoir:open-in-browser" />
            </p>
            <p className="title">E-Catalogue</p>
          </div>

          <div className="step">
            <p className="step-icon">
              <Icon id="icon-ingerprint" icon="fluent:target-arrow-16-filled" />
            </p>
            <p className="title">Cible</p>
          </div>
        </div>
      </section>
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
            <Icon id="icon-ingerprint" icon="bi:fingerprint" />
          </p>
          <button>Choisir un fichier</button>
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
              <input
                type="text"
                id="prenom_nome"
                name="prenom_nome"
                placeholder="Section"
              />
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
          {/*Information financier */}
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
                placeholder="Casablanca"
              />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Pays:</label>
              <input
                type="text"
                id="prenom_nome"
                name="prenom_nome"
                placeholder="MAROC"
              />
            </p>
            <p className="form-boxes">
              <label htmlFor="prenom_nome">*Numéro de téléphone:</label>
              <input
                type="text"
                id="prenom_nome"
                name="prenom_nome"
                placeholder="+212"
              />
            </p>

            <div className="buttons">
              <button className="register">Enregistrer</button>
              <input className="submit" type="submit" />
            </div>
          </section>
        </div>
      </form>
    </>
  );
}

export default Indentite;
