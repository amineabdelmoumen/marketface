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

  useEffect(() => {
    const articlesProd = [];
    const articlesServ = [];
    const articlesImmob = [];
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].type_article == "produit") {
        articlesProd.push(articles[i]);
      } else if (articles[i].type_article == "service") {
        articlesServ.push(articles[i]);
        //adding services here
      } else if (articles[i].type_article == "immobilier") {
        articlesImmob.push(articles[i]);
      }
    }
    setArticleProduit(articlesProd);
    setArticleService(articlesServ);
    setArticleImmobilier(articlesImmob);
  }, []);

  return (
    <div>
      {
        {
          1: (
            <ProductList
              setArticleType={setArticleType}
              articleProduit={articleProduit}
            />
          ),
          2: (
            <ServiceList
              setArticleType={setArticleType}
              articleService={articleService}
            />
          ),
          3: (
            <ImmobilierList
              setArticleType={setArticleType}
              articleImmobilier={articleImmobiler}
            />
          ),
        }[productComponent]
      }
    </div>
  );
}
