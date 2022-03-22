import React, { useEffect, useState } from "react";
import { setFormStage } from "../../store/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import { setArticle, setArticles } from "../../store/profileSlice";
import { deleteArticle, saveArticles, saveImages } from "../../lib/crud";
import typesArticle from "../../lib/constants/typesArticle";
import { useSnackbar } from "react-simple-snackbar";
import snackbarStyles from "../../lib/snackbarStyles";
import services from "../../lib/constants/services";

<<<<<<< HEAD
let uploadForm = new FormData();
=======
let uploadForm = new FormData()

const biensImmobiliers = [
  'Affaires immobilières'
];

const natures = [
  'Terrain agricole',
  'terrain industriel',
  'usine',
  'immeuble',
  'villa',
  'lotissement',
  'terrain de construction',
  'plateau bureau',
  'appartement',
  'magasin',
  'local industriel',
  'Ferme',
];

>>>>>>> fc56a1cd2923292a10e59e6a60fe9f8abb7fb895
function Article(props) {
  const [openSnackbar, closeSnackbar] = useSnackbar(snackbarStyles);
  const dispatch = useDispatch();
  const article = useSelector((state) => state.profile.article);
  const articles = useSelector((state) => state.profile.articles);
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(-1);
  const [sendArticles, setSendArticles] = useState(false);
  const [isFullDescription, setIsFullDescription] = useState(false);

  useEffect(() => {
    if (sendArticles) {
      if (articles.length) {
        const token = localStorage.getItem("token");
        saveArticles({ articles: articles }, token)
          .then((res) => res.data)
          .then((data) => {
            dispatch(setArticles(data));
            setSendArticles(false);
            dispatch(setFormStage(5));
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
      } else {
        setSendArticles(false);
        dispatch(setFormStage(5));
      }
    }
  }, [sendArticles]);
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
    setPhotos(photos);
  }

  const handleInputUpdate = (field, e) => {
    let data = { ...article };
    data[field] = e.target.value;
    dispatch(setArticle(data));
  };

  const appendArticle = () => {
    let data = [...articles];
    if (index > -1) {
      data[index] = article;
    } else {
      data.push(article);
    }
    setIndex(-1);
    dispatch(setArticles(data));
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
  };
  const save = () => {
    if (
      !articles.length ||
      index > -1 ||
      Object.values(article).find(
        (el) => el === "" || el === null || el === []
      ) === undefined
    ) {
      appendArticle();
    }
    setSendArticles(true);
  };
  const setArticleData = (i) => {
    const data = { ...articles[i] };
    setIndex(i);
    dispatch(setArticle(data));
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
                  <option value="immobilier">Immobilier</option>
                </select>
              </div>
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

              <div className="form-boxes">
                <label htmlFor="category">Prix</label>
                <input
                  type="number"
                  value={article.prix}
                  onChange={(e) => handleInputUpdate("prix", e)}
                />
              </div>
              {/*<p className="form-boxes">*/}
              {/*  <label htmlFor="nom_client">*/}
              {/*    Catégorie:*/}
              {/*  </label>*/}
              {/*  <input type="text" id="nom_client" onChange={(e) => setCategorie(e.target.value)} />*/}
              {/*</p>*/}
              <div className="form-boxes">
                <label htmlFor="quantite">Quantité:</label>
                <input
                  type="number"
                  id="quantite"
                  value={article.quantite}
                  onChange={(e) => handleInputUpdate("quantite", e)}
                />
              </div>
              <div className="form-boxes">
                <label htmlFor="type">
                  Type:
                </label>
                <select name="type" id="type" value={article.type} onChange={(e) => handleInputUpdate('type', e)}>
                  {
                    {
                      'produit': typesArticle.map((type) => {
                        return (
                          <option value={type}>{type}</option>
                        )
                      }),
                      'service': services.map((type) => {
                        return (
                          <option value={type}>{type}</option>
                        )
                      }),
                      'immobilier': biensImmobiliers.map((type) => {
                        return (
                          <option value={type}>{type}</option>
                        )
                      })
                    }[article.type_article]
                  }
                </select>
              </div>
              <div className="form-boxes">
                <label htmlFor="adresse">
                  Adresse:
                </label>
                <input type="text" id="adresse" value={article.adresse} onChange={(e) => handleInputUpdate('adresse', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="superficie">
                  Superficie:
                </label>
                <input type="text" id="superficie" value={article.superficie} onChange={(e) => handleInputUpdate('superficie', e)} />
              </div>
              <div className="form-boxes">
                <label htmlFor="photos">
                  Joindre des photos d'article
                </label>
                <input type="file" id="photos" name="photos[]" accept="image/*" multiple onChange={(e) => handlePhotosUpload(e)} />
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

                  {article.description?.length < 10 ? (
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
              onClick={() => dispatch(setFormStage(5))}
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
