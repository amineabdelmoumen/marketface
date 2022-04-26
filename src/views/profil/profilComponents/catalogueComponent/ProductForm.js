import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
import categories from "../../../../lib/constants/categories";
import { setArticle, setArticles } from "../../../../store/profileSlice";
import { saveImages } from "../../../../lib/crud";
let uploadForm = new FormData();
export default function ProductForm() {
  const identite = useSelector((state) => state.profile.identite);
  const articles = useSelector((state) => state.profile.articles);
  const [article, setArticles] = useState({ company_id: identite.id });
  console.log(articles);
  const style = {
    padding: "22px",
    marginBottom: "20px",
  };
  const style1 = {};

  const handleInputChange = (field, e) => {
    let data = { ...article };
    data[field] = e.target.value;
    setArticles(data);
    console.log(data);
    console.log(article);
  };
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
      data["images"] = response.paths;
      setArticles(data);
    });
  };
  return (
    <div className="container-fluid ">
      <div className="title d-flex justify-content-center pt-4">
        <img src="/imgs/product.png" alt="" />
      </div>

      <div className="row mt-5 position-relative ">
        <div className="col-12 col-lg-7 inputs" style={style}>
          <div className="row form-boxes">
            <label className="col-12 col-sm-5 col-md-3">
              Nom de l'article:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <select
                name="type"
                id="type"
                onChange={(e) => handleInputChange("type", e)}
              >
                {categories.map((category) => {
                  return <option value={category}>{category}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Type de prix:
            </label>
            <div className="col-12  col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="titre"
                onChange={(e) => handleInputChange("nom", e)}
              />
            </div>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Description:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="titre"
                onChange={(e) => handleInputChange("description", e)}
              />
            </div>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5  col-md-3 text">
              Prix:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="prix"
                onChange={(e) => handleInputChange("prix", e)}
              />
            </div>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Categories
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="categorie"
                onChange={(e) => handleInputChange("categorie", e)}
              />
            </div>
          </div>
          <div className="row mt-1 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Quantite:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="quantite"
                onChange={(e) => handleInputChange("quantite", e)}
              />
            </div>
          </div>
          <div className="row mt-1 pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Type:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <input
                type="text"
                id="titre"
                name="ype_article"
                onChange={(e) => handleInputChange("type_article", e)}
              />
            </div>
          </div>
          <div className="row  pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-4 text">
              Join des documents:
            </label>
            <div className="col-12 col-sm-5 col-md-8">
              <label htmlFor="logo" className="text-center upload">
                Choisir un fichier
                <input
                  onChangeCapture={(e) => handlePhotosUpload(e)}
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleInputChange("documents", e)}
                />
              </label>
            </div>
          </div>
          <div className="row  pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-4 text">
              Join des photos de l'article:
            </label>
            <div className="col-12 col-sm-5 col-md-8">
              <label htmlFor="logo" className="text-center upload">
                Choisir un fichier
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) => handleInputChange("images", e)}
                />
              </label>
            </div>
          </div>
          <div className="row mt-1 pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-sm-5 col-md-3 text">
              Description:
            </label>
            <div className="col-12 col-sm-5 col-md-9">
              <textarea rows={5} id="titre" name="titre"></textarea>
            </div>
          </div>
          <div className="d-flex justify-content-end ">
            <button className="btn pointer btn-success text-white rounded-pill px-5 text-f">
              Enregistrer
            </button>
          </div>
        </div>

        <div className="col-12 col-md-5 col-lg-5">
          {/* <div className="article">
            <div className="content">
              <div className="row">
                <div className="col-md-5">
                  <div className="row">
                    {" "}
                    <h3 className="text-primary title">Nom de l'article</h3>
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex justify-content-between ">
                      <p className="text-dark">categorie</p>
                      <p>---------------</p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex justify-content-between gap-1">
                      <p className="text-dark">Quantite</p>
                      <p>---------------</p>
                    </div>{" "}
                  </div>
                  <div className="row mt-4">
                    <div className="d-flex justify-content-between gap-1">
                      <p className="text-dark">Type</p>
                      <p>---------------</p>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
