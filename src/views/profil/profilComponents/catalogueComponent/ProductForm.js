import React from "react";
import "./styles.scss";
import categories from "../../../../lib/constants/categories";
export default function ProductForm() {
  return (
    <div className="container-fluid ">
      <div className="title d-flex justify-content-center pt-4">
        <img src="/imgs/product.png" alt="" />
      </div>

      <div className="row mt-5 position-relative">
        <div className="col-12 col-md-5">
          <div className="row form-boxes">
            <label className="col-12 col-md-5 text">Il s'agit d'un:</label>
            <div className="col-12 col-md-7">
              <select name="categorie" id="categorie">
                {categories.map((category) => {
                  return <option value={category}>{category}</option>;
                })}
              </select>
            </div>
          </div>
          <div className="row mt-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Nom de l'article:
            </label>
            <div className="col-12 col-md-7">
              <input type="text" id="titre" name="titre" />
            </div>
          </div>
          <div className="row mt-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Description:
            </label>
            <div className="col-12 col-md-7">
              <textarea rows="10" type="text" id="titre" name="titre" />
            </div>
          </div>
          <div className="row mt-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Prix:
            </label>
            <div className="col-12 col-md-7">
              <input type="text" id="titre" name="titre" />
            </div>
          </div>
          <div className="row mt-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Categories
            </label>
            <div className="col-12 col-md-7">
              <input type="text" id="titre" name="titre" />
            </div>
          </div>
          <div className="row mt-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Quantite:
            </label>
            <div className="col-12 col-md-7">
              <input type="text" id="titre" name="titre" />
            </div>
          </div>
          <div className="row mt-3 pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Type:
            </label>
            <div className="col-12 col-md-7">
              <input type="text" id="titre" name="titre" />
            </div>
          </div>
          <div className="row mt-3 pb-3 form-boxes">
            <label htmlFor="" className="col-12 col-md-5 text">
              Join des photos de l'article:
            </label>
            <div className="col-12 col-md-7">
              <input type="text" id="titre" name="titre" />
            </div>
          </div>
        </div>

        <div className="line1"></div>

        <div className="col-12 col-md-5"></div>
      </div>
    </div>
  );
}
