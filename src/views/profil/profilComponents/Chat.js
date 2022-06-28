import React, { useState } from "react";
import "./chatStyles.scss";
import $ from "jquery";
export default function Chat() {
  const style = "text-bold text-black-50 mt-2";
  const [color, setColor] = useState(1);
  const [hideChat, setsetHideChat] = useState(0);
  const style2 = {
    height: "50px",
    font: "normal normal normal 13px/13px Montserrat",
  };

  const nextStyle = {
    marginLeft: "60px",
  };

  var messages = $(".messages-content"),
    d,
    h,
    m,
    i = 0;

  $(window).on(function () {
    messages.mCustomScrollbar();
    setTimeout(function () {
      fakeMessage();
    }, 100);
  });

  function updateScrollbar() {
    messages.mCustomScrollbar("update").mCustomScrollbar("scrollTo", "bottom", {
      scrollInertia: 10,
      timeout: 0,
    });
  }

  function setDate() {
    d = new Date();
    if (m != d.getMinutes()) {
      m = d.getMinutes();
      $('<div class="timestamp">' + d.getHours() + ":" + m + "</div>").appendTo(
        $(".message:last")
      );
      $('<div class="checkmark-sent-delivered">&check;</div>').appendTo(
        $(".message:last")
      );
      $('<div class="checkmark-read">&check;</div>').appendTo(
        $(".message:last")
      );
    }
  }

  function insertMessage() {
    var msg = $(".message-input").val();
    if ($.trim(msg) == "") {
      return false;
    }
    $('<div class="message message-personal">' + msg + "</div>")
      .appendTo($(".mCSB_container"))
      .addClass("new");
    setDate();
    $(".message-input").val(null);
    updateScrollbar();
    setTimeout(function () {
      fakeMessage();
    }, 1000 + Math.random() * 20 * 100);
  }

  $(".message-submit").click(function () {
    insertMessage();
  });

  $(window).on("keydown", function (e) {
    if (e.which == 13) {
      insertMessage();
      return false;
    }
  });

  var Fake = [
    "Hi there, I'm Jesse and you?",
    "Nice to meet you",
    "How are you?",
    "Not too bad, thanks",
    "What do you do?",
    "That's awesome",
    "Codepen is a nice place to stay",
    "I think you're a nice person",
    "Why do you think that?",
    "Can you explain?",
    "Anyway I've gotta go now",
    "It was a pleasure chat with you",
    "Time to make a new codepen",
    "Bye",
    ":)",
  ];

  function fakeMessage() {
    if ($(".message-input").val() != "") {
      return false;
    }
    $(
      '<div class="message loading new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure><span></span></div>'
    ).appendTo($(".mCSB_container"));
    updateScrollbar();

    setTimeout(function () {
      $(".message.loading").remove();
      $(
        '<div class="message new"><figure class="avatar"><img src="http://askavenue.com/img/17.jpg" /></figure>' +
          Fake[i] +
          "</div>"
      )
        .appendTo($(".mCSB_container"))
        .addClass("new");
      setDate();
      updateScrollbar();
      i++;
    }, 1000 + Math.random() * 20 * 100);
  }

  return (
    <div>
      {" "}
      <section className="avenue-messenger">
        <div className="menu">
          <div className="items">
            <span>
              <a href="#" title="Minimize">
                &mdash;
              </a>
              <br />

              <a href="#" title="End Chat">
                &#10005;
              </a>
            </span>
          </div>
          <div className="button">...</div>
        </div>
        {/*  <div className="agent-face">
          <div className="half">
            <img
              className="agent circle"
              src="http://askavenue.com/img/17.jpg"
              alt="Jesse Tino"
            />
          </div>
        </div> */}
        <div className="chat">
          <div className="chat-title">
            <h1>Jesse Tino</h1>
            <h2>RE/MAX</h2>
          </div>
          <div className="messages">
            <div className="messages-content"></div>
          </div>
          <div className="message-box">
            <textarea
              type="text"
              className="message-input d-flex align-items-center"
              placeholder="Type message..."
            ></textarea>
            <button type="submit" className="message-submit">
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
