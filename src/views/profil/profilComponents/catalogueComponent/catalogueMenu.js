import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedArticle } from "../../../../store/ArticleSlice";
import ArticlesList from "./articlesList";
import ImmobilierForm from "./ImmobilierForm";
import ProductForm from "./ProductForm";
import ServiceMenu from "./ServiceMenu";

export default function CatalogueMenu() {
  const [productComponent, setProductComponent] = useState(1);
  const [article, setArticle] = useState(0);
  const dispatch = useDispatch();
  const setArticleType = (number, article) => {
    setArticle(article);
    setProductComponent(number);
  };
  useEffect(() => {
    dispatch(setSelectedArticle({}));
  }, [productComponent, article]);

  const style1 = {
    marginLeft: "120px",
    marginBottom: "40px",
    fontSize: "20px",
  };

  const style2 = {
    paddingTop: "40px",
    paddingRight: "1.5rem",
    paddingLeft: "1.5rem",
  };
  return (
    <div style={style2}>
      <div
        className={
          article != 0
            ? "row suggest-block"
            : "d-flex justify-content-around flex-wrap mb-3"
        }
      >
        {article != 0 ? (
          <p className="col-12 col-md-2  mt-4 me-2 suggest">
            Vous Voulez Ajouter :
          </p>
        ) : (
          ""
        )}

        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div
            className={
              productComponent == 1
                ? "d-flex cursor-pointer rounded-pill py-1 bg-success text-white item "
                : "d-flex btn btn-outline-primary rounded-pill py-1 bg-white text-primary item"
            }
            onClick={() => setProductComponent(1)}
          >
            <img
              style={{ width: "25px" }}
              src={
                productComponent == 1
                  ? "/imgs/product.svg"
                  : "imgs/product121.png"
              }
              alt=""
            />
            <span className="catalogue-text">Product</span>
          </div>
        </div>
        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div
            onClick={() => setProductComponent(2)}
            className={
              productComponent == 2
                ? "d-flex  cursor-pointer rounded-pill py-1 bg-success text-white item"
                : "d-flex btn  btn-outline-primary rounded-pill py-1 bg-white text-primary item"
            }
          >
            <img
              style={{ width: "25px" }}
              src={
                productComponent == 2
                  ? "/imgs/service12.png"
                  : "imgs/service.svg"
              }
              alt=""
            />
            <span className="catalogue-text">Service</span>
          </div>
        </div>
        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div
            onClick={() => setProductComponent(3)}
            className={
              productComponent == 3
                ? "d-flex  cursor-pointer rounded-pill py-1 bg-success text-white item1"
                : "d-flex  btn  btn-outline-primary rounded-pill py-1 bg-white text-primary item1"
            }
          >
            <img style={{ width: "25px" }} src="/imgs/house.svg" alt="" />
            <span className="catalogue-text">Bien Immobilier</span>
          </div>
        </div>
      </div>

      {
        {
          0: (
            <ArticlesList
              setArticleType={setArticleType}
              productComponent={productComponent}
            />
          ),
          1: {
            1: (
              <ProductForm
                setArticleType={setArticleType}
                productComponent={productComponent}
              />
            ),
            2: <ServiceMenu setArticleType={setArticleType} />,
            3: <ImmobilierForm setArticleType={setArticleType} />,
          }[productComponent],
        }[article]
      }
    </div>
  );
}
