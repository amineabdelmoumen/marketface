import React, { useEffect, useState } from "react";
import { getMessages, getTeam } from "../../../lib/crud";
import { checkAuth } from "../../../lib/auth";
import Chat from "./Chat";
import ChatInfo from "./ChatInfo";

import { useSelector, useDispatch } from "react-redux";
import { setMembers, setUser } from "../../../store/rootSlice";

export default function TeamList({ setTeam, teamList, setTeamList }) {
  const [closed, setClosed] = useState(0);
  const [chatWith, setChatWith] = useState(1);
  const dispatch = useDispatch();

  const [membre, setMembre] = useState();
  const [openConversations, setOpenConversations] = useState([]);
  const user = useSelector((state) => state.root.user);
  const messages = useSelector((state) => state.root.messages);
  console.log("message after updating ", messages);
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const user = await checkAuth(token);

    dispatch(setUser(user.data));
  }, []);
  console.log("users are ", user);

  const startConvesation = (membre) => {
    const conversationsList = [
      ...openConversations,
      {
        id: openConversations.length,
        active: 1,
        membre: membre,
        reduite: 0,
        messages: messages,
      },
    ];

    setOpenConversations(conversationsList);
  };

  useEffect(async () => {
    const token = localStorage.getItem("token");
    const res = await getTeam(token);
    console.log("team response", res.data);
    setTeamList(res.data);
    dispatch(setMembers([res.data]));
  }, []);

  return (
    <div style={{ marginTop: "55px" }} className="position-relative">
      <form
        className="container position-relative"
        name="form-identite"
        id="form-identite-gen"
      >
        <div
          className="d-flex justify-content-between flex-wrap"
          style={{
            zIndex: "10",
            position: "fixed",
            right: "51px",
            top: "187px",
          }}
        >
          {openConversations.map((conv) => {
            return (
              <div className="" style={{ marginRight: "20px" }}>
                <ChatInfo
                  conversation={conv}
                  setOpenConversations={setOpenConversations}
                  openConversations={openConversations}
                />
                {conv.reduite == 0 ? (
                  <Chat conversation={conv} user={user} />
                ) : (
                  ""
                )}
                ,{" "}
              </div>
            );
          })}
        </div>
        <div className="form-identite-info d-block mt-3">
          {user.role == "manager" ? (
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
            </div>
          ) : (
            ""
          )}

          <div className="row mt-4">
            {teamList &&
              teamList?.members?.map((membre) => {
                if (membre.id !== user.id) {
                  return (
                    <div
                      className="col-md-3 tm-el m-3 d-flex justify-content-center align-items-center position-relative "
                      onClick={() => startConvesation(membre)}
                    >
                      {/*  <div className="position-absolute">
                    <img src="/imgs/message.png" width={20} alt="" />
                  </div> */}
                      <div className="d-flex  flex-column ">
                        <div className="d-flex justify-content-center    ">
                          <img src="/imgs/user-image.png" alt="" />
                          <img
                            src="/imgs/status-cnx.png"
                            className=" status-cnx"
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
                }
              })}
          </div>
        </div>
      </form>
    </div>
  );
}
