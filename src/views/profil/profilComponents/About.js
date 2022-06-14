import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import regions from "../../../lib/constants/regions";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import "./../styles.scss";
import { saveCompany, saveReference, getProfile } from "../../../lib/crud";
import { setProfil, setReferences } from "../../../store/profileSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function About() {
  const marque = useSelector((state) => state.profile.marque);
  const dispatch = useDispatch();
  const toastId = useRef(null);
  const toastPending = (field) =>
    (toastId.current = toast(
      `La modification de ${field} est en cours ......`,
      {
        autoClose: 10000,
        type: toast.TYPE.INFO,
        position: toast.POSITION.TOP_CENTER,
      }
    ));
  const toastSuccess = () =>
    (toastId.current = toast.update(toastId.current, {
      render: "Article Produit a été ajouté  avec succés",
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastSuccessUpdate = (field) =>
    (toastId.current = toast.update(toastId.current, {
      render: `${field} a été Modifié  avec succés`,
      autoClose: 1500,
      type: toast.TYPE.SUCCESS,
      position: toast.POSITION.TOP_CENTER,
    }));
  const toastError = (error) =>
    (toastId.current = toast.update(toastId.current, {
      render: `${error}`,
      autoClose: 1500,
      type: toast.TYPE.ERROR,
      position: toast.POSITION.TOP_CENTER,
    }));
  const about = useSelector((state) => state.profile);
  const id = about.identite.id;
  console.log("id", id);
  console.log("about is", about);
  const navigate = useNavigate();
  const [changePhoneNumber, setChangePhoneNumber] = useState(0);
  const [ChangedState, setChangedState] = useState({
    identite: 0,
    reference: 0,
  });
  const [showOnSaveButton, setShowOnsaveButton] = useState(0);

  const [aboutIdentite, setAboutIdentite] = useState(about.identite);
  console.log(aboutIdentite.website);

  const [referenceAbout, setReferenceAbout] = useState(
    about.references[about.references.length - 1]
  );
  console.log("referenceAbout id", referenceAbout);
  /* console.log("+++++++++++++++", referenceAbout["description"]); */
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

    try {
      toastPending();
      if (ChangedState.identite == 1) {
        await saveCompany(aboutIdentite, token);
        toastSuccessUpdate("identite");
        const profil = await getProfile(token);
        dispatch(setProfil(profil));
      }
      if (ChangedState.reference == 1) {
        await saveReference(referenceAbout, token);

        console.log("reference updated");
        toastSuccessUpdate("identite");
      }
    } catch (error) {
      toastError(error);
    }
  };
  const formatPhoneNumber = (phoneNumber) => {
    let FormatedPhoneNumber = "";
    if (phoneNumber !== undefined) {
      for (let i = 0; i < phoneNumber.length; i++) {
        if (i % 2 == 0) {
          FormatedPhoneNumber += phoneNumber[i];
        } else {
          FormatedPhoneNumber += phoneNumber[i] + " ";
        }
      }
      return FormatedPhoneNumber;
    } else {
      return "";
    }
  };
  const styleText = {
    border: "none",
    backgroundColor: "white",
    resize: "none",
    textTransform: "none",
  };
  const style = {
    marginRight: "10px",
  };
  const styleClicked = {
    background: "linear-gradient(90deg, #36a9e1 0%, #092d58 100%)",
  };

  return (
    <div>
      <div className="row" style={{ marginLeft: "7px", marginTop: "56px" }}>
        {" "}
        <div className="about position-relative">
          <i class="fa-solid fa-ellipsis eclipse"></i>
          <div className="about-flex">
            <div className="d-flex">
              <p className="title position-relative">
                Description de l'entreprise
              </p>{" "}
            </div>
            <div className="xline-about"></div>
            <div style={{ marginBottom: "70px" }} className="xline-about"></div>
            <textarea
              style={styleText}
              id="textarea"
              className="text mt-2 position-relative"
              value={
                referenceAbout && referenceAbout["description"] != null
                  ? referenceAbout["description"]
                  : ""
              }
              onChange={(e) => handleOnChange(["references", "description"], e)}
            ></textarea>

            <div style={{ marginTop: "60px" }}>
              <div className=" d-flex title">
                <p
                  style={{ fontSize: "16px" }}
                  className="xfg xfg-clicked position-relative"
                >
                  Activité{" "}
                </p>{" "}
              </div>
              <div className="row " style={{ marginLeft: "22px" }}>
                <div className="row  wrapper col-12 col-md-4 mt-3 me-4 px-4">
                  <p style={{ fontSize: "16px" }} className="activite ">
                    {about.identite?.activite}
                  </p>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "50px" }}>
              <div className=" d-flex title">
                <p
                  style={{ fontSize: "16px" }}
                  className="xfg xfg-clicked position-relative"
                >
                  Contacts{" "}
                </p>{" "}
              </div>
              <div className="d-flex justify-content-around m-2">
                <div className="con-info  me-3 mt-3 ">
                  <div className="d-flex" style={{ padding: "20px 13px" }}>
                    <div className="me-auto">
                      <p className="title-info">Adresse</p>
                      <p className="info">{aboutIdentite?.region}</p>
                    </div>
                    <div className="icon-info1">
                      <img src="/imgs/local.png" alt="" />
                    </div>
                  </div>
                </div>

                <div className="con-info   mt-3 me-2 ">
                  {" "}
                  <div className="d-flex" style={{ padding: "20px 13px" }}>
                    <div className="me-auto">
                      <p className="title-info">Website</p>
                      <p className="info">{aboutIdentite?.website}</p>
                    </div>
                    <div
                      className="icon-info1"
                      style={{
                        backgroundColor:
                          "linear-gradient(0deg, rgba(244, 190, 94, 0.1), rgba(244, 190, 94, 0.1)), #FFFFFF",
                      }}
                    >
                      <img src="/imgs/website.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="con-info  mt-3 ">
                  {" "}
                  <div className="d-flex" style={{ padding: "20px 13px" }}>
                    <div className="me-auto">
                      <p className="title-info">Telephone</p>
                      <p className="info">
                        {formatPhoneNumber(aboutIdentite?.telephone)}
                      </p>
                    </div>
                    <div className="icon-info1">
                      <img src="/imgs/phone12.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="px-4 mt-2 ">
              

              <div className="form-area">
                <div className="row d-flex align-items-center mt-3">
                  <div className="col-12 col-lg-4 address mt-2 ">
                    <div className="d-flex">
                      <img
                        className="local-image"
                        src="/imgs/cafe.svg"
                        alt=""
                      />
                      <select
                        name="region"
                        id="region"
                        defaultValue={aboutIdentite?.region}
                        className="local-text"
                        style={styleText}
                        onChange={(e) =>
                          handleOnChange(["identite", "region"], e)
                        }
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
                          aboutIdentite && aboutIdentite.website != null
                            ? `${aboutIdentite?.website.toLowerCase()}`
                            : ""
                        }
                        type="text"
                        style={styleText}
                        className="local-text"
                        onChange={(e) =>
                          handleOnChange(["identite", "website"], e)
                        }
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
                <ToastContainer limit={1} />
              </div>
            </div>
          </div>{" "} */}
          </div>
        </div>
      </div>
    </div>
  );
}
