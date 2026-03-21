import React, { useEffect, useRef, useState} from "react";
import "./App.css";

type ChatMessage = {
  type: "chat";
  room: string;
  message: string;
  userId: string;
  timestamp: number;
};

const App = () => {
  const wsref = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [room, setRoom] = useState<string>("");
  const [msg, setMsg] = useState("");
  const [joined, setJoined] = useState<boolean>(false);
  const userId = useRef(crypto.randomUUID());

  useEffect(() => {
    // let index=0;

    // const genNextServer=()=>{
    //   const servers=["ws://localhost:8080","ws://localhost:8081"];
    //   const server=servers[index];
    //   index=(index+1)%servers.length;
    //   return server;

    // }

      const servers=["ws://localhost:8080","ws://localhost:8081"];
    const randomServer = servers[Math.floor(Math.random() * servers.length)];


    // const ws = new WebSocket(genNextServer());
    const ws = new WebSocket(randomServer);
    // const ws2 = new WebSocket("ws://localhost:8080");


    wsref.current = ws;

    ws.onopen = () => {
      console.log("ws connected");
      // ws.send(JSON.stringify({
      //   type:'join-room',
      //   room:'room 1'
      // }));
    };

    ws.onmessage = (event) => {
      console.log("data" + event.data);

      const parsedData = JSON.parse(event.data);
      console.log("parsed", parsedData);

      if (parsedData.type === "chat") {
        setMessages((prev) => [...prev, parsedData as ChatMessage]);
      }
    };
    ws.onerror = (err) => {
      console.log("error", err);
    };
    ws.onclose = () => {
      console.log("disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (!wsref.current || !joined) {
      return;
    }

    wsref.current.send(
      JSON.stringify({
        type: "chat",
        room: room,
        message,
        userId: userId.current,
        timestamp: Date.now(),
      }),
    );
  };

  const joinRoom = (e:React.SubmitEvent) => {
    e.preventDefault();

    if (!wsref.current || !room.trim()) {
      return;
    }

    wsref.current.send(
      JSON.stringify({
        type: "join-room",
        room: room.trim(),
      }),
    );
    setJoined(true);
  };

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-app-shell">
      <div className="chat-glow chat-glow-left" aria-hidden="true" />
      <div className="chat-glow chat-glow-right" aria-hidden="true" />

      <main className="chat-card">
        <header className="chat-header">
          <p className="chat-kicker">Realtime Room Chat</p>
          <h1>Socket Lounge</h1>
          <p className="chat-subtext">
            Join a room and start messaging instantly.
          </p>
        </header>

        {!joined && (
          <form className="room-form" onSubmit={joinRoom}>
            <label htmlFor="roomInput">Room name</label>
            <div className="field-row">
              <input
                id="roomInput"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="e.g. general"
                required
              />
              <button type="submit">Join</button>
            </div>
          </form>
        )}

        {joined && (
          <>
            <div className="room-pill">Connected to room: {room}</div>

            <ul className="messages-list" role="list">
              {messages.length === 0 && (
                <li className="empty-state">
                  No messages yet. Start the conversation.
                </li>
              )}

              {messages.map((m, i) => {
                const isOwn = m.userId === userId.current;

                return (
                  <li
                    key={`${m.timestamp}-${i}`}
                    className={`message-row ${isOwn ? "self" : "other"}`}
                  >
                    <article className="message-bubble">
                      <p>{m.message}</p>
                      <time>{formatTime(m.timestamp)}</time>
                    </article>
                  </li>
                );
              })}
            </ul>

            <form
              className="composer"
              onSubmit={(e) => {
                e.preventDefault();

                const trimmed = msg.trim();
                if (!trimmed) {
                  return;
                }

                sendMessage(trimmed);
                setMsg("");
              }}
            >
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type a message"
                aria-label="Type a message"
              />
              <button type="submit">Send</button>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
