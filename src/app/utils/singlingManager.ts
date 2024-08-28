
export const BASE_URL = "wss://ws.backpack.exchange/"

//useing singleton pattern

export class singlingManager {
    private static Instance:singlingManager
    private ws: WebSocket
    private bufferedMessages:any =[];
    private initialized: boolean = false;
    private callback:any={}
    private id:number = 0;

    private constructor() {
        //creating web socket connection
       this.ws = new WebSocket(BASE_URL);
    }
    public static getInstance() {
        //if instance already exists return instance
       if (!this.Instance) {
        this.Instance = new singlingManager()
       }
       //if no instance exists create new instance
       return this.Instance;
    }
    
    init(){
      //check if the ws is ready then send the buffered messages
      this.ws.onopen =()=> {
        console.log('ws connection established');
        
        this.initialized = true;
        this.bufferedMessages.map((message:any)=> this.ws.send(JSON.stringify(message)));
      }

      //if any message received
      this.ws.onmessage =(event)=> {
        // {
        //     "E": 1724770306898653,
        //     "T": 1724770306879667,
        //     "U": 1419574685,
        //     "a": [
        //       ["154.49", "0.09"],
        //       ["154.51", "88.15"]
        //     ],
        //     "b": [
        //       ["154.31", "32.38"]
        //     ],
        //     "e": "depth",
        //     "s": "SOL_USDC",
        //     "u": 1419574687
        //   }
        const message = JSON.parse(event.data);
        const type = message.e;
        //checke if call back is registed or not for the type
        if (this.callback[type]) {
            console.log(this.callback);
            this.callback[type].forEach(({callback}:any) => {
                if (type === "ticker") {
                    const newTicker = {
                        lastPrice: message.data.c,
                        high: message.data.h,
                        low: message.data.l,
                        volume: message.data.v,
                        quoteVolume: message.data.V,
                        symbol: message.data.s,
                    }
                    callback(newTicker);
                }
                if (type === "depth") {
                    const updatedBids = message.data.b;
                    const updatedAsks = message.data.a;
                    callback({ bids: updatedBids, asks: updatedAsks });
                }
                if (type === "trade") {
                    callback(message.data);
                }
            });  } 
        }
    }
    sendMessage(message: any) {
        const messageToSend = {
            ...message,
            id: this.id++
        }
        if (!this.initialized) {
            this.bufferedMessages.push(messageToSend);
            return;
        }
        this.ws.send(JSON.stringify(messageToSend));
    }

    async registerCallback(type: string, callback: any, id: string) {
        //can not do this.callback.type 
        this.callback[type] = this.callback[type] || [];
        this.callback[type].push({ callback, id });
    }

    async deRegisterCallback(type: string, id: string) {
        if (this.callback[type]) {
            const index = this.callback[type].findIndex((callbacks:any) => callbacks.id === id);
            if (index !== -1) {
                this.callback[type].splice(index, 1);
            }
        }
    }

}  