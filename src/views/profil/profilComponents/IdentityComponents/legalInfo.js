import React from "react";
import { useSelector } from "react-redux";
export default function LegalInfo() {
  const profil = useSelector((state) => state.profile.identite);
  return (
    <div className="row py-4 px-1 text-font">
      <div className="col-md-6 py-4">
        <div className="row">
          <div className="col-md-6 mt-2">
            <div>
              <p>Raison Social :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.raison_ou_nom}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Année de Creation :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.annee_creation}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Statut :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.statut}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Taille D'Organisme :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.taille}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-md-6 mt-2">
            <div>
              <p>Nombres D'employes:</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.nombre_employes}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-1">
          <div className="col-md-6 mt-2">
            <div>
              <p>Type d'organisme :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.type}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 py-4">
        <div className="row">
          <div className="col-md-4 mt-2">
            <div>
              <p>Statut:</p>
            </div>
          </div>
          <div className="col-md-2 mt-2">
            <div>
              <p>{profil.statut}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-2">
            <div>
              <p>RC :</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>------------</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-2">
            <div>
              <p>ICE :</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>------------</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-4 mt-2">
            <div>
              <p>IF :</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>-----------</p>
            </div>
          </div>
        </div>

        <div className="row mt-5 mb-1">
          <div className="col-md-4 mt-2">
            <div>
              <p>Siege social:</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>{profil.siege_social}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-1">
          <div className="col-md-4 mt-2">
            <div>
              <p>Pays:</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>{profil.pays}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-1">
          <div className="col-md-4 mt-2">
            <div>
              <p>Région :</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>{profil.region}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-1">
          <div className="col-md-4 mt-2">
            <div>
              <p>Ville :</p>
            </div>
          </div>
          <div className="col-md-8 mt-2">
            <div>
              <p>{profil.ville}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
