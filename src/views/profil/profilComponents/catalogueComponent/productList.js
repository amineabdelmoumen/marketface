import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";
export default function ProductList({ setArticleType }) {
  const [articleProduct, setArticleProduct] = useState([]);
  const unsortedArticles = useSelector((state) => state.profile.articles);
  const [articles, setArticles] = useState([]);

  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
    wordWrap: "break-word",
    innerWidth: "fit-content",
  };

  useEffect(() => {
    const sortedArticles = unsortedArticles
      .slice()
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    setArticles(sortedArticles);
  }, []);

  useEffect(() => {
    const articleProd = articles.filter(
      (article) => article.type_article == "produit"
    );

    setArticleProduct(articleProd);
  }, [articles]);

  return (
    <div>
      <div className="d-flex justify-content-end m-3">
        <button
          className="add-btn btn pointer btn-success text-white rounded-pill px-3"
          onClick={() => setArticleType(1, 1)}
        >
          Ajouter un produit
        </button>
      </div>

      <div className="articles row d-flex justify-content-around mb-4">
        {articleProduct && articleProduct.length
          ? articleProduct.map((article) => {
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

                    <div className="items d-flex">
                      <div className="d-flex me-auto mt-2">
                        <p className=" type-article me-2">{article.type}</p>
                        <p className="prix">{`${article.prix} Dhs`}</p>
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
                        style={styleText}
                        className="text description-article"
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
  );
}
