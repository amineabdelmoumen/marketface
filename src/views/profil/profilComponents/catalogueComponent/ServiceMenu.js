import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";
import categories from "../../../../lib/constants/categories";
import services from "../../../../lib/constants/services";
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

export default function ServiceMenu({ setAction }) {
  const selectedArticle = useSelector((state) => state.article.selectedArticle);
  const toastId = useRef(null);
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
        duree: selectedArticle.duree,
        quantite: selectedArticle.quantite,
        description: selectedArticle.description,
        images: images_to_upload,

        documents: documents_to_upload,
      });
    }
    console.log("id", selectedArticle.id);
  }, []);

  const validate = (element) => {
    return element !== "";
  };

  const handleInputChange = (field, e) => {
    setIndex(1);
    let data = { ...article };

    data[field] = e.target.value;
    setArticle(data);
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

      setArticle(data);
    });
  };

  const showErrors = (errors) => {
    nomRef.current.innerText = errors?.nom ? errors.nom[0] : "";

    prixRef.current.innerText = errors?.prix ? errors.prix[0] : "";
    quantiteRef.current.innerText = errors?.quantite ? errors.quantite[0] : "";
    typeRef.current.innerText = errors?.type ? errors.type[0] : "";
    descriptionRef.current.innerText = errors?.description
      ? errors.description[0]
      : "";
    dureeRef.current.innerText = errors?.duree ? errors.duree[0] : "";
  };
  const toastPending = () =>
    (toastId.current = toast("L'ajout de l'article est en cours ......", {
      autoClose: false,
      type: toast.TYPE.INFO,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastSuccess = async () =>
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
      setTimeout(() => setAction(1), 1500);
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
      setTimeout(() => setAction(1), 1500);
    } catch (err) {
      let errors = err.response?.data.errors;
      showErrors(errors);
      toastError();
    }
  };
  return (
    <form
      className="container"
      name="form-identite"
      id="form-identite-gen"
      style={{ padding: "14px 30px" }}
    >
      {/* <div className="page_number">1/2</div> */}

      <div className="form-identite-info d-block mt-3">
        <div className="d-flex justify-content-end">
          <p
            className="title-identite cursor-pointer mt-4"
            styel={{ fontSize: "16px" }}
            onClick={() => setAction(1)}
          >
            Tous les services
          </p>
        </div>

        <div className="row  position-relative ">
          <div className="" style={style}>
            <div className="row form-boxes">
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
            <div className="row mt-1 form-boxes">
              <label className="col-12 col-sm-5 col-md-3 text">
                Durée de Service:
              </label>
              <div className="col-12 col-sm-5 col-md-9">
                <input
                  type="text"
                  id="titre"
                  name="duree"
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
            <div className="row mt-1 form-boxes">
              <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
                Prix:
              </label>
              <div className="col-12  col-sm-5 col-md-9">
                <input
                  type="number"
                  id="titre"
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
            <div className="row mt-1 form-boxes">
              <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
                quantité:
              </label>
              <div className="col-12 col-sm-5 col-md-9">
                <input
                  type="number"
                  id="quantite"
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
            <div className="row mt-1 form-boxes">
              <label htmlFor="" className="col-12 col-sm-5  col-md-3 text">
                Catégorie:
              </label>
              <div className="col-12 col-sm-5 col-md-9">
                <select
                  name="type"
                  type="text"
                  id="type"
                  value={article ? article?.type : ""}
                  onChange={(e) => handleInputChange("type", e)}
                >
                  <option value="" disabled selected hidden>
                    {" "}
                    Seléctionner un Service
                  </option>
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
              <label htmlFor="" className="col-12 col-sm-5  col-md-3 text">
                Documents:
              </label>
              <div className="col-12 col-sm-5 col-md-9">
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
              <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
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
                  name="titre"
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
            <div className="buttons d-flex justify-content-end">
              <div
                id="submitBtn"
                className=" d-flex justify-content-center  sv-btn col-12 col-md-3"
                onClick={() => onSubmit()}
              >
                <p style={{ fontSize: "16px" }} className="suivant-iden">
                  Enregistrer
                </p>
              </div>
            </div>
            <ToastContainer limit={1} />
          </div>

          <div className="col-12 col-md-5 col-lg-5">
            <div className="row">
              {article.images && article.images.length
                ? article?.images.map((image) => {
                    return (
                      <div className="col-md-6">
                        <img
                          src={`${process.env.REACT_APP_HOST_URL}/${image.path}`}
                          style={{
                            width: "100%",
                            margin: "20px 30px 20px 30px",
                          }}
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
                          {article?.prix ? `${article.prix} Dhs` : ""}
                        </p>
                      </div>{" "}
                    </div>
                    <div className="row mt-4">
                      <div className="d-flex">
                        <p className=" text-side col-5">Documents :</p>
                        <div className=" text-side text-primary col-7">
                          {article?.documents &&
                            article?.documents.map((doc) => {
                              return (
                                <p className="row text-side text-primary ">
                                  {doc.nom}
                                </p>
                              );
                            })}
                        </div>
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
    </form>
  );
}
