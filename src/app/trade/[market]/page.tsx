'use client'
import { MarketBar } from '@/_components/MarketBar';
import Depth from '@/_components/MarketDepth/Depth';
import TradingCharts from '@/_components/TradingCharts';
import { useParams } from 'next/navigation';
import React from 'react';

const page = () => {
  const {market} = useParams()
  return (
    <div>
       <MarketBar market={market.toString()} />
       <div className='flex'>
        <TradingCharts market={market.toString()}/>
         <div className='w-[25%]'>
         <Depth market={market.toString()}/>
         </div>
       </div>
    </div>
  );
}

export default page;
