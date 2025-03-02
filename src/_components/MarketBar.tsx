import { getTicker } from '@/app/utils/httpClients';
import { singlingManager } from '@/app/utils/singlingManager';
import { TickerType } from '@/app/utils/types';
import React, { useEffect, useState } from 'react';

export const MarketBar = ({market}: {market: string}) => {
    const [ticker, setTicker] = useState<TickerType | null>(null);

    useEffect(() => {
        getTicker(market).then(setTicker);
        // singlingManager.getInstance().registerCallback("ticker", (data: Partial<TickerType>)  =>  setTicker(prevTicker => ({
        //     firstPrice: data?.firstPrice ?? prevTicker?.firstPrice ?? '',
        //     high: data?.high ?? prevTicker?.high ?? '',
        //     lastPrice: data?.lastPrice ?? prevTicker?.lastPrice ?? '',
        //     low: data?.low ?? prevTicker?.low ?? '',
        //     priceChange: data?.priceChange ?? prevTicker?.priceChange ?? '',
        //     priceChangePercent: data?.priceChangePercent ?? prevTicker?.priceChangePercent ?? '',
        //     quoteVolume: data?.quoteVolume ?? prevTicker?.quoteVolume ?? '',
        //     symbol: data?.symbol ?? prevTicker?.symbol ?? '',
        //     trades: data?.trades ?? prevTicker?.trades ?? '',
        //     volume: data?.volume ?? prevTicker?.volume ?? '',
        // })), `TICKER-${market}`);
        // singlingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`ticker.${market}`]}	);

        // return () => {
        //     singlingManager.getInstance().deRegisterCallback("ticker", `TICKER-${market}`);
        //     singlingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`ticker.${market}`]}	);
        // }
    }, [market])

    return <div>
        <div className="flex items-center flex-row relative w-full overflow-hidden border-b border-slate-800">
            <div className="flex items-center justify-between flex-row no-scrollbar overflow-auto pr-4">
                    <Ticker market={market} />
                    <div className="flex items-center flex-row space-x-8 pl-4">
                        <div className="flex flex-col h-full justify-center">
                            <p className={`font-medium tabular-nums text-greenText text-md text-green-500`}>${ticker?.lastPrice}</p>
                            <p className="font-medium text-sm tabular-nums">${ticker?.lastPrice}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className={`font-medium  text-slate-400 text-sm`}>24H Change</p>
                            <p className={` font-medium tabular-nums leading-5 text-sm text-greenText ${Number(ticker?.priceChange) > 0 ? "text-green-500" : "text-red-500"}`}>{Number(ticker?.priceChange) > 0 ? "+" : ""} {ticker?.priceChange} {Number(ticker?.priceChangePercent)?.toFixed(2)}%</p></div><div className="flex flex-col">
                                <p className="font-medium  text-slate-400 text-sm">24H High</p>
                                <p className="font-medium tabular-nums leading-5 text-sm ">{ticker?.high}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-medium  text-slate-400 text-sm">24H Low</p>
                                    <p className=" font-medium tabular-nums leading-5 text-sm ">{ticker?.low}</p>
                                </div>
                            <button type="button" className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left" data-rac="">
                                <div className="flex flex-col">
                                    <p className="font-medium  text-slate-400 text-sm">24H Volume</p>
                                    <p className="mt-1 font-medium tabular-nums leading-5 text-sm ">{ticker?.volume}
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

}

function Ticker({market}: {market: string}) {
    return <div className="flex h-[60px] shrink-0 space-x-4">
        <div className="flex flex-row relative ml-2 -mr-4">
            <img alt="SOL Logo" loading="lazy" decoding="async" data-nimg="1" className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTOOhDi1KrwwS7G_H1yvSkMoiPhO3anGP8_w&s" />
            <img alt="USDC Logo" loading="lazy"decoding="async" data-nimg="1" className="h-6 w-6 -ml-2 mt-4 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmbRRalBmGfhMfBqTVsUYkQanLmkvbXzpe9w&s" />
        </div>
    <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
            <div className="flex items-center flex-row gap-2 undefined">
                <div className="flex flex-row relative">
                    <p className="font-medium text-sm undefined">{market.replace("_", " / ")}</p>
                </div>
            </div>
        </div>
    </button>
    </div>
}
