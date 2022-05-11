import React, { useState } from "react";
import ImmobilierForm from "./ImmobilierForm";
import ProductForm from "./ProductForm";
import ServiceMenu from "./ServiceMenu";

export default function CatalogueMenu() {
  const [productComponent, setProductComponent] = useState(1);
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
            className={
              productComponent == 1
                ? "d-flex justify-content-center cursor-pointer rounded-pill py-1 bg-success text-white "
                : "d-flex justify-content-center btn  btn-outline-primary rounded-pill py-1 bg-white text-primary"
            }
            onClick={() => setProductComponent(1)}
          >
            <img
              style={{ width: "25px" }}
              src={
                productComponent == 1
                  ? "/imgs/product.svg"
                  : "imgs/product12.png"
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
                ? "d-flex justify-content-center cursor-pointer rounded-pill py-1 bg-success text-white "
                : "d-flex justify-content-center btn  btn-outline-primary rounded-pill py-1 bg-white text-primary"
            }
          >
            <img style={{ width: "25px" }} src="/imgs/service.svg" alt="" />
            <span className="catalogue-text">Service</span>
          </div>
        </div>
        <div className="col-12  col-md-3 mt-3 me-2 ">
          <div
            onClick={() => setProductComponent(3)}
            className={
              productComponent == 3
                ? "d-flex justify-content-center cursor-pointer rounded-pill py-1 bg-success text-white "
                : "d-flex justify-content-center btn  btn-outline-primary rounded-pill py-1 bg-white text-primary"
            }
          >
            <img style={{ width: "25px" }} src="/imgs/house.svg" alt="" />
            <span className="catalogue-text">Bien Immobilier</span>
          </div>
        </div>
      </div>

      {
        {
          1: <ProductForm />,
          2: <ServiceMenu />,
          3: <ImmobilierForm />,
        }[productComponent]
      }
    </div>
  );
}
