import React, { useState } from "react";
import Acuality from "./Acuality";
import Annonce from "./Annonce";
import Catalogue from "./catalogue";
import Identity from "./Identity";

export default function CompanyDetails() {
  const [selectedText, setSelectedText] = useState(1);
  const selectComponent = () => {
    if (selectedText == 1) {
      return <Identity />;
    } else if (selectedText == 2) {
      return <Catalogue />;
    } else if (selectedText == 3) {
      return <Annonce />;
    } else if (selectedText == 4) {
      return <Acuality />;
    }
  };
  return (
    <div>
      <div className="d-flex justify-content-around about p-3 ">
        <div>
          <h3
            className={
              selectedText == 1
                ? "text-select fw-normal text-success"
                : "text-select fw-normal text-primary"
            }
            onClick={() => setSelectedText(1)}
          >
            Identité
          </h3>
        </div>
        <div>
          <h3
            className={
              selectedText == 2
                ? "text-select fw-normal text-success"
                : "text-select fw-normal text-primary"
            }
            onClick={() => setSelectedText(2)}
          >
            Catalogue
          </h3>
        </div>
        <div>
          <h3
            className={
              selectedText == 3
                ? "text-select fw-normal text-success"
                : "text-select fw-normal text-primary"
            }
            onClick={() => setSelectedText(3)}
          >
            Annonces
          </h3>
        </div>
        <div>
          <a
            className={
              selectedText == 4
                ? "text-select fw-normal text-success"
                : "text-select fw-normal text-primary"
            }
            onClick={() => setSelectedText(4)}
          >
            Actualité
          </a>
        </div>
      </div>
      {selectComponent()}
    </div>
  );
}
