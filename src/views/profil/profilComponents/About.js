import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import regions from "../../../lib/constants/regions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.scss";
import { saveCompany, saveReference } from "../../../lib/crud";

export default function About() {
  const about = useSelector((state) => state.profile);
  const id = about.identite.id;
  const navigate = useNavigate();
  const [changePhoneNumber, setChangePhoneNumber] = useState(0);
  const [ChangedState, setChangedState] = useState({
    identite: 0,
    reference: 0,
  });
  const [showOnSaveButton, setShowOnsaveButton] = useState(0);

  const [aboutIdentite, setAboutIdentite] = useState(about.identite);
  console.log(aboutIdentite.website);
  const [referenceAbout, setReferenceAbout] = useState(about.references[id]);

  useEffect(() => {
    let text = document.getElementById("textarea").value;
    let lines = text.split(/\r|\r\n|\n/);
    let count = lines.length;

    console.log("number of lines", count + 1);
  }, []);
  const handleOnChange = (element, e) => {
    setShowOnsaveButton(1);
    if (element[0] == "identite") {
      let identitie = { ...aboutIdentite };
      identitie[element[1]] = e.target.value;
      console.log(e.target.value);
      setAboutIdentite(identitie);
      setChangedState({ ...ChangedState, identite: 1 });
    }
    if (element[0] == "references") {
      let referenc = { ...referenceAbout };
      referenc[element[1]] = e.target.value;
      setReferenceAbout(referenc);
      console.log("references are ", referenc);
      setChangedState({ ...ChangedState, reference: 1 });
    }
  };
  const handleOnsaveAbout = async () => {
    const token = localStorage.getItem("token");
    if (ChangedState.identite == 1) {
      await saveCompany(aboutIdentite, token);
      console.log("company updated");
    }
    if (ChangedState.reference == 1) {
      await saveReference(referenceAbout, token);
      console.log("reference updated");
    }
  };
  const formatPhoneNumber = (phoneNumber) => {
    let FormatedPhoneNumber = "";
    for (let i = 0; i < phoneNumber.length; i++) {
      if (i % 2 == 0) {
        FormatedPhoneNumber += phoneNumber[i];
      } else {
        FormatedPhoneNumber += phoneNumber[i] + " ";
      }
    }

    return FormatedPhoneNumber;
  };
  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
  };

  return (
    <div className="about position-relative">
      <i class="fa-solid fa-ellipsis eclipse"></i>
      <div className="about-flex">
        <div>
          <p className="title">A propos</p>{" "}
        </div>
        <textarea
          style={styleText}
          id="textarea"
          className="text"
          value={
            referenceAbout && referenceAbout["description"] != null
              ? referenceAbout["description"]
              : ""
          }
          onChange={(e) => handleOnChange(["references", "description"], e)}
        ></textarea>
        <p className="activite-title">Activities</p>
        <div className="px-4 mt-2">
          <div className="row">
            <p className="activite col-12 col-md-4 mt-3 me-4 px-4">
              {about.identite?.activite}
            </p>
          </div>
          <div className="form-area">
            <div className="row d-flex align-items-center mt-3">
              <div className="col-12 col-lg-4 address mt-2 ">
                <div className="d-flex">
                  <img className="local-image" src="/imgs/cafe.svg" alt="" />
                  <select
                    name="region"
                    id="region"
                    defaultValue={aboutIdentite?.region}
                    className="local-text"
                    style={styleText}
                    onChange={(e) => handleOnChange(["identite", "region"], e)}
                  >
                    {regions.map((region) => {
                      return <option value={region}>{region}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="col-12 col-lg-4 address mt-2">
                {" "}
                <div className="d-flex align-items-center">
                  <a href="#">
                    <img
                      className="local-image"
                      src="/imgs/communications.svg"
                      alt=""
                    />
                  </a>

                  <input
                    value={
                      aboutIdentite?.website != null
                        ? `${aboutIdentite?.website.toLowerCase()}`
                        : ""
                    }
                    type="text"
                    style={styleText}
                    className="local-text"
                    onChange={(e) => handleOnChange(["identite", "website"], e)}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-4 address mt-2">
                <div className="d-flex align-items-center">
                  <img className="local-image" src="/imgs/job.svg" alt="" />
                  {changePhoneNumber == 1 ? (
                    <textarea
                      type="number"
                      col={2}
                      rows={1}
                      onChange={(e) =>
                        handleOnChange(["identite", "telephone"], e)
                      }
                      style={styleText}
                      className="local-text"
                      value={aboutIdentite?.telephone}
                    ></textarea>
                  ) : (
                    <textarea
                      type="number"
                      col={2}
                      onClick={() => setChangePhoneNumber(1)}
                      rows={1}
                      style={styleText}
                      className="local-text"
                      value={formatPhoneNumber(aboutIdentite.telephone)}
                    ></textarea>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="d-flex mt-3 justify-content-end mt-3">
                  {showOnSaveButton == 1 ? (
                    <button
                      type="button"
                      className="btn pointer btn-success text-white m-4 rounded-pill px-4"
                      onClick={() => handleOnsaveAbout()}
                    >
                      Save Changes
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
