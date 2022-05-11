import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import categories from "../../../../lib/constants/categories";
import { setArticle, setArticles } from "../../../../store/profileSlice";
import { saveArticle, saveDocuments, saveImages } from "../../../../lib/crud";
let uploadForm = new FormData();
export default function ImmobilierForm() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const nomRef = useRef();
  const descriptionRef = useRef();
  const prixRef = useRef();
  const quantiteRef = useRef();
  const categorieRef = useRef();
  const identite = useSelector((state) => state.profile.identite);
  const articles = useSelector((state) => state.profile.articles);
  const types = ["Vente", "Location", "Vente/Location"];
  const [article, setArticle] = useState({
    type_article: " immobilier",
    type: "",
    images: [],
    documents: [],
  });
  console.log(articles);
  const style = {
    padding: "22px",
    marginBottom: "20px",
  };
  const style1 = {};

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
    saveDocuments(uploadForm, token).then((res) => {
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

    categorieRef.current.innerText = errors.categorie
      ? errors.categorie[0]
      : "";
  };

  const onSubmit = () => {
    const token = localStorage.getItem("token");
    saveArticle(article, token)
      .then((res) => res.data)
      .then((data) => setArticle(data))
      .catch((err) => {
        let errors = err.response.data.errors;
        showErrors(errors);
      });
    console.log("article saved");
  };
  return (
    <div className="container-fluid ">
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
                onChange={(e) => handleInputChange("duree_service", e)}
              />
            </div>
          </div>
          <div className="row form-boxes mt-1 mb-1">
            <label className="col-12 col-sm-5 col-md-3 text">Adresse:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="nom"
                onChange={(e) => handleInputChange("adresse", e)}
              />
            </div>
          </div>
          <div className="row  form-boxes mt-2">
            <label className="col-12 col-sm-5 col-md-3 text">Superficie:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="nom"
                onChange={(e) => handleInputChange("superficie", e)}
              />
            </div>
          </div>
          <div className="row form-boxes mt-1">
            <label className="col-12 col-sm-5 col-md-3 text">Type:</label>
            <div className="col-12 col-sm-5 col-md-9">
              <select
                name="type"
                id="type"
                onChange={(e) => handleInputChange("type", e)}
              >
                {types.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
            </div>
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
                onChange={(e) => handleInputChange("prix", e)}
              />
            </div>
          </div>
          <div className=" row mt-1 form-boxes ">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Nature:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="quantite"
                name="quantite"
                onChange={(e) => handleInputChange("nature", e)}
              />
            </div>
          </div>

          <div className="row mt-3  pb-3 form-boxes">
            <label htmlFor="photos" className="col-12 col-sm-5 col-md-4 text">
              Join des documents:
            </label>
            <div className="col-12 col-sm-5 col-md-8">
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
            <label htmlFor="photos" className="col-12 col-sm-5 col-md-4 text">
              Join des photos de l'article:
            </label>
            <div className="col-12 col-sm-5 col-md-8">
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
                name="titre"
                onChange={(e) => handleInputChange("description", e)}
              ></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end ">
            <button
              className="btn pointer btn-success text-white rounded-pill px-5 text-f"
              onClick={() => onSubmit()}
            >
              Enregistrer
            </button>
          </div>
        </div>

        <div className="col-12  col-lg-5">
          <div className="row">
            {article?.images.map((image) => {
              return (
                <div className="col-5 mx-2 ">
                  <img
                    src={`${process.env.REACT_APP_HOST_URL}/${image.path}`}
                    width={100}
                    alt=""
                  />
                </div>
              );
            })}
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
                        {article.prix}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Documents :</p>
                      {article?.documents &&
                        article?.documents.map((doc) => {
                          return (
                            <p className="text-side text-primary col-7">
                              {doc.nom}
                            </p>
                          );
                        })}
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
