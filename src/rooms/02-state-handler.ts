import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";
import { debug, log } from "console";
import e from "express";

export class MovementData extends Schema {
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

export class MovementStateData extends Schema {
    @type("boolean")
    sit = false;
}

export class HealthData extends Schema {
    @type("int16")
    curHealth = 1;

    @type("int16")
    maxHealth = 1;
}

export class WeaponData extends Schema {
    @type("uint8")
    weapon = 0;
}

export class Player extends Schema {

    @type(MovementData)
    movementData = new MovementData();

    @type(MovementStateData)
    movementStateData = new MovementStateData();

    @type(HealthData)
    healthData = new HealthData();

    @type(WeaponData)
    weaponData = new WeaponData();

}


export class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();

    something = "This attribute won't be sent to the client-side";

    createPlayer(sessionId: string, initPlayerData: any) {

        const player = new Player();

        player.healthData.maxHealth = initPlayerData.maxHealth;
        player.healthData.curHealth = initPlayerData.curHealth;
        player.weaponData.weapon = initPlayerData.weaponId;

        this.players.set(sessionId, player);
    }

    removePlayer(sessionId: string) {
        this.players.delete(sessionId);
    }

    movePlayer(sessionId: string, movement: any) {

        const movementData = this.players.get(sessionId).movementData;

        movementData.px = movement.px;
        movementData.py = movement.py;
        movementData.pz = movement.pz;
        movementData.vx = movement.vx;
        movementData.vy = movement.vy;
        movementData.vz = movement.vz;
        movementData.rx = movement.rx;
        movementData.ry = movement.ry;
    }

    changeWeaponPlayer(sessionId: string, weaponData: any) {

        this.players.get(sessionId).weaponData.weapon = weaponData.id;
    }

    changeHealthPlayer(client: Client, data: any) {

        const player = this.players.get(data.id);
        let newHp = player.healthData.curHealth - data.damage;

        if (newHp <= 0) {
            player.healthData.curHealth = 0;
            client.send("Die");
        }
        else {
            player.healthData.curHealth = newHp;
        }
    }

    changeMoveStatePlayer(sessionId: string, stateData: any) {

        this.players.get(sessionId).movementStateData.sit = stateData.sit;

    }
}

export class StateHandlerRoom extends Room {
    maxClients = 4;
    state = new State();

    onCreate(options) {
        console.log("StateHandlerRoom created!", options);

        this.setState(new State());

        this.onMessage("move", async (client, data) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
            this.state.movePlayer(client.sessionId, data);
        });

        this.onMessage("ping", async (client) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
            client.send("pong");
        })

        this.onMessage("shoot", async (client, data) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
            this.broadcast("Shoot", data, { except: client });
        })

        this.onMessage("reloadweapon", async (client, data) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
            this.broadcast("ReloadWeapon", data, { except: client });
        })

        this.onMessage("weaponchange", async (client, data) => {
            this.state.changeWeaponPlayer(client.sessionId, data);
        })

        this.onMessage("applydamage", async (client, data) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
            const findClient = this.clients[data.id];
            this.state.changeHealthPlayer(findClient, data);
        })

        this.onMessage("statemovement", async (client, data) => {
            await new Promise(resolve => setTimeout(resolve, 50 + (Math.random() * 20 - 10)));
            this.state.changeMoveStatePlayer(client.sessionId, data);
        });
    }



    onAuth(client, options, req) {
        return true;
    }

    onJoin(client: Client, initPlayerData: any) {
        // client.send("hello", "world");
        console.log(client.sessionId, "joined!");
        this.state.createPlayer(client.sessionId, initPlayerData);
    }

    onLeave(client) {
        console.log(client.sessionId, "left!");
        this.state.removePlayer(client.sessionId);
    }

    onDispose() {
        console.log("Dispose StateHandlerRoom");
    }

}
