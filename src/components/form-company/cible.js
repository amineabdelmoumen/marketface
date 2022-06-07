import React, { useEffect, useState, useRef } from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setCible } from "../../store/profileSlice";
import { useNavigate } from "react-router-dom";
import { saveCibles } from "../../lib/crud";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cible = useSelector((state) => state.profile.cible);

  const [defaultRegions, setDefaultRegions] = useState([]);
  const [defaultActivites, setDefaultActivites] = useState([]);
  const [loading, setLoading] = useState(true);

  const regionsRef = useRef();
  const activitesRef = useRef();

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

  const showErrors = (errors) => {
    if (errors.regions) {
      regionsRef.current.innerText = errors.regions[0];
    }
    if (errors.activites) {
      activitesRef.current.innerText = errors.activites[0];
    }
  };

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
        navigate("/company-setting/save", { state: { auth: 1 } });
      })
      .catch((err) => {
        let data = err.response.data;
        showErrors(data.errors);
      });
  };
  return (
    <>
      <form className="container" name="form-identite" id="form-identite">
        <div className="d-flex">
          <p className="title-identite" style={{ fontSize: "25px" }}>
            Identifiez votre cible
          </p>
        </div>

        <div className="form-identite-info d-block mt-3">
          <h5 className="section-title" style={{ marginTop: "10px" }}>
            Vous aurez ainsi plus de chance de décrocher des opportunités
            d'affaires
          </h5>
          <div className="row">
            <div className="col-6">
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
              <small
                ref={regionsRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
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
              <small
                ref={activitesRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="taille_entreprise">Taille d'entreprise:</label>
                <select
                  name="cherche"
                  id="cherche"
                  className="w-50 py-1"
                  defaultValue={cible.taille_entreprise}
                  onChange={(e) => handleMultiChoice("taille_entreprise", e)}
                >
                  <option value="Start-up">Start-up</option>
                  <option value="TPE">TPE</option>
                  <option value="PMI">PMI</option>
                  <option value="PME">PME</option>
                  <option value="GE">GE</option>
                </select>
              </div>
              <div className="form-boxes ">
                <label htmlFor="activite_oprationnelle">
                  Activité opérationnelle:
                </label>
                <select
                  name="cherche"
                  id="cherche"
                  className="w-50 py-1"
                  defaultValue={cible.activite_oprationnelle}
                  onChange={(e) =>
                    handleMultiChoice("activite_oprationnelle", e)
                  }
                >
                  <option value="matière première">Matière première</option>
                  <option value="transformation"> Transformation</option>
                  <option value="distribution">Distribution</option>
                  <option value="revendeur">Revendeur</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 offset-lg-2 d-none d-lg-block">
              <div
                className="d-flex justify-content-end align-items-end"
                style={{ height: "269px" }}
              >
                <img
                  style={{ maxWidth: "105%" }}
                  src="/imgs/cible1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="buttons d-flex justify-content-end">
            <div
              className=" d-flex justify-content-center  wrapper-ident  col-12 col-md-2 me-3"
              onClick={() => dispatch(setFormStage(4))}
            >
              <p style={{ fontSize: "16px" }} className="rg-iden">
                Précédent
              </p>
            </div>
            <div
              className=" d-flex justify-content-center  sv-btn col-12 col-md-2 "
              onClick={() => handleSubmit()}
            >
              <p style={{ fontSize: "16px" }} className="suivant-iden">
                Suivant
              </p>
            </div>
          </div>

          {/*Line */}
          {/* <div className="d-flex mt-3 justify-content-end">
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
            </div> */}
        </div>
      </form>
    </>
  );
}

export default Cible;
