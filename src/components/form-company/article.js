import React, { useEffect, useRef, useState } from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setArticle, setArticles } from "../../store/profileSlice";
import {
  deleteArticle,
  saveArticle,
  saveDocs,
  saveImages,
} from "../../lib/crud";
import typesArticle from "../../lib/constants/typesArticle";
import services from "../../lib/constants/services";

let uploadForm = new FormData();

const biensImmobiliers = ["Affaires immobilières"];

const natures = [
  "Terrain agricole",
  "terrain industriel",
  "usine",
  "immeuble",
  "villa",
  "lotissement",
  "terrain de construction",
  "plateau bureau",
  "appartement",
  "magasin",
  "local industriel",
  "Ferme",
];

function Article(props) {
  const typeArticleRef = useRef();
  const nomRef = useRef();
  const descriptionRef = useRef();
  const prixRef = useRef();
  const quantiteRef = useRef();
  const typeRef = useRef();
  const dispatch = useDispatch();
  const article = useSelector((state) => state.profile.article);
  const articles = useSelector((state) => state.profile.articles);
  const [index, setIndex] = useState(-1);
  const [isFullDescription, setIsFullDescription] = useState(false);

  const handleDocsUpload = (e) => {
    const token = localStorage.getItem("token");
    let data = { ...article };
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`documents[${i}]`, files[i]);
    }
    saveDocs(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();
      data["documents"] = response.paths;
      dispatch(setArticle(data));
    });
  };
  function handlePhotosUpload(e) {
    const token = localStorage.getItem("token");
    let data = { ...article };
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`images[${i}]`, files[i]);
    }
    saveImages(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();
      data["images"] = response.paths;
      dispatch(setArticle(data));
    });
  }

  const handleInputUpdate = (field, e) => {
    let data = { ...article };
    data[field] = e.target.value;
    dispatch(setArticle(data));
  };

  const appendArticle = () => {
    const token = localStorage.getItem("token");
    saveArticle(article, token)
      .then((res) => res.data)
      .then((data) => {
        let list = [...articles];
        if (index > -1) {
          list[index] = data;
        } else {
          list.push(data);
        }
        setIndex(-1);
        dispatch(setArticles(list));
        dispatch(
          setArticle({
            type_article: "Produit",
            type: "Produits chimiques",
            nom: "",
            description: "",
            prix: "",
            quantite: "",
          })
        );
      })
      .catch((err) => {
        let errors = err.response.data.errors;
        showErrors(errors);
      });
  };
  const save = () => {
    if (
      !articles.length ||
      index > -1 ||
      Object.values(article).find(
        (el) => el === "" || el === null || el === []
      )
    ) {
      const token = localStorage.getItem("token");
      saveArticle(article, token)
        .then((res) => res.data)
        .then((data) => {
          let list = [...articles];
          if (index > -1) {
            list[index] = data;
          } else {
            list.push(data);
          }
          setIndex(-1);
          dispatch(setArticles(list));
          dispatch(
            setArticle({
              type_article: "Produit",
              type: "Produits chimiques",
              nom: "",
              description: "",
              prix: "",
              quantite: "",
            })
          );
        })
        .then(() => {
          dispatch(setFormStage(5));
        })
        .catch((err) => {
          let errors = err.response.data.errors;
          showErrors(errors);
        });
    }

  };
  const setArticleData = (i) => {
    const data = { ...articles[i] };
    setIndex(i);
    dispatch(setArticle(data));
  };

  const showErrors = (errors) => {
    if (errors.type_article) {
      typeArticleRef.current.innerText = errors.type_article[0];
    }
    if (errors.nom) {
      nomRef.current.innerText = errors.nom[0];
    }
    if (errors.description) {
      descriptionRef.current.innerText = errors.description[0];
    }
    if (errors.prix) {
      prixRef.current.innerText = errors.prix[0];
    }
    if (errors.quantite) {
      quantiteRef.current.innerText = errors.quantite[0];
    }
    if (errors.type) {
      typeRef.current.innerText = errors.type[0];
    }
  };
  const removeArticle = async (i) => {
    const token = localStorage.getItem("token");
    setIndex(-1);
    let elements = [...articles];
    if (elements[i] && elements[i].id) {
      await deleteArticle(elements[i].id, token);
    }
    elements.splice(i, 1);
    dispatch(setArticles(elements));
  };

  return (
    <>
      <form className="container" name="form-identite" id="form-identite">
        <div className="page_number">2/2</div>
        <h4 className="ms-5 text-primary">Créez votre E-catalogue</h4>
        {articles.length
          ? articles.map((el, i) => {
              return (
                <span className="badge bg-primary cursor-pointer">
                  <span onClick={() => setArticleData(i)}>{el.nom}</span>
                  <i
                    className="fas fa-close ms-3"
                    onClick={() => removeArticle(i)}
                  ></i>
                </span>
              );
            })
          : ""}
        <h5 className="text-center text-secondary">Ajouter un article</h5>
        <div className="form-identite-info d-block">
          <div className="d-flex">
            {/*Information legal */}
            <section>
              <div className="form-boxes">
                <label htmlFor="titre">Il s'agit d'un</label>
                <select
                  name="article_type"
                  value={article.type_article}
                  onChange={(e) => handleInputUpdate("type_article", e)}
                >
                  <option value="produit">Produit</option>
                  <option value="service">Service</option>
                  <option value="immobilier">Bien immobilier</option>
                </select>
              </div>
              <small
                ref={typeArticleRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="nom">Nom d'article</label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={article.nom}
                  onChange={(e) => handleInputUpdate("nom", e)}
                />
              </div>
              <small
                ref={nomRef}
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
                  value={article.description}
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
                <label htmlFor="category">Prix (MAD):</label>
                <input
                  type="number"
                  value={article.prix}
                  onChange={(e) => handleInputUpdate("prix", e)}
                />
              </div>
              <small
                ref={prixRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>

              <div className="form-boxes">
                <label htmlFor="quantite">Quantité:</label>
                <input
                  type="number"
                  id="quantite"
                  value={article.quantite}
                  onChange={(e) => handleInputUpdate("quantite", e)}
                />
              </div>
              <small
                ref={quantiteRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              <div className="form-boxes">
                <label htmlFor="type">Type:</label>
                <select
                  name="type"
                  id="type"
                  value={article.type}
                  onChange={(e) => handleInputUpdate("type", e)}
                >
                  {
                    {
                      produit: typesArticle.map((type) => {
                        return <option value={type}>{type}</option>;
                      }),
                      service: services.map((type) => {
                        return <option value={type}>{type}</option>;
                      }),
                      immobilier: biensImmobiliers.map((type) => {
                        return <option value={type}>{type}</option>;
                      }),
                    }[article.type_article]
                  }
                </select>
              </div>
              <small
                ref={typeRef}
                className="text-danger ms-2 d-block"
                style={{ "font-size": "10px" }}
              ></small>
              {article.type_article === "service" ? (
                <div className="form-boxes">
                  <label htmlFor="duree_service">Durée du service:</label>
                  <input
                    type="text"
                    id="duree_service"
                    value={article.duree_service}
                    onChange={(e) => handleInputUpdate("duree_service", e)}
                  />
                </div>
              ) : (
                ""
              )}
              {article.type_article === "immobilier" ? (
                <>
                  <div className="form-boxes">
                    <label htmlFor="adresse">Adresse:</label>
                    <input
                      type="text"
                      id="adresse"
                      value={article.adresse}
                      onChange={(e) => handleInputUpdate("adresse", e)}
                    />
                  </div>
                  <div className="form-boxes">
                    <label htmlFor="superficie">Superficie:</label>
                    <input
                      type="text"
                      id="superficie"
                      value={article.superficie}
                      onChange={(e) => handleInputUpdate("superficie", e)}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
              {article.type_article !== "produit" ? (
                <div className="form-boxes">
                  <label htmlFor="photos">
                    Joindre les documents d'article
                  </label>
                  <label htmlFor="documents" className="text-center upload">
                    Choisir un fichier
                    <input
                      type="file"
                      id="documents"
                      name="documents[]"
                      className="d-none"
                      multiple
                      onChange={(e) => handleDocsUpload(e)}
                    />
                  </label>
                </div>
              ) : (
                ""
              )}
              <div className="form-boxes">
                <label htmlFor="photos">Joindre des photos d'article</label>
                <label htmlFor="photos" className="text-center upload">
                  Choisir un fichier
                  <input
                    type="file"
                    id="photos"
                    name="photos[]"
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
                  <h4 className="text-secondary">{article.nom}</h4>
                  {/*<p>Categorie: {categorie}</p>*/}
                  <p>Quantite: {article.quantite}</p>
                  <p>{article.type}</p>
                  <p>
                    {article.prix}dh/{article.quantite}
                  </p>

                  {article.description?.length < 256 ? (
                    <p>{article.description}</p>
                  ) : isFullDescription ? (
                    <p>{article.description}</p>
                  ) : (
                    <p>
                      {article.description.slice(0, 256)}
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
                </div>
                <div className="col-6">
                  <div className="row">
                    {article.images && article.images.length
                      ? article.images.map((photo) => {
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
              onClick={() => dispatch(setFormStage(3))}
            >
              Précédent
            </button>
            <button
              type="button"
              className="btn pointer btn-outline-success rounded-pill px-4 ms-4"
              onClick={() => appendArticle()}
            >
              Enregistrer et ajouter
            </button>
            <button
              type="button"
              className="btn pointer ml-4 btn-success text-white rounded-pill px-4 ms-5"
              onClick={() => save()}
            >
              Suivant
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default Article;
