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
const areaScrollStyle = {
  border: "none",
  color: "#092D58",
  outline: "none",
  boxShadow: "none",
  overflow: "auto",
  resize: "none",
  display: "block",
};
const areaStyle = {
  border: "none",
  color: "#092D58",
  outline: "none",
  boxShadow: "none",
  overflow: "hidden",
  resize: "none",
  display: "block",
};

const biensImmobiliers = ["", "Affaires immobilières"];

const natures = [
  "",
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

const types = ["", "Vente/ Location"];

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
      console.log("documents: ", data.documents[0].nom);
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
            type: "",
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
      Object.values(article).find((el) => el === "" || el === null || el === [])
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
              type: "",
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
    } else {
      dispatch(setFormStage(5));
    }
  };
  const setArticleData = (i) => {
    const data = { ...articles[i] };
    setIndex(i);
    dispatch(setArticle(data));
  };

  const showErrors = (errors) => {
    typeArticleRef.current.innerText = errors.type_article
      ? errors?.type_article[0]
      : "";
    nomRef.current.innerText = errors.nom ? errors.nom[0] : "";
    descriptionRef.current.innerText = errors.description
      ? errors.description[0]
      : "";
    prixRef.current.innerText = errors.prix ? errors.prix[0] : "";
    quantiteRef.current.innerText = errors.quantite ? errors.quantite[0] : "";
    typeRef.current.innerText = errors.type ? errors.type[0] : "";
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
        {/*  <div className="page_number">2/2</div> */}
        <div className="d-flex">
          <p className="title-identite" style={{ fontSize: "25px" }}>
            Créez votre E-catalogue 2/2
          </p>
        </div>

        {/* {articles.length
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
          : ""} */}

        <div className="form-identite-info d-block">
          <div className="d-flex">
            {/*Information legal */}
            <section>
              <div className="row">
                <p className="aj-tx " style={{ marginBottom: "20px" }}>
                  Ajouter un article
                </p>
              </div>
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
                <label htmlFor="prix">Prix (MAD):</label>
                <input
                  type="number"
                  min="0"
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
                  min="0"
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
                <label htmlFor="categorie">Catégorie:</label>
                <select
                  name="categorie"
                  id="categorie"
                  value={article.type}
                  onChange={(e) => handleInputUpdate("categorie", e)}
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
                    <label htmlFor="superficie">Superficie (m2):</label>
                    <input
                      type="text"
                      id="superficie"
                      value={article.superficie}
                      onChange={(e) => handleInputUpdate("superficie", e)}
                    />
                  </div>
                  <div className="form-boxes">
                    <label htmlFor="nature">Nature:</label>
                    <select
                      name="nature"
                      id="nature"
                      value={article.type}
                      onChange={(e) => handleInputUpdate("nature", e)}
                    >
                      {natures.map((nature) => (
                        <option value={nature}>{nature}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-boxes">
                    <label htmlFor="type">Type:</label>
                    <select
                      name="type"
                      id="type"
                      value={article.type}
                      onChange={(e) => handleInputUpdate("type", e)}
                    >
                      {types.map((type) => (
                        <option value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className="form-boxes">
                <label htmlFor="photos">Joindre les documents d'article</label>
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
            <section style={{ marginLeft: "15px" }}>
              <div className="row">
                <p
                  className="aj-tx "
                  style={{ marginBottom: "20px", marginLeft: "30px" }}
                >
                  Apercu de votre article
                </p>
              </div>
              <div className="row">
                <div
                  className="col-6"
                  style={{ marginLeft: "30px", marginTop: "40px" }}
                >
                  {article.nom ? (
                    <p className="row ">
                      <p className="tx-ap col-md-4 me-2">Nom:</p>{" "}
                      <p
                        className="col-md-3 tx-ap"
                        style={{ fontSize: "14px", color: "#092D58" }}
                      >
                        {article.nom}
                      </p>
                    </p>
                  ) : (
                    ""
                  )}

                  {/*<p>Categorie: {categorie}</p>*/}
                  {article.quantite ? (
                    <p className="row mt-2 ">
                      <p className="col-md-4 tx-ap me-2"> Quantite: </p>{" "}
                      <p
                        className="col-md-3 tx-ap"
                        style={{ fontSize: "14px", color: "#092D58" }}
                      >
                        {article.quantite}
                      </p>
                    </p>
                  ) : (
                    ""
                  )}
                  {article.type_article ? (
                    <p className="row mt-2 ">
                      <p className="col-md-4 tx-ap me-2"> Type: </p>{" "}
                      <p
                        className="col-md-3 tx-ap"
                        style={{ fontSize: "14px", color: "#092D58" }}
                      >
                        {article.type_article}
                      </p>
                    </p>
                  ) : (
                    ""
                  )}

                  {article.prix ? (
                    <p className="row mt-2 ">
                      <p className="col-md-4 tx-ap me-2"> Prix: </p>{" "}
                      <p
                        className="col-md-4 tx-ap"
                        style={{ fontSize: "14px", color: "#092D58" }}
                      >
                        {` ${article.prix} dhs`}
                      </p>
                    </p>
                  ) : (
                    ""
                  )}

                  {article.description?.length < 256 ? (
                    <textarea
                      style={areaScrollStyle}
                      name=""
                      id=""
                      cols="40"
                      rows="10"
                      className=" tx-ap mt-4"
                      value={article.description}
                    />
                  ) : isFullDescription ? (
                    <textarea
                      style={areaScrollStyle}
                      name=""
                      id=""
                      cols="40"
                      rows="10"
                      className="tx-ap mt-4"
                      value={article.description}
                    />
                  ) : (
                    <>
                      <textarea
                        style={areaStyle}
                        name=""
                        id=""
                        cols="40"
                        rows="6"
                        className="tx-ap h6 mt-4 mb-0"
                        value={article.description.slice(0, 256) + "..."}
                      />
                      <a
                        onClick={() => setIsFullDescription(true)}
                        href="#"
                        className="pointer tx-ap"
                        style={{ color: "#092D58" }}
                      >
                        Voir plus
                      </a>
                    </>
                  )}
                </div>

                <div
                  className="d-flex align-items-center mb-2 mt-3"
                  style={{ marginLeft: "15px" }}
                >
                  <p className="tx-ap me-4">Photos:</p>
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
                <div className="row mt-2">
                  {article?.documents &&
                    article?.documents.map((doc) => {
                      return <div className="col-6 mt-2">{doc.nom}</div>;
                    })}
                </div>
              </div>
            </section>
          </div>
          <div className="buttons d-flex justify-content-end">
            <div
              className=" d-flex justify-content-center  wrapper-ident  col-12 col-md-2 me-3"
              onClick={() => dispatch(setFormStage(3))}
            >
              <p style={{ fontSize: "16px" }} className="rg-iden">
                Précédent
              </p>
            </div>
            <div
              className=" d-flex justify-content-center  wrapper-ident  col-12 col-md-2 me-3"
              onClick={() => appendArticle()}
            >
              <p style={{ fontSize: "16px" }} className="rg-iden">
                Enregistrer
              </p>
            </div>
            <div
              className=" d-flex justify-content-center  sv-btn col-12 col-md-2 "
              onClick={() => save()}
            >
              <p style={{ fontSize: "16px" }} className="suivant-iden">
                Suivant
              </p>
            </div>
          </div>
          {/* <div className="d-flex justify-content-end">
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
          </div> */}
        </div>
      </form>
    </>
  );
}

export default Article;
