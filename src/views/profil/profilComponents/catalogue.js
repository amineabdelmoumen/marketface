import React, { useState } from "react";
import CatalogueMenu from "./catalogueComponent/catalogueMenu";
import ProductForm from "./catalogueComponent/ProductForm";

export default function Catalogue() {
  const [productComponent, setProductComponent] = useState(0);

  return (
    <div className="form-box mt-2">
      <div>
        {
          {
            0: <CatalogueMenu setProductComponent={setProductComponent} />,
            1: <ProductForm />,
          }[productComponent]
        }
      </div>
    </div>
  );
}
