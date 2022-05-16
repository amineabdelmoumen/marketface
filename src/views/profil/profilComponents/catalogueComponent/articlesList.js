import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ImmobilierList from "./immobilierList";
import ProductList from "./productList";
import ServiceList from "./serviceList";
export default function ArticlesList({ setArticleType, productComponent }) {
  const articles = useSelector((state) => state.profile.articles);
  console.log("articles are", articles);
  const [articleProduit, setArticleProduit] = useState([]);
  const [articleService, setArticleService] = useState([]);
  const [articleImmobiler, setArticleImmobilier] = useState([]);

  return (
    <div>
      {
        {
          1: <ProductList setArticleType={setArticleType} />,
          2: (
            <ServiceList
              setArticleType={setArticleType}
              articleService={articleService}
            />
          ),
          3: (
            <ImmobilierList
              setArticleType={setArticleType}
              articleImmobiler={articleImmobiler}
            />
          ),
        }[productComponent]
      }
    </div>
  );
}
