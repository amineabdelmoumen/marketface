import React from "react";
import { useSelector } from "react-redux";
export default function GeneralInfo() {
  const profil = useSelector((state) => state.profile);
  return (
    <div className="row py-4 px-1 text-font">
      <div className="col-md-6 py-4">
        <div className="row">
          <div className="col-md-6 mt-2">
            <div>
              <p>Franchise :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.catalogue.vous_etes}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Moyen de vente :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.catalogue.type_vente}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Activites Operationnels:</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.ice}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>IF :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>-----------</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 ">
          <div className="col-md-6 mt-2">
            <div>
              <p>Raison social :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>-----------</p>
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-1">
          <div className="col-md-6 mt-2">
            <div>
              <p>Type d'utilisateur :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>Organisme a but lucratif</p>
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
          <div className="col-md-6 mt-2">
            <div>
              <p>siège social :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.siege_social}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Pays :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.pays}</p>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 mt-2">
            <div>
              <p>Ville :</p>
            </div>
          </div>
          <div className="col-md-6 mt-2">
            <div>
              <p>{profil.ville}</p>
            </div>
          </div>
        </div>

        <div className="row mt-5 mb-1">
          <div className="col-md-6 mt-2">
            <div>
              <p>Nature d'organisme:</p>
            </div>
          </div>
          <div className="col-md-3 mt-2">
            <div>
              <p>Coopérative</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
