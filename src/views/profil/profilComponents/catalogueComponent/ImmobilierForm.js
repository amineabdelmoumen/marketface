import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import categories from "../../../../lib/constants/categories";
import { setArticle, setArticles } from "../../../../store/profileSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  saveArticle,
  saveDocs,
  saveDocuments,
  saveImages,
} from "../../../../lib/crud";
let uploadForm = new FormData();
export default function ImmobilierForm({ setArticleType }) {
  const selectedArticle = useSelector((state) => state.article.selectedArticle);
  const toastId = useRef(null);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const nomRef = useRef();
  const descriptionRef = useRef();
  const prixRef = useRef();
  const adresseRef = useRef();
  const natureRef = useRef();
  const superficieRef = useRef();
  const dureeRef = useRef();
  const quantiteRef = useRef();
  const categorieRef = useRef();
  const identite = useSelector((state) => state.profile.identite);
  const articles = useSelector((state) => state.profile.articles);
  const types = ["", "Vente", "Location", "Vente/Location"];
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
  const [article, setArticle] = useState({
    type_article: "immobilier",

    images: [],
    documents: [],
  });

  console.log(articles);
  const style = {
    padding: "22px",
    marginBottom: "20px",
  };
  const style1 = {};

  useEffect(() => {
    if (Object.keys(selectedArticle).length != 0) {
      const images_to_upload = [];
      const documents_to_upload = [];
      if (selectedArticle.images && selectedArticle.images.length != 0) {
        selectedArticle.images.map((image) =>
          images_to_upload.push({ path: image.path })
        );
      }
      if (selectedArticle.documents && selectedArticle.documents.length != 0) {
        selectedArticle.documents.map((doc) =>
          documents_to_upload.push({ path: doc.path, nom: doc.nom })
        );
      }
      setIndex(1);
      setArticle({
        id: selectedArticle.id,
        nom: selectedArticle.nom,
        company_id: selectedArticle.company_id,
        type_article: selectedArticle.type_article,
        type: selectedArticle.type,
        prix: selectedArticle.prix,
        quantite: selectedArticle.quantite,
        description: selectedArticle.description,
        adresse: selectedArticle.adresse,
        nature: selectedArticle.nature,
        duree: selectedArticle.duree,
        superficie: selectedArticle.nature,
        images: images_to_upload,

        documents: documents_to_upload,
      });
    }
    console.log(`article to update ${article}`);
  }, []);

  const handleInputChange = (field, e) => {
    setIndex(1);
    let data = { ...article };

    data[field] = e.target.value;
    setArticle(data);
    console.log(data);
    console.log(article);
  };
  let images = [];
  const handlePhotosUpload = (e) => {
    const token = localStorage.getItem("token");
    let files = e.target.files;

    let data = { ...article };
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`images[${i}]`, files[i]);
    }
    saveImages(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();

      response.paths.map((path) => data["images"].unshift(path));

      console.log(data["images"]);
      setArticle(data);
    });
  };
  const handleDocumentUpload = (e) => {
    const token = localStorage.getItem("token");
    let files = e.target.files;
    console.log("files", files);
    let data = { ...article };
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`documents[${i}]`, files[i]);
    }
    saveDocs(uploadForm, token).then((res) => {
      const response = res.data;
      console.log("response.paths", response.paths);
      console.log("data['documents']", data["documents"]);
      uploadForm = new FormData();

      response.paths.map((path) => data["documents"].unshift(path));
      console.log(data["documents"]);

      setArticle(data);
    });
  };
  const showErrors = (errors) => {
    nomRef.current.innerText = errors?.nom ? errors?.nom[0] : "";
    descriptionRef.current.innerText = errors.description
      ? errors.description[0]
      : "";
    prixRef.current.innerText = errors.prix ? errors.prix[0] : "";
    quantiteRef.current.innerText = errors.quantite ? errors.quantite[0] : "";

    categorieRef.current.innerText = errors.type ? errors.type[0] : "";
  };
  /*  const renderSubmit = () => {
    toast.success("Article Immobilier a été ajouté avec succés", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
    console.log("toast was executed succesfully");
  }; */

  const toastPending = () =>
    (toastId.current = toast("L'ajout de l'article est en cours ......", {
      autoClose: false,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastSuccess = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Article Produit a été ajouté  avec succés",
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastSuccessUpdate = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Article Produit a été Modifié  avec succés",
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastError = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Echec d'ajout du produit !",
      autoClose: 1500,
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER,
    }));

  const onSubmit = async () => {
    const token = localStorage.getItem("token");
    const element = document.getElementById("submitBtn");
    element.disabled = true;
    setTimeout(function () {
      element.disabled = false;
    }, 5000);
    toastPending();
    console.log("+++++article before submit", article);
    if ("id" in article) {
      console.log("update exec+_++++++++++++");
      update(article.id, token);
    } else {
      register(token);
    }
  };

  const register = async (token) => {
    try {
      const res = await saveArticle(article, token);
      toastSuccess();
      const data = await res.data;
      let data2 = { ...data, images: article.images };

      let list = [...articles, data2];

      dispatch(setArticles(list));
      setTimeout(() => setArticleType(3, 0), 1500);
    } catch (err) {
      let errors = err.response?.data.errors;
      showErrors(errors);
      toastError();
    }
  };
  const update = async (id, token) => {
    try {
      const res = await saveArticle(article, token);
      toastSuccessUpdate();
      const data = await res.data;
      const list = articles.map((arti) =>
        arti.id === id
          ? { ...data, images: article.images, documents: article.documents }
          : arti
      );

      dispatch(setArticles(list));
      setTimeout(() => setArticleType(3, 0), 1500);
    } catch (err) {
      let errors = err.response?.data.errors;
      showErrors(errors);
      toastError();
    }
  };

  return (
    <div className="container-fluid ">
      <div className="d-flex justify-content-end">
        <p
          className="display cursor-pointer mt-4"
          onClick={() => setArticleType(3, 0)}
        >
          Tous les biens Immobilier
        </p>
      </div>
      <div className="title d-flex justify-content-center pt-4">
        <div className="d-flex position-relative">
          <img src="/imgs/house.svg" alt="" style={{ width: "33px" }} />
          <p className="title-service ">Immobilier</p>
          <p className="line-se"></p>
        </div>
      </div>

      <div className="row mt-5 position-relative ">
        <div className="col-12 col-lg-7 inputs" style={style}>
          <div className="row form-boxes mt-1">
            <label className="col-12 col-sm-5 col-md-3 text">
              Nom de l'article:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="nom"
                value={article ? article?.nom : ""}
                onChange={(e) => handleInputChange("nom", e)}
              />
            </div>
            <small
              ref={nomRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row form-boxes mt-1">
            <label className="col-12 col-sm-5 col-md-3 text">Durée:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="nom"
                value={article ? article?.duree : ""}
                onChange={(e) => handleInputChange("duree", e)}
              />
            </div>
            <small
              ref={dureeRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row form-boxes mt-1 mb-1">
            <label className="col-12 col-sm-5 col-md-3 text">Adresse:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="adresse"
                value={article ? article?.adresse : ""}
                onChange={(e) => handleInputChange("adresse", e)}
              />
            </div>
            <small
              ref={adresseRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row  form-boxes mt-2">
            <label className="col-12 col-sm-5 col-md-3 text">Quantité:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="number"
                id="titre"
                name="quantite"
                value={article ? article?.quantite : ""}
                onChange={(e) => handleInputChange("quantite", e)}
              />
            </div>
            <small
              ref={quantiteRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row  form-boxes mt-2">
            <label className="col-12 col-sm-5 col-md-3 text">Superficie:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="nom"
                value={article ? article?.superficie : ""}
                onChange={(e) => handleInputChange("superficie", e)}
              />
            </div>
            <small
              ref={superficieRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row form-boxes mt-1">
            <label className="col-12 col-sm-5 col-md-3 text">Type:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <select
                name="type"
                id="type"
                value={article ? article?.type : ""}
                onChange={(e) => handleInputChange("type", e)}
              >
                <option value="" disabled selected hidden>
                  {" "}
                  Seléctionner un type
                </option>
                {types.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>
            <small
              ref={categorieRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>

          <div className="row  form-boxes mt-1">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Prix:
            </label>
            <div className="col-12  col-sm-5 col-md-9">
              <input
                type="number"
                id="prixs"
                name="prix"
                value={article ? article?.prix : ""}
                onChange={(e) => handleInputChange("prix", e)}
              />
            </div>
            <small
              ref={prixRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className=" row mt-1 form-boxes ">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Nature:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <select
                name="nature"
                id="nature"
                value={article ? article?.nature : ""}
                onChange={(e) => handleInputChange("nature", e)}
              >
                <option value="" disabled selected hidden>
                  {" "}
                  Seléctionner une nature
                </option>
                {natures.map((nature) => (
                  <option value={nature}>{nature}</option>
                ))}
              </select>
            </div>

            <small
              ref={natureRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>

          <div className="row mt-3  pb-3 form-boxes">
            <label htmlFor="photos" className="col-12 col-sm-5 col-md-3 text">
              Documents:
            </label>
            <div className=" col-12 col-sm-5 col-md-9">
              <label htmlFor="documents" className="text-center upload">
                Choisir un fichier
                <input
                  type="file"
                  id="documents"
                  name="documents[]"
                  className="d-none"
                  multiple
                  onChange={(e) => handleDocumentUpload(e)}
                />
              </label>
            </div>
          </div>
          <div className="row mt-1  pb-3 form-boxes">
            <label htmlFor="photos" className="col-12 col-sm-5 col-md-3 text">
              Photos:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
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
          </div>
          <div className="row mt-1 pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Description:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <textarea
                rows={5}
                id="titre"
                name="description"
                value={article ? article?.description : ""}
                onChange={(e) => handleInputChange("description", e)}
              ></textarea>
            </div>
            <small
              ref={descriptionRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="d-flex justify-content-end ">
            <button
              id="submitBtn"
              className="btn pointer btn-success text-white rounded-pill px-5 text-f"
              onClick={() => onSubmit()}
            >
              Enregistrer
            </button>
          </div>
          <ToastContainer limit={1} />
        </div>

        <div className="col-12  col-lg-5">
          <div className="row">
            {article.images && article.images.length
              ? article?.images.map((image) => {
                  return (
                    <div className="col-5 mx-2 ">
                      <img
                        src={`${process.env.REACT_APP_HOST_URL}/${image.path}`}
                        style={{ width: "100%", margin: "20px 30px 20px 30px" }}
                        alt=""
                      />
                    </div>
                  );
                })
              : ""}
          </div>
          {index == 1 ? (
            <div className=" article mt-5 mb-4">
              <div className="content row ">
                <div className="row">
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Nom de l'article</p>
                      <p className="text-side text-primary col-7">
                        {article.nom}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Duree </p>
                      <p className="text-side text-primary col-7">
                        {article.duree}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Adresse</p>
                      <p className="text-side text-primary col-7">
                        {article.adresse}
                      </p>
                    </div>{" "}
                  </div>

                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Superficie</p>
                      <p className="text-side text-primary col-7">
                        {article.superficie}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Nature</p>
                      <p className="text-side text-primary col-7">
                        {article.nature}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">categorie</p>
                      <p className="text-side  text-primary col-7">
                        {article.type}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Quantite</p>
                      <p className=" text-side text-primary col-7">
                        {article.quantite}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5"> Prix:</p>
                      <p className=" text-side text-primary col-7">
                        {article?.prix ? `${article.prix} Dhs` : ""}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Documents :</p>
                      <div className="col-7">
                        {article?.documents &&
                          article?.documents.map((doc) => {
                            return (
                              <p className="row text-side text-primary">
                                {doc.nom}
                              </p>
                            );
                          })}
                      </div>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5"> Description:</p>
                      <p
                        className=" text-side text-primary col-7"
                        style={{ wordWrap: "break-word" }}
                      >
                        {article.description}
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
