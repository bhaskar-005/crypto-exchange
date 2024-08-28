import { promises } from "dns";
import { resolve } from "path";
import { depthType, KLine } from "./types";
import axios from "axios";

const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";


export async function getTicker(market:string) {
   const Tickers = await getTickers();
   const ticker = Tickers.find((t:any) => t.symbol === market);
   if (!ticker) {
       throw new Error(`No ticker found for ${market}`);
   }
   return ticker;
}

export async function getTickers():Promise<any>{
    await new Promise((resolve)=> setTimeout(resolve,2300));
    return 1;
}

export async function getKline(market: string, interval: string, startTime: number, endTime: number): Promise<any>{
   try {
    const klineData = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = klineData.data;
    console.log(data);
    
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
   } catch (error) {
    console.log(error);
    
   }
}

export async function getDepth(market:string):Promise<depthType|any>{
    try {
        const res = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}