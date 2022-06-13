import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setIdentite } from "../../store/profileSlice";
import { saveCompany, saveImages } from "../../lib/crud";
import types from "../../lib/constants/types";
import years from "../../lib/constants/years";
import statusList from "../../lib/constants/status";
import activites from "../../lib/constants/activites";
import regions from "../../lib/constants/regions";
import villes from "../../lib/constants/villes";
import "./styles.scss";

const form = new FormData();
let uploadForm = new FormData();

function Identite() {
  const dispatch = useDispatch();
  const identite = useSelector((state) => state.profile.identite);
  const webRef = useRef();
  const raisonRef = useRef();
  const activiteRef = useRef();
  const statutRef = useRef();
  const iceRef = useRef();
  const anneeRef = useRef();
  const typeRef = useRef();
  const tailleRef = useRef();
  const employesRef = useRef();
  const capitalRef = useRef();
  const chiffreAffairesRef = useRef();
  const siegeRef = useRef();
  const regionRef = useRef();
  const villeRef = useRef();
  const paysRef = useRef();
  const phoneRef = useRef();
  const logoRef = useRef();

  const organismeSize = ["Start-up", "TPE", "PME", "PMI", "GE"];
  const nombreEmployes = ["De 1 à 10", "De 10 à 250", "Plus de 250"];
  const chaiffreDafaireList = ["< 10 MDhs", "< 75 MDhs", "> 75 MDhs"];

  const handleSubmit = (e) => {
    e.preventDefault(); // stop form submission
  };
  const handleInputChange = (field, e) => {
    let data = { ...identite };
    data[field] = e.target.value;
    form.set(field, e.target.value);
    dispatch(setIdentite(data));
  };
  const handleChooseFile = () => {
    const inputElement = document.getElementById("logo-input");
    inputElement.click();
  };
  const uploadLogo = (event) => {
    const token = localStorage.getItem("token");
    const file = event.files[0];
    let data = { ...identite };
    uploadForm.set("logo", file);
    saveImages(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();
      data["logo"] = response.path;
      dispatch(setIdentite(data));
    });
  };

  async function save() {
    const token = localStorage.getItem("token");
    await saveCompany(identite, token);
  }

  function nextPage() {
    const token = localStorage.getItem("token");
    saveCompany(identite, token)
      .then(() => {
        dispatch(setFormStage(2));
      })
      .catch((err) => {
        let data = err.response.data;
        showErrors(data.errors);
      });
  }

  const showErrors = (errors) => {
    raisonRef.current.innerText = errors.raison_ou_nom
      ? errors.raison_ou_nom[0]
      : "";
    activiteRef.current.innerText = errors.activite ? errors.activite[0] : "";
    statutRef.current.innerText = errors.statut ? errors.statut[0] : "";
    anneeRef.current.innerText = errors.annee_creation
      ? errors.annee_creation[0]
      : "";
    iceRef.current.innerText = errors.ice ? errors.ice[0] : "";
    typeRef.current.innerText = errors.type ? errors.type[0] : "";
    tailleRef.current.innerText = errors.taille ? errors.taille[0] : "";
    employesRef.current.innerText = errors.nombre_employes
      ? errors.nombre_employes[0]
      : "";
    capitalRef.current.innerText = errors.capital ? errors.capital[0] : "";
    chiffreAffairesRef.current.innerText = errors.chiffre_affaire
      ? errors.chiffre_affaire[0]
      : "";
    siegeRef.current.innerText = errors.siege_social
      ? errors.siege_social[0]
      : "";
    regionRef.current.innerText = errors.region ? errors.region[0] : "";
    villeRef.current.innerText = errors.ville ? errors.ville[0] : "";
    paysRef.current.innerText = errors.pays ? errors.pays[0] : "";
    phoneRef.current.innerText = errors.telephone ? errors.telephone[0] : "";
    logoRef.current.innerText = errors.logo ? errors.logo[0] : "";
    webRef.current.innerText = errors.website ? errors.website[0] : "";
  };

  return (
    <>
      <form
        className="container"
        name="form-identite"
        id="form-identite"
        onSubmit={handleSubmit}
      >
        <div className="d-flex ">
          <p className="title-identite" style={{ fontSize: "25px" }}>
            Dites-nous plus sur vous
          </p>
        </div>

        <div className="logo">
          <p className="title">*Inserez votre logo</p>
          <p className="icon-img">
            {identite.logo ? (
              <img
                src={`${process.env.REACT_APP_HOST_URL}/${identite.logo}`}
                className="icon-img-img"
                alt=""
              />
            ) : (
              <Icon id="icon-ingerprint" icon="bi:fingerprint" />
            )}
          </p>
          <input
            onChange={(e) => uploadLogo(e.target)}
            hidden
            id="logo-input"
            type="file"
          />
          <div
            onClick={handleChooseFile}
            className="d-flex justify-content-between"
            style={{ cursor: "pointer" }}
          >
            <img src="/imgs/file1.png" alt="" />
            <p className="fl-up" style={{ fontSize: "12px" }}>
              choisir un fichier
            </p>
          </div>
          <small
            ref={logoRef}
            className="text-danger ms-2 d-block"
            style={{ "font-size": "10px", marginTop: "6px" }}
          ></small>
        </div>
        <div className="form-identite-info">
          {/*Information legal */}
          <section>
            <p className="section-title">Informations légales</p>
            <div className="form-boxes">
              <label htmlFor="prenom_nom">
                *Raison sociale / prénom et nom:
              </label>
              <input
                type="text"
                id="prenom_nom"
                name="prenom_nom"
                onChange={(e) => handleInputChange("raison_ou_nom", e)}
                defaultValue={identite.raison_ou_nom}
              />
            </div>
            <small
              ref={raisonRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="activite">*Activité:</label>
              <select
                name="activite"
                id="activite"
                onChange={(e) => handleInputChange("activite", e)}
                defaultValue={identite.activite}
              >
                {activites.map((activite) => {
                  return <option value={activite}>{activite}</option>;
                })}
              </select>
            </div>
            <small
              ref={activiteRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            />
            <div className="form-boxes">
              <label htmlFor="statut">*Statut:</label>
              <select
                name="statut"
                id="statut"
                onChange={(e) => handleInputChange("statut", e)}
                defaultValue={identite.statut}
              >
                {statusList.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <small
              ref={statutRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="ice">*ICE:</label>
              <input
                type="number"
                min="0"
                id="ice"
                name="ice"
                onChange={(e) => handleInputChange("ice", e)}
                defaultValue={identite.ice}
              />
            </div>
            <small
              ref={iceRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="annee">
                L'année de création de votre organisme:
              </label>
              <select
                name="annee"
                id="annee"
                onChange={(e) => handleInputChange("annee_creation", e)}
                defaultValue={identite.annee_creation}
              >
                {years.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <small
              ref={anneeRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="organisme_type">
                *Le type de votre organisme:
              </label>
              <select
                name="organisme_type"
                id="organisme_type"
                onChange={(e) => handleInputChange("type", e)}
                defaultValue={identite.type}
              >
                {types.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <small
              ref={typeRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="organisme_taille">
                *La taille de votre organisme:
              </label>
              <select
                name="organisme_taille"
                id="organisme_taille"
                onChange={(e) => handleInputChange("taille", e)}
                defaultValue={identite.taille}
              >
                {organismeSize.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <small
              ref={tailleRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="nombre_employés">*Le nombre d'employés:</label>
              <select
                name="nombre_employés"
                id="nombre_employés"
                onChange={(e) => handleInputChange("nombre_employes", e)}
                defaultValue={identite.nombre_employes}
              >
                {nombreEmployes.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <small
              ref={employesRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <p className="info-obg">
              *Les informations obligatoires pour accéder à la plateforme
            </p>
          </section>
          {/*Line */}
          <p className="line"></p>
          {/*Information financier */}
          <section>
            <p className="section-title">Informations financières</p>
            <div className="form-boxes">
              <label htmlFor="capital">*Capital (MAD):</label>

              <input
                type="number"
                min="0"
                id="capital"
                name="capital"
                defaultValue={identite.capital}
                onChange={(e) => handleInputChange("capital", e)}
              />
            </div>
            <small
              ref={capitalRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="chiffre_affaire">Chiffre d'affaires:</label>
              <select
                name="chiffre_affaire"
                id="chiffre_affaire"
                defaultValue={identite.chiffre_affaire}
                onChange={(e) => handleInputChange("chiffre_affaire", e)}
              >
                {chaiffreDafaireList.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </select>
            </div>
            <small
              ref={chiffreAffairesRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <p className="section-title mt-3">Contact:</p>
            <div className="form-boxes">
              <label htmlFor="siege">*Siège social:</label>
              <input
                type="text"
                id="siege"
                name="siege"
                defaultValue={identite.siege_social}
                onChange={(e) => handleInputChange("siege_social", e)}
              />
            </div>
            <small
              ref={siegeRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="region">*Région:</label>
              <select
                name="region"
                id="region"
                defaultValue={identite.region}
                onChange={(e) => handleInputChange("region", e)}
              >
                {regions.map((region) => {
                  return <option value={region}>{region}</option>;
                })}
              </select>
            </div>
            <small
              ref={regionRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="ville">*Ville:</label>
              <select
                name="ville"
                id="ville"
                defaultValue={identite.ville}
                onChange={(e) => handleInputChange("ville", e)}
              >
                {typeof villes[identite.region] != "undefined"
                  ? villes[identite.region].map((ville) => {
                      return <option value={ville}>{ville}</option>;
                    })
                  : ""}
              </select>
            </div>
            <small
              ref={villeRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="pays">*Pays:</label>
              <input
                type="text"
                readOnly
                id="pays"
                name="pays"
                defaultValue={identite.pays}
              />
            </div>
            <small
              ref={paysRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="telephone">*Numéro de téléphone:</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                defaultValue={identite.telephone}
                onChange={(e) => handleInputChange("telephone", e)}
              />
            </div>
            <small
              ref={webRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="form-boxes">
              <label htmlFor="website">*Website:</label>
              <input
                type="text"
                id="website"
                name="website"
                defaultValue={identite.website}
                onChange={(e) => handleInputChange("website", e)}
              />
            </div>
            <small
              ref={webRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
            <div className="buttons d-flex justify-content-end">
              <div
                className=" d-flex justify-content-center  wrapper-ident  col-12 col-md-2 me-3"
                onClick={() => save()}
              >
                <p style={{ fontSize: "16px" }} className="rg-iden">
                  Enregistrer
                </p>
              </div>
              <div
                className=" d-flex justify-content-center  sv-btn col-12 col-md-2 "
                onClick={() => nextPage()}
              >
                <p style={{ fontSize: "16px" }} className="suivant-iden">
                  Suivant
                </p>
              </div>
            </div>
          </section>
        </div>
      </form>
    </>
  );
}

export default Identite;
