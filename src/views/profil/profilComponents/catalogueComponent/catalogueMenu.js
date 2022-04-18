import React from "react";

export default function CatalogueMenu({ setProductComponent }) {
  const style1 = {
    marginLeft: "120px",
    marginBottom: "40px",
    fontSize: "20px",
  };
  const styleText = {
    paddingLeft: "40px",
  };

  const style2 = {
    paddingTop: "80px",
    paddingRight: "1.5rem",
    paddingLeft: "1.5rem",
  };
  return (
    <div style={style2}>
      <div className="row">
        <p className="col-4 offset-md-3 text-primary m-4">
          Vous Voulez Ajouter :
        </p>
      </div>

      <div className="row pb-5">
        <div className=" col-md-3 mt-3 me-4 offset-md-1">
          <button
            className="col-12 btn btn-success text-white px-3 py-4 position-relative"
            onClick={() => setProductComponent(1)}
          >
            <img src="/imgs/product.svg" alt="" className="catalogue-icon" />
            <span style={styleText}>Product</span>
          </button>
        </div>
        <div className="col-md-3 mt-3 me-4">
          <button className="col-12 btn bg-white border-primary text-primary px-3 py-4 position-relative">
            <img src="/imgs/service.svg" alt="" className="catalogue-icon" />
            <span style={styleText}>Service</span>
          </button>
        </div>
        <div className="col-md-4 mt-3  ">
          <button className="col-12 btn bg-white border-primary text-primary px-4 py-4 position-relative">
            <img src="/imgs/house.svg" alt="" className="catalogue-icon" />
            <span style={styleText}>Bien Immobilier</span>
          </button>
        </div>
      </div>
    </div>
  );
}
