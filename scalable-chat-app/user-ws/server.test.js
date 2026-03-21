import assert from "node:assert";
import test, { after, describe } from "node:test";
import { wss } from "./server.js";
import { WebSocket } from "ws";

const BACKEND_URL1 = "ws://localhost:8080";
const BACKEND_URL2 = "ws://localhost:8081";

describe("chat application", () => {
  test("message sent from room1 got to other participants of room 1", async () => {
    const ws1 = new WebSocket(BACKEND_URL1);
    const ws2 = new WebSocket(BACKEND_URL2); //two websockets are created

    await new Promise((resolve) => {
      let count = 0;
      ws1.onopen = () => {
        count += 1;
        if (count == 2) {
          resolve();
        }
      };
      ws2.onopen = () => {
        count += 1;
        if (count == 2) {
          resolve();
        }
      };
    });

    ws1.send(
      JSON.stringify({
        type: "join-room",
        room: "room 1",
      }),
    );
    ws2.send(
      JSON.stringify({
        type: "join-room",
        room: "room 1",
      }),
    );
    // await new Promise(res => setTimeout(res, 2000));

    await new Promise((resolve) => {
      console.log('hlo11');

      ws2.onmessage = (event) => {
        console.log('parsedData');
        const parsedData = JSON.parse(event.data);
        
        assert.strictEqual(parsedData.type, "chat");
        assert.strictEqual(parsedData.message, "hii there");
        resolve()
      }
      console.log('hlo');
      
      ws1.send(
        JSON.stringify({
          type: "chat",
          room: "room 1",
          message: "hii there",
        })
      )
      console.log('clksd');
      
    });

    // ws1.close();
    // ws2.close();
  });

  // after(() => {
  //   wss.close();
  // });
});
