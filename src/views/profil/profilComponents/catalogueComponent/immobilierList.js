import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedArticle } from "../../../../store/ArticleSlice";

export default function ImmobilierList({ setAction }) {
  const [articleImmobilier, setArticleImmobilier] = useState([]);

  const articles = useSelector((state) => state.profile.articles);
  const dispatch = useDispatch();
  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
  };
  useEffect(() => {
    const articlesImmo = articles.filter(
      (article) => article.type_article == "immobilier"
    );

    const sortedArticles = articlesImmo
      .slice()
      .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
    setArticleImmobilier(sortedArticles);
  }, [articles]);

  const ModifyArticle = (article) => {
    console.log("article", article);
    dispatch(setSelectedArticle(article));
    console.log("article updated  succesfully");
    setAction(2);
  };

  return (
    <div>
      <div className="d-flex">
        <div
          className="title-identite"
          style={{ marginBottom: "16px", fontSize: "18px" }}
        >
          Mon Catalogue-Immobilier
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
          <div
            className="articles row row-cols-4 d-flex justify-content-around mb-4"
            style={{ marginTop: "20px" }}
          >
            {articleImmobilier && articleImmobilier.length
              ? articleImmobilier.map((article) => {
                  return (
                    <div className="col ">
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

                          <div className="ln-crd"></div>
                          <div
                            className="d-flex"
                            style={{ margin: "30px 16px" }}
                          >
                            <div className="me-auto prx">Author</div>
                            <div className="d-flex justify-content-around ">
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
          <div className=" d-flex justify-content-end">
            <div
              className=" d-flex justify-content-center  sv-btn col-12 col-md-5 "
              onClick={() => setAction(2)}
            >
              <p style={{ fontSize: "15px" }} className="suivant-iden">
                Ajouter un Immobilier
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
