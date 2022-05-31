import React, { useState } from "react";

export default function NavBar() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <div className={`collapse bg-white ${toggle ? "show" : ""}`}>
        <div className="bg-dark p-4">
          <a className="text-white ">Ciblage</a>
          <br />
          <a className="text-white  ">Enregistrements</a>
          <br />
          <a className="text-white  ">Achat</a>
          <br />
          <a className="text-white  ">Vente</a> <br />
          <a className="text-white  ">portefeuille</a>
          <br />
          <a className="text-white">Statistique générale </a>
        </div>
      </div>
      <nav className="navbar navbar-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler bg-dark me-auto d-md-block d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="col-5 col-lg-4 offset-lg-1  d-none d-lg-block"></div>
          {/* <div className="col-5 col-lg-4 offset-lg-1  d-none d-lg-block">
            <div className="d-flex justify-content-end mt-3">
              <form className="input-form">
                <input className="text-input" type="text" />
                <span>
                  {" "}
                  <img className="search-icon" src="/imgs/search.svg" alt="" />
                </span>
              </form>
            </div>
          </div> */}

          <div
            className="col-7 col-lg-6 d-none d-lg-block"
            style={{ marginBottom: "-11px" }}
          >
            <div
              className="d-flex justify-content-end "
              style={{ marginTop: "-12px", marginRight: "20px" }}
            >
              <div className="d-flex me-4 justify-content-center align-items-center search">
                <img src="/imgs/Search.png" alt="" />
              </div>
              <div className="d-flex me-4 justify-content-center align-items-center search">
                <img src="/imgs/notification21.png" alt="" />
              </div>

              <div className="d-flex align-items-center ph-icon">
                <div className="me-3">
                  <img
                    src="/imgs/ph-icon.png"
                    alt=""
                    style={{ minHeight: "100%", marginLeft: "6px" }}
                  />
                </div>
                <div>
                  <p className="nom-pro">Ahmed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
