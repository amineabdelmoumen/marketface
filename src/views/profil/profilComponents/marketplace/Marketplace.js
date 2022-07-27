import React, { useEffect } from "react";
import { getCatalogues } from "../../../../lib/crud";
import { useDispatch, useSelector } from "react-redux";

import { setCatalogues } from "../../../../store/rootSlice";
import ProductCatalogue from "./ProductCatalogue";
import ServiceCatalogue from "./ServiceCatalogue";
import ImmobilierCatalogue from "./ImmobilierCatalogue";
export default function Marketplace({ CatalogueType, setCatalogueType }) {
  const allCatalogues = useSelector((state) => state.root.catalogues);
  const dispatch = useDispatch();
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const catalogues = await getCatalogues(token);
    console.log(" all catalogues", catalogues.data.data);
    dispatch(setCatalogues(catalogues.data.data));
  }, []);

  return (
    <div>
      {
        {
          1: <ProductCatalogue />,
          2: <ServiceCatalogue />,
          3: <ImmobilierCatalogue />,
        }[CatalogueType]
      }{" "}
    </div>
  );
}
