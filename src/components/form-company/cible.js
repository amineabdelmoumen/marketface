import React from 'react';

function Cible() {
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
                <span className="border rounded px-2 text-black-50">Start-up</span>
                <span className="border rounded px-2 text-black-50">TPE</span>
                <span className="border rounded px-2 text-black-50">PMI</span>
                <span className="border rounded px-2 text-black-50">PME</span>
                <span className="border rounded px-2 text-black-50">GE</span>
              </p>
              <p className="form-boxes">
                <label htmlFor="organisme_taille">
                  Activité opérationnelle:
                </label>
                <span className="border rounded px-2 text-black-50">Matière première</span>
                <span className="border rounded px-2 text-black-50">Transformation</span>
                <span className="border rounded px-2 text-black-50">Distribution</span>
                <span className="border rounded px-2 text-black-50">Revendeur</span>
              </p>
            </div>
          </div>

          {/*Line */}
          <div className="d-flex justify-content-end">
            <button type="button" className="btn pointer btn-outline-success rounded-pill px-4">
              Enregistrer et ajouter
            </button>
            <button type="button" className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5">
              Suivant
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Cible;