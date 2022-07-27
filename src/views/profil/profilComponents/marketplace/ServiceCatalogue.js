import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedArticle } from "../../../../store/ArticleSlice";

import "./../catalogueComponent/styles.scss";
export default function ServiceCatalogue({}) {
  const [ProductCatalogue, setProductCatalogue] = useState([]);
  const catalogues = useSelector((state) => state.root.catalogues);

  const dispatch = useDispatch();

  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
    wordWrap: "break-word",
    innerWidth: "fit-content",
  };

  useEffect(() => {
    const articlesProd = catalogues.filter(
      (article) => article.type_article == "service"
    );

    const sortedArticles = articlesProd
      .slice()
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    setProductCatalogue(sortedArticles);
  }, [catalogues]);

  return (
    <div>
      <div className="d-flex">
        <div
          className="title-identite"
          style={{ marginBottom: "16px", fontSize: "18px" }}
        >
          Marketplace-Service
        </div>
      </div>
      <form
        className="container"
        name="form-identite"
        id="form-identite-gen"
        style={{ padding: "14px 30px" }}
      >
        {/* <div className="page_number">1/2</div> */}

        <div className="form-identite-info d-block mt-3 position-relative">
          {/*  <div
          className="d-flex justify-content-end"
          style={{ marginTop: "40px", marginRight: "30px" }}
        >
          <button
            className="add-btn btn pointer btn-success text-white rounded-pill px-3"
            onClick={() => setArticleType(1, 1)}
          >
            Ajouter un produit
          </button>
        </div> */}

          <div
            className="articles row d-flex justify-content-start mb-4"
            style={{ marginTop: "20px" }}
          >
            {ProductCatalogue && ProductCatalogue.length
              ? ProductCatalogue.map((article) => {
                  return (
                    <div className="col-md-3 ">
                      <div className="card-article mb-4 position-relative">
                        {article.images && article.images.length ? (
                          <figure>
                            <img
                              className="card-img"
                              src={`${process.env.REACT_APP_HOST_URL}/${article?.images[0]?.path}`}
                              alt="article produit"
                            />
                          </figure>
                        ) : (
                          ""
                        )}

                        <div className="items1 d-flex">
                          <div className="d-flex me-auto mt-2">
                            <p className=" type-article me-2">{article.nom}</p>
                          </div>

                          {/* <div className="d-flex justify-content-end">
                          <button
                            onClick={() => ModifyArticle(article)}
                            className="btn pointer btn-success text-white rounded-pill px-3"
                          >
                            Modifier
                          </button>
                        </div> */}
                        </div>
                        <div className="position-relative">
                          <div
                            className="d-flex"
                            style={{ margin: "30px 16px" }}
                          >
                            <div className="me-auto prx">Prix</div>
                            <div className="price">{`${article.prix} MDH`}</div>
                          </div>
                          <div className="ln-crd "></div>
                          <div
                            className="d-flex"
                            style={{ margin: "30px 16px" }}
                          >
                            <div className="me-auto prx">Author</div>
                            <div className="d-flex justify-content-around">
                              <img
                                src="/imgs/author.png"
                                className="auth-img me-2"
                                alt=""
                              />
                              <p className="auth-nm">Jamal Y</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </form>
    </div>
  );
}
