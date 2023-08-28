import * as strophe from "strophe.js"
import { setRegister } from "../../shared/lib/setRegister";
import { getRandomText } from "../../shared/lib/getRandomText";
import { glagol } from "../glagol/glagol";

const { Strophe }: any = strophe
setRegister(strophe)

type Callback = (...args: any[]) => void

class Xmpp {
  public connection: any;
  private static instance: any;
  private listeners: {
    [key: string]: Callback[]
  };

  constructor() {
    if (!Xmpp.instance) {
      Xmpp.instance = this
    }
    this.listeners = {}

    return Xmpp.instance
  }

  init(url: string) {
    this.connection = new Strophe.Connection(url)
    return this.connection
  }

  register = (userNode: string) => {

    const callback = (status: number) => {
      //@ts-ignore
      if (status === Strophe.Status.REGISTER) {
        // fill out the fields
        this.connection.register.fields.username = userNode;
        this.connection.register.fields.password = getRandomText(8);
        // calling submit will continue the registration process
        this.connection.register.submit();
        //@ts-ignore
      } else if (status === Strophe.Status.REGISTERED) {
        console.log("registered!");
        // calling login will authenticate the registered JID.
        this.connection.authenticate();
        //@ts-ignore
      } else if (status === Strophe.Status.CONFLICT) {
        console.log("Contact already existed!");
        //@ts-ignore
      } else if (status === Strophe.Status.NOTACCEPTABLE) {
        console.log("Registration form not properly filled out.")
        //@ts-ignore
      } else if (status === Strophe.Status.REGIFAIL) {
        console.log("The Server does not support In-Band Registration")
      } else if (status === Strophe.Status.CONNECTED) {
        console.log('connected')
        this.connection.addHandler(this.handlerPresence, null, 'presence')
        this.connection.addHandler(this.handlerMessage, null, 'message')
        this.connection.addHandler(this.handlerIqTypeResult, null, "iq", "result")
        this.emit("createRoom")
        // do something after successful authentication
      } else {
        // Do other stuff
      }
    }
    this.connection.register.connect("prosolen.net", callback)
  }

  handlerPresence(stanza: any) {
    const jingle = stanza.getElementsByTagName('jingle')
    console.log(stanza)
    try {
      if (jingle[0].getAttribute('action') === "enter_to_room") {
        const x = stanza.getElementsByTagName('x')
        try {
          Array.from(x[1].getElementsByTagName('status')).forEach((status: any) => {
            if (+status.getAttribute("code") === 201) {
              Xmpp.instance.emit("validateRoom")
            }
          })
        } catch (e) {
        }
        const item: any[] = Array.from((x[1].getElementsByTagName("item")))
        console.log(item)
        if (item[0].getAttribute('role') !== "moderator") {
          Xmpp.instance.emit("inviteRoom")
        }
      }
    } catch (e) {
    }
    return true
  }

  handlerMessage(stanza: any) {
    console.log(stanza)
    return true
  }

  handlerIqTypeResult = (stanza: any) => {
    this.emit("inviteRoom")
    return true
  }

  on(name: string, callback: Callback) {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    this.listeners[name].push(callback)
  }

  emit(name: string, ...args: any[]) {
    if (this.listeners[name]) {
      new Error(`Listener ${name} не сущевствуте`)
    }
    this.listeners[name].forEach((listener) => listener(args))
  }
}

export { Xmpp }
