import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function ProductList({ setArticleType, articleProduit }) {
  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
    wordWrap: "break-word",
  };

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <button
          className="btn pointer btn-success text-white rounded-pill px-3"
          onClick={() => setArticleType(1, 1)}
        >
          Ajouter un produit
        </button>
      </div>

      <div className="articles row d-flex justify-content-around mb-4">
        {articleProduit && articleProduit.length
          ? articleProduit.map((article) => {
              if (article.images && article.images.length) {
                return (
                  <div className="col-md-5 ">
                    <div className="d-flex justify-content-center mb-2">
                      <h4 className="article-nom">{article.nom}</h4>
                    </div>

                    <div className="card-article mb-4">
                      <figure>
                        <img
                          className="card-img"
                          src={`${process.env.REACT_APP_HOST_URL}/${article.images[0].path}`}
                          alt="article produit"
                        />
                      </figure>
                      <div className="d-flex ">
                        <div className="d-flex me-auto mt-2">
                          <p className=" type-article me-2">{article.type}</p>
                          <p className="prix">{article.prix}</p>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button className="btn pointer btn-success text-white rounded-pill px-3">
                            Contacter
                          </button>
                        </div>
                      </div>
                      <div className="mt-4">
                        {" "}
                        <textarea
                          name=""
                          id=""
                          cols="50"
                          rows="3"
                          style={styleText}
                          className="description-article"
                        >
                          {article.description}
                        </textarea>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return <div>hdgkfvf</div>;
              }
            })
          : ""}
      </div>
    </div>
  );
}
