import React, { useEffect, useState } from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setCible } from "../../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { saveCibles } from "../../lib/crud";
import { useSnackbar } from "react-simple-snackbar";
import snackbarStyles from "../../lib/snackbarStyles";

const regions = [
  {
    value: "Tangier-Tétouan-Al Houceima",
    label: "Tangier-Tétouan-Al Houceima",
  },
  {
    value: "Oriental",
    label: "Oriental",
  },
  {
    value: "Fez-Meknès",
    label: "Fez-Meknès",
  },
  {
    value: "Rabat-Salé-Kénitra",
    label: "Rabat-Salé-Kénitra",
  },
  {
    value: "Beni Mellal-Khenifra",
    label: "Beni Mellal-Khenifra",
  },
  {
    value: "Settat-Casablanca",
    label: "Settat-Casablanca",
  },
  {
    value: "Marrakech-Safi",
    label: "Marrakech-Safi",
  },
  {
    value: "Drâa-Tafilalt",
    label: "Drâa-Tafilalt",
  },
  {
    value: "Souss-Massa",
    label: "Souss-Massa",
  },
  {
    value: "Guelmim-Oued Noun",
    label: "Guelmim-Oued Noun",
  },
  {
    value: "Lâayoune-Sakia El Hamra",
    label: "Lâayoune-Sakia El Hamra",
  },
  {
    value: "Dakhla-Oued Eddahab",
    label: "Dakhla-Oued Eddahab",
  },
];

const activites = [
  {
    value: "Agriculture, Sylviculture Et Pêche",
    label: "Agriculture, Sylviculture Et Pêche",
  },
  {
    value: "Industries Extractives",
    label: "Industries Extractives",
  },
  {
    value: "Industrie Manufacturière",
    label: "Industrie Manufacturière",
  },
  {
    value:
      "Production Et Distribution D'électricité, De Gaz, De Vapeur Et D'air Conditionné",
    label:
      "Production Et Distribution D'électricité, De Gaz, De Vapeur Et D'air Conditionné",
  },
  {
    value:
      "Production Et Distribution D'eau ; Assainissement, Gestion Des Déchets Et Dépollution ",
    label:
      "Production Et Distribution D'eau ; Assainissement, Gestion Des Déchets Et Dépollution ",
  },
  {
    value: "Construction",
    label: "Construction",
  },
  {
    value: "Commerce ; Réparation D'automobiles Et De Motocycles",
    label: "Commerce ; Réparation D'automobiles Et De Motocycles",
  },
  {
    value: "Transports Et Entreposage",
    label: "Transports Et Entreposage",
  },
  {
    value: "Hébergement Et Restauration",
    label: "Hébergement Et Restauration",
  },
  {
    value: "Information Et Communication",
    label: "Information Et Communication",
  },
  {
    value: "Activités Financières Et D'assurance",
    label: "Activités Financières Et D'assurance",
  },
  {
    value: "Activités Immobilières",
    label: "Activités Immobilières",
  },
  {
    value: "Activités Spécialisées, Scientifiques Et Techniques",
    label: "Activités Spécialisées, Scientifiques Et Techniques",
  },
  {
    value: "Activités De Services Administratifs Et De Soutien",
    label: "Activités De Services Administratifs Et De Soutien",
  },
  {
    value: "Administration Publique",
    label: "Administration Publique",
  },
  {
    value: "Enseignement",
    label: "Enseignement",
  },
  {
    value: "Santé Humaine Et Action Sociale",
    label: "Santé Humaine Et Action Sociale",
  },
  {
    value: "Arts, Spectacles Et Activités Récréatives",
    label: "Arts, Spectacles Et Activités Récréatives",
  },
  {
    value: "Autres Activités De Services",
    label: "Autres Activités De Services",
  },
  {
    value: "Activités Extra-Territoriales",
    label: "Activités Extra-Territoriales",
  },
  {
    value:
      "Activités Des Ménages En Tant Qu'employeurs ; Activités Indifférenciées Des Ménages En Tant Que Producteurs De Biens Et Services Pour Usage Propre ",
    label:
      "Activités Des Ménages En Tant Qu'employeurs ; Activités Indifférenciées Des Ménages En Tant Que Producteurs De Biens Et Services Pour Usage Propre ",
  },
  {
    value:
      "Activités De Services Administratifs Et De Soutien ou lieu Administration publique",
    label:
      "Activités De Services Administratifs Et De Soutien ou lieu Administration publique",
  },
];

