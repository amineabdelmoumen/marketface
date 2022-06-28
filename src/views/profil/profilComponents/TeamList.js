import React, { useEffect, useState } from "react";
import { getTeam } from "../../../lib/crud";

export default function TeamList({ setTeam, teamList, setTeamList }) {
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const res = await getTeam(token);
    console.log("team response", res.data);
    setTeamList(res.data);
  }, []);
  return (
    <div style={{ marginTop: "55px" }}>
      {" "}
      <form className="container" name="form-identite" id="form-identite-gen">
        <div className="form-identite-info d-block mt-3">
          <div className="mt-4 d-flex justify-content-end">
            <div
              className=" d-flex justify-content-center  sv-btn col-12 col-md-5 "
              style={{ padding: "0.5rem 1rem" }}
              onClick={() => setTeam(3, 1)}
            >
              <p style={{ fontSize: "16px" }} className="suivant-iden">
                Ajouter un Membre
              </p>
            </div>
          </div>{" "}
          <div className="row mt-4">
            {teamList?.members?.map((membre) => {
              return (
                <div className="col-md-3 position-relative tm-el m-3 d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-column ">
                    <div className="d-flex justify-content-center ">
                      <img src="/imgs/user-image.png" alt="" />
                      <img
                        src="/imgs/status-cnx.png"
                        className="status-cnx"
                        alt=""
                      />
                    </div>
                    <div className="mt-3 d-flex justify-content-center">
                      <p className="nom-pr" style={{ color: "#1C1D21" }}>
                        {`${membre.nom} ${membre.prenom}`}
                      </p>
                    </div>{" "}
                    <div
                      className="mt-3 d-flex justify-content-center"
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "18.41819px",
                        padding: "12px 20px",
                      }}
                    >
                      <p className="nom-pr">{membre.poste}</p>
                    </div>{" "}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}
