import React, { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function ImmobilierList({ setArticleType }) {
  const [articleImmobilier, setArticleImmobilier] = useState([]);
  const articles = useSelector((state) => state.profile.articles);
  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
  };

  useLayoutEffect(() => {
    console.log("articles are in product list ", articles);
    const articleImmo = articles.filter(
      (article) => article.type_article == "immobilier"
    );

    setArticleImmobilier(articleImmo);
  }, [articles]);
  return (
    <div>
      <div>
        <div className="d-flex justify-content-end m-3">
          <button
            className="btn pointer btn-success text-white rounded-pill px-3"
            onClick={() => setArticleType(3, 1)}
          >
            Ajouter un immobilier
          </button>
        </div>
        <div className="articles row d-flex justify-content-around mb-4">
          {articleImmobilier && articleImmobilier.length
            ? articleImmobilier.map((article) => {
                return (
                  <div className="col-md-5 ">
                    <div className="d-flex justify-content-center mb-2">
                      <h4 className="article-nom">{article.nom}</h4>
                    </div>

                    <div className="card-article mb-4">
                      {article.images && article.images.length ? (
                        <figure>
                          <img
                            className="card-img"
                            src={`${process.env.REACT_APP_HOST_URL}/${article.images[0].path}`}
                            alt="article produit"
                          />
                        </figure>
                      ) : (
                        ""
                      )}
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
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