function Cible() {
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarStyles);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cible = useSelector((state) => state.profile.cible);

  const [defaultRegions, setDefaultRegions] = useState([]);
  const [defaultActivites, setDefaultActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      let data = [];
      if (cible.regions && cible.regions.length) {
        cible.regions.forEach((region) => {
          data.push({
            label: region,
            value: region,
          });
        });
        setDefaultRegions(data);
        data = [];
      }
      if (cible.activites && cible.activites.length) {
        cible.activites.forEach((activite) => {
          data.push({
            label: activite,
            value: activite,
          });
        });
        setDefaultActivites(data);
      }
      setLoading(false);
    }
  }, [loading]);

  const handleInputUpdate = (field, e) => {
    let data = { ...cible };
    data[field] = e.target.value;
    dispatch(setCible(data));
  };

  const handleMultiSelect = (field, values) => {
    let data = { ...cible };
    let elements = [];
    // eslint-disable-next-line array-callback-return
    values.map((val) => {
      elements.push(val.value);
    });
    data[field] = elements;
    dispatch(setCible(data));
  };

  const findElement = (element, list) => {
    return list.find((el) => element === el);
  };

  const handleMultiChoice = (field, e) => {
    let data = { ...cible };
    let val = e.target.value;
    if (findElement(val, data[field])) {
      let index = data[field].findIndex((el) => el === val);
      if (index > -1) {
        let list = [...data[field]];
        list.splice(index, 1);
        data[field] = list;
      }
    } else {
      data[field] = [...data[field], val];
    }
    dispatch(setCible(data));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    saveCibles(cible, token)
      .then((res) => res.data)
      .then((data) => {
        dispatch(setCible({ ...cible, id: data.id }));
        navigate("/company-setting/save");
      })
      .catch((err) => {
        let data = err.response.data;
        openSnackbar(
          <ul>
            {Object.values(data.errors).map((errors) =>
              errors.map((error) => <li>{error}</li>)
            )}
          </ul>
        );
      });
  };
  return (
    <>
      {loading ? (
        ""
      ) : (
        <form className="container" name="form-identite" id="form-identite">
          <h3>Identifiez votre cible</h3>
          <div className="form-identite-info d-block">
            <h5 className="text-center text-primary">
              Identifiez votre cible, vous aurez ainsi plus de chance de
              décrocher des opportunités d'affaires
            </h5>
            <div className="row">
              <div className="col-10">
                <div className="form-boxes">
                  <label htmlFor="cherche">Que cherchez vous?</label>
                  <select
                    name="cherche"
                    id="cherche"
                    className="w-50 py-1"
                    defaultValue={cible.cherche}
                    onChange={(e) => handleInputUpdate("cherche", e)}
                  >
                    <option value="Clients">Clients</option>
                    <option value="Fournisseurs">Fournisseurs</option>
                    <option value="Prestataire">Prestataires</option>
                  </select>
                </div>
                <div className="form-boxes">
                  <label htmlFor="zone">Zone géographique</label>
                  <div className="w-50">
                    <Select
                      isMulti
                      options={regions}
                      defaultValue={defaultRegions}
                      onChange={(vals) => handleMultiSelect("regions", vals)}
                    />
                  </div>
                </div>
                <div className="form-boxes">
                  <label htmlFor="activite">Activité:</label>
                  <div className="w-50">
                    <Select
                      isMulti
                      options={activites}
                      defaultValue={defaultActivites}
                      onChange={(vals) => handleMultiSelect("activites", vals)}
                    />
                  </div>
                </div>
                <div className="form-boxes">
                  <label htmlFor="taille_entreprise">
                    Taille d'entreprise:
                  </label>
                  <div>
                    <label
                      htmlFor="startup"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement("Start-up", cible.taille_entreprise)
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      Start-up
                      <input
                        type="checkbox"
                        name="moyen"
                        id="startup"
                        value="Start-up"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("taille_entreprise", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="tpe"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement("TPE", cible.taille_entreprise)
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      TPE
                      <input
                        type="checkbox"
                        name="moyen"
                        id="tpe"
                        value="TPE"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("taille_entreprise", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="pmi"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement("PMI", cible.taille_entreprise)
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      PMI
                      <input
                        type="checkbox"
                        name="moyen"
                        id="pmi"
                        value="PMI"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("taille_entreprise", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="pme"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement("PME", cible.taille_entreprise)
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      PME
                      <input
                        type="checkbox"
                        name="moyen"
                        id="pme"
                        value="PME"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("taille_entreprise", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="ge"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement("GE", cible.taille_entreprise)
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      GE
                      <input
                        type="checkbox"
                        name="moyen"
                        id="ge"
                        value="GE"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("taille_entreprise", e)
                        }
                      />
                    </label>
                  </div>
                </div>
                <div className="form-boxes">
                  <label htmlFor="activite_oprationnelle">
                    Activité opérationnelle:
                  </label>
                  <div>
                    <label
                      htmlFor="matiere_premiere"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement(
                          "Matière première",
                          cible.activite_oprationnelle
                        )
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      Matière première
                      <input
                        type="checkbox"
                        name="moyen"
                        id="matiere_premiere"
                        value="Matière première"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("activite_oprationnelle", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="transformation"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement(
                          "Transformation",
                          cible.activite_oprationnelle
                        )
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      Transformation
                      <input
                        type="checkbox"
                        name="moyen"
                        id="transformation"
                        value="Transformation"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("activite_oprationnelle", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="distribution"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement(
                          "Distribution",
                          cible.activite_oprationnelle
                        )
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      Distribution
                      <input
                        type="checkbox"
                        name="moyen"
                        id="distribution"
                        value="Distribution"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("activite_oprationnelle", e)
                        }
                      />
                    </label>
                  </div>
                  <div>
                    <label
                      htmlFor="revendeur"
                      className={`border rounded px-2 cursor-pointer ${
                        findElement("Revendeur", cible.activite_oprationnelle)
                          ? "bg-secondary text-white"
                          : "text-black-50"
                      }`}
                    >
                      Revendeur
                      <input
                        type="checkbox"
                        name="moyen"
                        id="revendeur"
                        value="Revendeur"
                        className="d-none"
                        onChange={(e) =>
                          handleMultiChoice("activite_oprationnelle", e)
                        }
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/*Line */}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn pointer btn-outline-secondary rounded-pill px-4"
                onClick={() => dispatch(setFormStage(4))}
              >
                Précédent
              </button>
              <button
                type="button"
                className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5"
                onClick={() => handleSubmit()}
              >
                Suivant
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Cible;
