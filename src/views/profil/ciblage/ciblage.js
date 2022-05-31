import React from "react";
import Layout from "../Layout";
import "./styles.scss";
export default function Ciblage() {
  return (
    <div>
      <Layout>
        <div className="col-md-8 offset-md-2 ">
          <div className="d-flex justify-content-center ciblage">
            Créer un nouveaux ciblage
          </div>
          <div classname="row ">
            <div className="ciblage-info p-4 mt-4">
              <div className="row form-boxes">
                <label className="col-md-5 mt-2">Nom du Ciblage</label>
                <div className="col-md-7">
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="Donner un nom a votre cible"
                  />
                </div>
              </div>
              <div className="row form-boxes">
                <label className="col-md-5 mt-2">Membres de l'équipe</label>
                <div className="col-md-7">
                  <input type="text" id="nom" name="nom" placeholder="Tag" />
                </div>
              </div>
              <div className="row form-boxes">
                <label className="col-md-5 mt-2">Description</label>
                <div className="col-md-7 ">
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="description.."
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button className="btn pointer btn-success text-white rounded-pill px-5">
                  Sauvegarder
                </button>
              </div>{" "}
            </div>
          </div>
          <div className="row localisation">
            <label className="d-flex justify-content-start ciblage mt-4">
              Localisation
            </label>
          </div>
          <div className="row">
            <p className="local-text">
              Identifiez et ajouter la ville, région ou pays où se trouve votre
              cible puis sauvegarder
            </p>
            <div className="row form-boxes">
              <p className="col-md-3 local-cible">
                {" "}
                Où se trouve votre cible ?
              </p>
              <div className="col-md-3">
                <select name="" id="">
                  <option value="" disabled selected hidden>
                    {" "}
                    Pays
                  </option>
                </select>
              </div>
              <div className="col-md-3">
                <select name="" id="">
                  <option value="" disabled selected hidden>
                    {" "}
                    Région
                  </option>
                </select>
              </div>
              <div className="col-md-3">
                <select name="" id="">
                  <option value="" disabled selected hidden>
                    {" "}
                    Ville
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
