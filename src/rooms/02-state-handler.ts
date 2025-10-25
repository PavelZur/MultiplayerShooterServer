import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";
import { debug } from "console";

export class Player extends Schema {
    @type("number")
    px = Math.floor(Math.random() * 10);

    @type("number")
    py = 0;

    @type("number")
    pz = Math.floor(Math.random() * 10);

    @type("number")
    vx = 0;

    @type("number")
    vy = 0;

    @type("number")
    vz = 0;

    @type("number")
    rx = 0;

    @type("number")
    ry = 0;
}


export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";

    createPlayer(sessionId: string) {
        this.players.set(sessionId, new Player());
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    movePlayer (sessionId: string, movement: any) {
       
            this.players.get(sessionId).px = movement.px;
        
        
            this.players.get(sessionId).py = movement.py;
        
        
            this.players.get(sessionId).pz = movement.pz;
        
        
            this.players.get(sessionId).vx = movement.vx;
               
           
            this.players.get(sessionId).vy = movement.vy;
        
        
            this.players.get(sessionId).vz = movement.vz;
        
        
            this.players.get(sessionId).rx = movement.rx;
        
       
            this.players.get(sessionId).ry = movement.ry;
        
    }
}

export class StateHandlerRoom extends Room {
    maxClients = 4;
    state = new State();

    onCreate (options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new State());

        this.onMessage("move", async (client, data) => {
  await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10))); 
  // задержка 40-60 мс
  this.state.movePlayer(client.sessionId, data);
});

      //  this.onMessage("move", (client, data) => {
           // console.log("StateHandlerRoom received message from", client.sessionId, ":", data);
    //        this.state.movePlayer(client.sessionId, data);
    //    });

        this.onMessage("ping", async (client) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
        client.send("pong");
        })
    }

    // onAuth(client, options, req) {
    //     return true;
    // }

    onJoin (client: Client) {
        // client.send("hello", "world");
        console.log(client.sessionId, "joined!");
        this.state.createPlayer(client.sessionId);
    }

    onLeave (client) {
        console.log(client.sessionId, "left!");
        this.state.removePlayer(client.sessionId);
    }

    onDispose () {
        console.log("Dispose StateHandlerRoom");
    }

}
