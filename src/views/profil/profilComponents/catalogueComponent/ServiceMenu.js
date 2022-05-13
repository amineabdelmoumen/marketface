import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import categories from "../../../../lib/constants/categories";
import services from "../../../../lib/constants/services";
import { setArticle, setArticles } from "../../../../store/profileSlice";
import {
  saveArticle,
  saveDocs,
  saveDocuments,
  saveImages,
} from "../../../../lib/crud";
let uploadForm = new FormData();

export default function ServiceMenu() {
  const nomRef = useRef();
  const [index, setIndex] = useState(0);
  const dureeRef = useRef();
  const descriptionRef = useRef();
  const prixRef = useRef();
  const quantiteRef = useRef();
  const typeRef = useRef();
  const dispatch = useDispatch();
  const identite = useSelector((state) => state.profile.identite);
  const articles = useSelector((state) => state.profile.articles);
  const [article, setArticle] = useState({
    type_article: "service",
    categorie: "",
    images: [],
    documents: [],
  });
  console.log(articles);
  const style = {
    padding: "22px",
    marginBottom: "20px",
  };
  const style1 = {};

  const validate = (element) => {
    return element !== "";
  };

  const handleInputChange = (field, e) => {
    setIndex(1);
    let data = { ...article };
    if (validate(e.target.value)) {
      data[field] = e.target.value;
      setArticle(data);
      console.log(data);
      console.log(article);
    }
  };
  const handlePhotosUpload = (e) => {
    setIndex(1);
    const token = localStorage.getItem("token");
    let files = e.target.files;
    if (validate(e.target.value)) {
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
    }
  };
  const handleDocumentUpload = (e) => {
    setIndex(1);
    const token = localStorage.getItem("token");
    let files = e.target.files;
    let data = { ...article };
    for (let i = 0; i < files.length; i++) {
      uploadForm.append(`documents[${i}]`, files[i]);
    }
    saveDocs(uploadForm, token).then((res) => {
      const response = res.data;
      uploadForm = new FormData();
      response.paths.map((path) => data["documents"].unshift(path));
      console.log(data["documents"]);
      setArticle(data);
    });
  };

  const showErrors = (errors) => {
    nomRef.current.innerText = errors.nom ? errors?.nom[0] : "";

    prixRef.current.innerText = errors.prix ? errors?.prix[0] : "";
    quantiteRef.current.innerText = errors.quantite ? errors?.quantite[0] : "";
    typeRef.current.innerText = errors.type ? errors?.type[0] : "";
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
          <img src="/imgs/service.svg" alt="" style={{ width: "35px" }} />
          <p className="title-service ">Service</p>
          <p className="line-se"></p>
        </div>
      </div>

      <div className="row mt-5 position-relative ">
        <div className="col-12 col-lg-7 inputs" style={style}>
          <div className="row form-boxes">
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
          <div className="row mt-1 form-boxes">
            <label className="col-12 col-sm-5 col-md-3 text">
              Durée de Service:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="duree"
                onChange={(e) => handleInputChange("duree", e)}
              />
            </div>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Prix:
            </label>
            <div className="col-12  col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="duree"
                onChange={(e) => handleInputChange("prix", e)}
              />
            </div>
            <small
              ref={prixRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              quantité:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="quantite"
                name="quantite"
                onChange={(e) => handleInputChange("quantite", e)}
              />
            </div>
            <small
              ref={quantiteRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5  col-md-3 text">
              Catégorie:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <select
                name="type"
                type="text"
                id="type"
                onChange={(e) => handleInputChange("type", e)}
              >
                {services.map((service) => {
                  return <option value={service}>{service}</option>;
                })}
              </select>
            </div>
            <small
              ref={typeRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
          </div>

          <div className="row mt-3  pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-4 text">
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
            <label htmlFor="" className="col-12 col-sm-5 col-md-4 text">
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
            <small
              ref={descriptionRef}
              className="text-danger ms-2 d-block"
              style={{ "font-size": "10px" }}
            ></small>
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

        <div className="col-12 col-md-5 col-lg-5">
          <div className="row">
            {article.images && article.images.length
              ? article?.images.map((image) => {
                  return (
                    <div className="col-md-6">
                      <img
                        src={`${process.env.REACT_APP_HOST_URL}/${image.path}`}
                        width={100}
                        alt=""
                      />
                    </div>
                  );
                })
              : ""}
          </div>
          {index == 1 ? (
            <div className="article mt-5 mb-3">
              <div className="content ">
                <div className="row">
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Nom de l'article:</p>
                      <p className="text-side text-primary col-7">
                        {article.nom}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Catégorie:</p>
                      <p className="text-side  text-primary col-7">
                        {article.type}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Quantite:</p>
                      <p className="text-side  text-primary col-7">
                        {article.quantite}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Durée de service:</p>
                      <p className=" text-side text-primary col-7">
                        {article.duree}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Prix :</p>
                      <p className=" text-side text-primary col-7">
                        {article.prix}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">Documents :</p>
                      <p className=" text-side text-primary col-7">
                        {article?.documents &&
                          article?.documents.map((doc) => {
                            return (
                              <p className="text-side text-primary col-7">
                                {doc.nom}
                              </p>
                            );
                          })}
                      </p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex">
                      <p className=" text-side col-5">description :</p>
                      <p className=" text-side text-primary col-7">
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
