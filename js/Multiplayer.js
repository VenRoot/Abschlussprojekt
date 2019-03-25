// import * as Colyseus from "colyseus.js";
// let client = new Colyseus.Client("ws://localhost:2657");
//
//



room.onJoin.add(() => {
  console.log(`${ room.sessionId } joined!`)
})

room.onStateChange.add((state) => {
  console.log("new state: ", state);
});

room.listen("messages/:index", (change) => {
  console.log(change.operation);
  console.log(change.path.index);
  console.log(change.value);
});

room.send("Hello world");
