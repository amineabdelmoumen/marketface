import React from "react";

export default function LegalInformPat2({ setLegalcomponent }) {
  return (
    <div className="container-fluid position-absolute">
      <img
        src="/imgs/back.png"
        onClick={() => setLegalcomponent(0)}
        className="back-btn cursor-pointer"
        alt=""
      />

      <div className="p-5 position-relative">
        <div className="legal2">
          <div className="p-4">
            <div className="vl1">
              <div className="d-flex flex-column px-4">
                <div className="row mt-2 ">
                  <div className="col-md-4"> Section</div>
                  <div className="col-md-4"> Section X</div>
                </div>
                <div className="row mt-2 ">
                  <div className="col-md-4"> Branch</div>
                  <div className="col-md-4"> Branch X</div>
                </div>
                <div className="row mt-2 ">
                  <div className="col-md-4"> Sous Branch</div>
                  <div className="col-md-4"> Sous Branch X</div>
                </div>
                <div className="row mt-2 ">
                  <div className="col-md-4"> Activités</div>
                  <div className="col-md-4"> Activités X</div>
                </div>
                <div className="row mt-2 ">
                  <div className="col-md-4"> Mes Selections</div>
                  <div className="col-md-4"> Mes Selections X</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
