import React, { useState } from "react";
import CatalogueMenu from "./catalogueComponent/catalogueMenu";
import ProductForm from "./catalogueComponent/ProductForm";

export default function Catalogue() {
  return (
    <div className="form-box mt-2">
      <div>
        <CatalogueMenu />
      </div>
    </div>
  );
}
