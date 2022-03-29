import React, { useRef, useState } from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMarque, setReferences } from "../../store/profileSlice";
import categories from "../../lib/constants/categories";
import years from "../../lib/constants/years";
import { deleteReference, saveImages, saveReference } from "../../lib/crud";

let uploadForm = new FormData();

function Marque() {
  const dispatch = useDispatch();
  const marque = useSelector((state) => state.profile.marque);
  const references = useSelector((state) => state.profile.references);
  const [index, setIndex] = useState(-1);
  const [isFullDescription, setIsFullDescription] = useState(false);
  const titreRef = useRef();
  const anneeRef = useRef();
  const descriptionRef = useRef();
  const categorieRef = useRef();
  const nomRef = useRef();
  const logoRef = useRef();

  const handleLogoUpload = (e) => {
    const token = localStorage.getItem("token");
    let file = e.target.files[0];
    let data = { ...marque };
    uploadForm.set("logo", file);
    saveImages(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();
      data["logo"] = response.path;
      dispatch(setMarque(data));
    });
  };

  const handlePhotosUpload = (e) => {
    const token = localStorage.getItem("token");
    let files = e.target.files;
    let data = { ...marque };
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`images[${i}]`, files[i]);
    }
    saveImages(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();
      data["images"] = response.paths;
      dispatch(setMarque(data));
    });
  };

  const changeReference = (i) => {
    setIndex(i);
    const ref = { ...references[i] };
    dispatch(setMarque(ref));
  };

  const removeReference = async (i) => {
    const token = localStorage.getItem("token");
    setIndex(-1);
    let elements = [...references];
    if (elements[i] && elements[i].id) {
      await deleteReference(elements[i].id, token);
    }
    elements.splice(i, 1);
    dispatch(setReferences(elements));
  };

  const handleInputUpdate = (field, e) => {
    let data = { ...marque };
    data[field] = e.target.value;
    dispatch(setMarque(data));
  };
  const save = () => {
    const token = localStorage.getItem("token");
    saveReference(marque, token)
      .then((res) => res.data)
      .then((ref) => {
        let data = [...references];
        if (index > -1) {
          data[index] = ref;
        } else {
          data.push(ref);
        }
        setIndex(-1);
        dispatch(setReferences(data));
        dispatch(
          setMarque({
            titre: "",
            annee: "",
            description: "",
            categorie: "Produits chimiques",
            nom_client: "",
            images: [],
            logo: null,
          })
        );
      })
      .catch((err) => {
        let data = err.response.data;
        showErrors(data.errors);
      });
  };
  const handleSave = () => {
    if (
      !references.length ||
      index > -1 ||
      !Object.values(marque).find((el) => el === "" || el === null || el === [])
    ) {
      const token = localStorage.getItem("token");
      saveReference(marque, token)
        .then((res) => res.data)
        .then((ref) => {
          let data = [...references];
          if (index > -1) {
            data[index] = ref;
          } else {
            data.push(ref);
          }
          setIndex(-1);
          dispatch(setReferences(data));
          dispatch(
            setMarque({
              titre: "",
              annee: "",
              description: "",
              categorie: "Produits chimiques",
              nom_client: "",
              images: [],
              logo: null,
            })
          );
        })
        .then(() => {
          dispatch(setFormStage(3));
        })
        .catch((err) => {
          let data = err.response.data;
          showErrors(data.errors);
        });
    }
  };

  const showErrors = (errors) => {
    titreRef.current.innerText = errors.titre ? errors.titre[0] : "";
    anneeRef.current.innerText = errors.annee ? errors.annee[0] : "";
    descriptionRef.current.innerText = errors.description
      ? errors.description[0]
      : "";
    categorieRef.current.innerText = errors.categorie
      ? errors.categorie[0]
      : "";
    nomRef.current.innerText = errors.nom_client ? errors.nom_client[0] : "";
    logoRef.current.innerText = errors.logo ? errors.logo[0] : "";
  };
  return (
    <>
      <form className="container" name="form-identite" id="form-identite">
        <h3>Mettez en avant votre image marque</h3>
        <p>Démarquez-vous grâce aux projets que vous avez réalisés</p>
        {references.length
          ? references.map((el, i) => {
              return (
                <span className="badge bg-primary cursor-pointer">
                  <span onClick={() => changeReference(i)}>{el.titre}</span>
                  <i
                    className="fas fa-close ms-3"
                    onClick={() => removeReference(i)}
                  ></i>
                </span>
              );
            })
          : ""}
        <div className="form-identite-info d-block">
          <div className="d-flex">
            {/*Information legal */}
            <section>
              <p className="section-title">Référence</p>
              <div className="form-boxes">
                <label htmlFor="titre">Titre</label>
                <input
                  type="text"
                  id="titre"
                  name="titre"
                  value={marque.titre}
                  onChange={(e) => handleInputUpdate("titre", e)}
                />
              </div>
              <small
                ref={titreRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="annee">Année</label>
                <select
                  name="annee"
                  id="annee"
                  onChange={(e) => handleInputUpdate("annee", e)}
                  value={marque.annee}
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
                <label htmlFor="description">Description</label>
                <textarea
                  name="description"
                  id="description"
                  cols="30"
                  rows="10"
                  value={marque.description}
                  onChange={(e) => handleInputUpdate("description", e)}
                  onClick={() => setIsFullDescription(false)}
                />
              </div>
              <small
                ref={descriptionRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="categorie">Catégorie</label>
                <select
                  name="categorie"
                  id="categorie"
                  value={marque.categorie}
                  onChange={(e) => handleInputUpdate("categorie", e)}
                >
                  {categories.map((category) => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </div>
              <small
                ref={categorieRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="nom_client">Nom de client</label>
                <input
                  type="text"
                  id="nom_client"
                  name="nom_client"
                  value={marque.nom_client}
                  onChange={(e) => handleInputUpdate("nom_client", e)}
                />
              </div>
              <small
                ref={nomRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="">Joindre logo de client</label>
                <label htmlFor="logo" className="text-center upload">
                  Choisir un fichier
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleLogoUpload(e)}
                  />
                </label>
              </div>
              <small
                ref={logoRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="">Joindre photos des réalisations</label>
                <label htmlFor="photos" className="text-center upload">
                  Choisir un fichier
                  <input
                    type="file"
                    id="photos"
                    name="photos"
                    accept="image/*"
                    className="d-none"
                    multiple
                    onChange={(e) => handlePhotosUpload(e)}
                  />
                </label>
              </div>
            </section>

            <p className="line"></p>
            <section>
              <div className="row">
                <div className="col-6">
                  <h4 className="text-secondary">
                    {marque.titre} | {marque.annee}
                  </h4>
                  {marque.description?.length < 256 ? (
                    <p className="text-black-50 h6 mt-4">
                      {marque.description}
                    </p>
                  ) : isFullDescription ? (
                    <p className="text-black-50 h6 mt-4">
                      {marque.description}
                    </p>
                  ) : (
                    <p className="text-black-50 h6 mt-4">
                      {marque.description.slice(0, 256)}
                      {"... "}
                      <a
                        onClick={() => setIsFullDescription(true)}
                        href="#"
                        className="pointer"
                      >
                        Voir plus
                      </a>
                    </p>
                  )}
                  <p className="text-secondary h6 mt-4">{marque.categorie}</p>
                  <p className="d-flex gap-2 mt-5">
                    {marque.logo ? (
                      <img
                        src={`${process.env.REACT_APP_HOST_URL}/${marque.logo}`}
                        width={80}
                        alt="logo"
                      />
                    ) : (
                      ""
                    )}
                    <span className="text-secondary">{marque.nom_client}</span>
                  </p>
                </div>
                <div className="col-6">
                  <div className="row">
                    {marque.images && marque.images.length
                      ? marque.images.map((photo) => {
                          return (
                            <div className="col-6">
                              <img
                                src={`${process.env.REACT_APP_HOST_URL}/${photo.path}`}
                                width={100}
                                alt=""
                              />
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn pointer btn-outline-secondary rounded-pill px-4"
              onClick={() => dispatch(setFormStage(1))}
            >
              Précédent
            </button>
            <button
              type="button"
              className="btn pointer btn-outline-success rounded-pill px-4 ms-4"
              onClick={() => save()}
            >
              Enregistrer et ajouter
            </button>
            <button
              type="button"
              className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5"
              onClick={() => handleSave()}
            >
              Suivant
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Marque;
