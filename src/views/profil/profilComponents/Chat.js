import React, { useState, useEffect } from "react";
import "./chatStyles.scss";
import { useSelector, useDispatch } from "react-redux";
import { getMessages, sendMessage } from "../../../lib/crud";
import { Members } from "pusher-js";
import { setRealTimeMessages } from "../../../store/rootSlice";
export default function Chat({ conversation }) {
  const style = "text-bold text-black-50 mt-2";
  const [color, setColor] = useState(1);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [hideChat, setsetHideChat] = useState(0);
  const messages = useSelector((state) => state.root.messages);
  const realTimeMessages = useSelector((state) => state.root.realTimeMessages);
  const user = useSelector((state) => state.root.user);
  const [dates, setDates] = useState([]);
  const style2 = {
    height: "50px",
    font: "normal normal normal 13px/13px Montserrat",
  };
  console.log("conversation", conversation);

  const dispatch = useDispatch();
  const [message, setMessage] = useState(" ");

  const submit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const reciever_id = conversation.membre.id;
    const data = {
      message: message,
      reciever_id: reciever_id,
      user_id: user.id,
      channel: conversation.membre.channel,
    };
    console.log("data to send", data);
    setMessage(" ");
    dispatch(setRealTimeMessages([...realTimeMessages, data]));
    sendMessage(data, token).then(() => {
      console.log("message send");
    });
  };

  /* const showDates = (message) => {
    console.log("entered to sowdates");
    if (!dates.includes(message.created_at.split(" ")[0])) {
      const newDates = [...dates, message.created_at.split(" ")[0]];

      setDates(newDates);
      console.log("dates++++++", newDates);
    }
  }; */

  const nextStyle = {
    marginLeft: "60px",
  };
  const [chats, setChats] = useState([]);
  const [onlineUsersCount, setOnlineUsersCount] = useState();

  return (
    <div>
      <section className="chatbox position-relative">
        <section className="chat-window " id="scroll" style={{ width: "100%" }}>
          {messages
            .concat(realTimeMessages)
            .filter(
              (message) =>
                message.reciever_id == conversation.membre.id ||
                message.user_id == conversation.membre.id
            )
            .map((message) => {
              if (message.user_id === user.id) {
                return (
                  <div>
                    <article className="msg-container msg-self" id="msg-0">
                      <div className="msg-box">
                        <div className="flr">
                          <div className="messages">
                            <p className="msg" id="msg-1">
                              {message.message}
                            </p>
                          </div>
                          <span className="timestamp">
                            <span className="username">{user.nom}</span>
                          </span>
                        </div>
                        {/*  <img
                        className="user-img"
                        id="user-0"
                        src="//gravatar.com/avatar/56234674574535734573000000000001?d=retro"
                      /> */}
                      </div>
                    </article>
                  </div>
                );
              } else if (message.reciever_id === user.id) {
                return (
                  <div>
                    <article class="msg-container msg-remote" id="msg-0">
                      <div class="msg-box">
                        {/*  <img
                        class="user-img"
                        id="user-0"
                        src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                      /> */}
                        <div className="flr">
                          <div className="messages">
                            <p className="msg" id="msg-1">
                              {message.message}
                            </p>
                          </div>
                          <span className="timestamp">
                            <span className="username">
                              {conversation.membre.nom}
                            </span>
                          </span>
                        </div>
                      </div>
                    </article>
                    {}
                  </div>
                );
              }
            })}
        </section>
        <form class="chat-input position-absolute" onsubmit="return false;">
          <input
            type="text"
            value={message}
            autocomplete="on"
            placeholder="Type a message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={(e) => submit(e)}>
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path
                fill="rgba(0,0,0,.38)"
                d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
              />
            </svg>
          </button>
        </form>
      </section>
    </div>
  );
}
