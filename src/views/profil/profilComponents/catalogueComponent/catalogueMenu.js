import React, { useState } from "react";
import ProductForm from "./ProductForm";

export default function CatalogueMenu() {
  const [productComponent, setProductComponent] = useState(0);
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
      <div className="row suggest-block">
        <p className="col-12 col-md-2  mt-4 me-2 suggest">
          Vous Voulez Ajouter :
        </p>

        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div
            className="d-flex justify-content-center cursor-pointer rounded-pill py-1 bg-success text-white "
            onClick={() => setProductComponent(1)}
          >
            <img style={{ width: "25px" }} src="/imgs/product.svg" alt="" />
            <span className="catalogue-text">Product</span>
          </div>
        </div>
        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div className="d-flex justify-content-center btn  btn-outline-primary rounded-pill py-1 bg-white text-primary">
            <img style={{ width: "25px" }} src="/imgs/service.svg" alt="" />
            <span className="catalogue-text">Service</span>
          </div>
        </div>
        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div className="d-flex justify-content-center btn  btn-outline-primary rounded-pill py-1 bg-white text-primary">
            <img style={{ width: "25px" }} src="/imgs/house.svg" alt="" />
            <span className="catalogue-text">Bien Immobilier</span>
          </div>
        </div>
      </div>
      <div>{productComponent == 1 ? <ProductForm /> : ""}</div>
    </div>
  );
}
