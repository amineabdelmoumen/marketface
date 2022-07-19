import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./profilComponents/Chat";
import ChatInfo from "./profilComponents/ChatInfo";
export default function ChatList() {
  const members = useSelector((state) => state.root.members);
  var today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const messages = useSelector((state) => state.root.messages);
  const user = useSelector((state) => state.root.user);

  const realTimeMessages = useSelector((state) => state.root.realTimeMessages);
  console.log("real time messages", realTimeMessages);
  console.log("members in chatList", members[0].members);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [openConversations, setOpenConversations] = useState([]);
  const getMembre = (id) => {
    const membre = members[0].members.filter((membre) => membre.id === id);

    return membre;
  };
  //get received messages

  useEffect(() => {
    const received_messages = messages
      .concat(realTimeMessages)
      .filter((message) => message.reciever_id === user.id);
    setReceivedMessages(received_messages);
  }, [realTimeMessages]);
  const startConvesation = (membre_id) => {
    console.log("membre in convesation", membre_id);
    const membre = getMembre(membre_id)[0];
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
  return (
    <div>
      {" "}
      <form
        className="container"
        name="form-identite"
        id="form-identite-gen"
        style={{ padding: "14px 30px" }}
      >
        {/* <div className="page_number">1/2</div> */}

        <div className="form-identite-info d-block mt-3 position-relative">
          {receivedMessages
            .slice()
            .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
            .map((message) => {
              return (
                <div
                  className="conv border"
                  onClick={() => startConvesation(message.user_id)}
                >
                  <p
                    style={{
                      marginLeft: "14px",
                      fontSize: "18px",
                      color: "#262653",
                    }}
                  >
                    {`${getMembre(message.user_id)[0].nom}`}
                  </p>
                  <p style={{ marginLeft: "14px", fontSize: "16px" }}>
                    vous a envoyé un message
                  </p>

                  <p style={{ marginLeft: "14px", fontSize: "16px" }}>
                    {message.created_at.split(" ")[0]}
                  </p>
                </div>
              );
            })}{" "}
        </div>
      </form>{" "}
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
              {/* <ChatInfo
              conversation={conv}
              setOpenConversations={setOpenConversations}
              openConversations={openConversations}
            /> */}
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
    </div>
  );
}
