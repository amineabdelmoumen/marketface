import React from "react";

export default function ChatInfo({
  conversation,
  setOpenConversations,
  openConversations,
}) {
  const setClose = (conversation) => {
    const conversationsRemove = openConversations.filter(
      (conv) => conv.id !== conversation.id
    );
    setOpenConversations(conversationsRemove);
  };
  console.log("membre", conversation.membre.nom);
  const setReduct = (conversation) => {
    const conversationsReduct = openConversations.map((conv) => {
      if (conv.id == conversation.id) {
        conv.reduite = 1;
      }
      return conv;
    });
    setOpenConversations(conversationsReduct);

    console.log("reduct conversations are ", conversationsReduct);
  };
  return (
    <div>
      {" "}
      <div
        className="d-flex justify-content-start border"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="d-flex justify-content-start align-items-center me-auto p-1">
          <img
            src="/imgs/user-image.png"
            alt=""
            style={{ borderRadius: "50%", height: "70%" }}
          />
          <p className="nom-pr" style={{ color: "#1C1D21", marginLeft: "7px" }}>
            {`${conversation.membre.nom} ${conversation.membre.prenom}`}
          </p>
        </div>
        <div className="d-flex align-self-end mb-3 p-1 ">
          {" "}
          <img
            src="/imgs/reduire.png"
            className="me-2"
            onClick={() => setReduct(conversation)}
            alt=""
          />{" "}
          <img
            src="/imgs/close.png"
            alt=""
            onClick={() => setClose(conversation)}
          />
        </div>
      </div>
    </div>
  );
}
