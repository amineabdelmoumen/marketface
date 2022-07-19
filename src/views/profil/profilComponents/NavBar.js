import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setMessages,
  setRealTimeMessages,
  setUser,
} from "../../../store/rootSlice";
import { checkAuth } from "../../../lib/auth";
import { getMessages } from "../../../lib/crud";
import Pusher from "pusher-js";
export default function NavBar() {
  const user = useSelector((state) => state.root.user);
  const messages = useSelector((state) => state.root.messages);
  const realTimeMessages = useSelector((state) => state.root.realTimeMessages);
  const [toggle, setToggle] = useState(false);

  console.log("message from store", messages);
  const dispatch = useDispatch();
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const user = await checkAuth(token);
    dispatch(setUser(user.data));

    Pusher.logToConsole = true;
    const pusher = new Pusher("3ea2140774b8c64924c3", {
      appId: process.env.PUSHER_APP_ID,

      cluster: "eu",
      secret: "964a3f4801ed671c1be1",
      encrypted: true,
      useTLS: true,
    });

    const channel = pusher.subscribe(user.data.channel);
    console.log("subscribed succesfully");
    channel.bind("pusher:subscription_succeeded", (membres) => {
      //setOnlineUsersCount(membres.count);
      console.log("subscription succeeded .....");
    });
    channel.bind("my-event", async (data) => {
      console.log("event data", data);
      /*  const token = localStorage.getItem("token");
      const messages = await getMessages(token);
      console.log("message from api :", messages);
      dispatch(setMessages(messages.data.conversations)); */
      const newMessages = [...realTimeMessages, data.data];

      console.log("message after ", newMessages);
      dispatch(setRealTimeMessages(newMessages));

      //setChats((prevState) => [...prevState, (message, user.nom)]);
    });
  }, []);
  console.log("realTimeMessages", realTimeMessages);
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
