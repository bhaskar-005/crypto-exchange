import { getKline } from '@/app/utils/httpClients';
import React, { useEffect, useRef } from 'react';
import { ChartManager } from './Chart/ChartManager';
import { KLine } from '@/app/utils/types';
import { singlingManager } from '@/app/utils/singlingManager';

const TradingCharts = ({market}:{market:string}) => {

  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);
  

  useEffect(()=>{
    const init = async()=>{
      const getKlineData = await getKline(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 12) / 1000), Math.floor(new Date().getTime() / 1000)); 
      console.log(getKlineData);
      
      if(chartRef.current){
       if (chartManagerRef.current) {
         chartManagerRef.current.destroy();
       }
       const chart= new ChartManager(
         chartRef.current,
         [
           ...getKlineData?.map((x:KLine) => ({
             close: parseFloat(x.close),
             high: parseFloat(x.high),
             low: parseFloat(x.low),
             open: parseFloat(x.open),
             timestamp: new Date(x.end), 
             volume:parseFloat(x.volume),
           })),
         ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
         {
           background: "#0e0f14",
           color: "white",
         }
       );
       //@ts-ignore
       chartManagerRef.current = chart;
      }
   }

   init()
   singlingManager.getInstance().registerCallback('trade',(data:any)=>{
      console.log(data);
   },`trade-${market}`)
   //send subscibe message
   singlingManager.getInstance().sendMessage(`{"method":"SUBSCRIBE","params":["trade.${market}"],"id":1}`);

   //on unmount of the component unsubscribe
   singlingManager.getInstance().sendMessage(`{"method":"UNSUBSCRIBE","params":["trade.${market}"],"id":1}`);
   //and deregister callback
   singlingManager.getInstance().deRegisterCallback('trade',`trade-${market}`);
  },[chartRef,market])

  return (
    <div ref={chartRef} style={{ height: "520px", width: "100%", marginTop: 4 }}></div>
  );
}

export default TradingCharts;
