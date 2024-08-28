import { getDepth, getTicker } from "@/app/utils/httpClients";
import React, { useEffect, useState } from "react";
import { AskTable } from "./AskTable";
import { BidTable } from "./BidsTable";

function Tablehead() {
    return <div className="flex justify-between text-xs">
    <div className="text-white">Price</div>
    <div className="text-slate-500">Size</div>
    <div className="text-slate-500">Total</div>
   </div>
}

const Depth = ({ market }: { market: string }) => {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
//   const [price, setPrice] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const depthData = await getDepth(market);
      setBids(depthData.bids.reverse());
      setAsks(depthData.asks);
    //   getTicker(market).then(t => setPrice(t.lastPrice));
    };
    init();
  }, []);

  return <div> 
      <Tablehead/>
      {asks && <AskTable asks={asks}/>}
      {bids && <BidTable bids={bids}/>}
     </div>
};

export default Depth;
