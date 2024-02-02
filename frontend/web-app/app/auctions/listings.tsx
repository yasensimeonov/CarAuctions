'use client';

import AuctionCard from "@/app/auctions/auctionCard";
import {Auction, PagedResult} from "@/types";
import AppPagination from "@/app/components/appPagination";
import { useEffect, useState } from "react";
import { getData } from "@/app/actions/auctionActions";
import Filters from "@/app/auctions/filters";
import {useParamsStore} from "@/hooks/useParamsStore";
import {shallow} from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "@/app/components/emptyFilter";

// ! N.B. ! Do NOT put ASYNC in component definition!!!
// export default async function Listings() {
export default function Listings() {
    // const data = await getData();

    // const [auctions, setAuctions] = useState<Auction[]>([]);
    // const [pageCount, setPageCount] = useState(0);
    // const [pageNumber, setPageNumber] = useState(1);
    // const [pageSize, setPageSize] = useState(4);

    const [data, setData] = useState<PagedResult<Auction>>();
    // const pageNumber = useParamsStore(state => state.pageNumber);
    const params = useParamsStore(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy
    // }), shallow);
    }));

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({url: '', query: params});

    function setPageNumber(pageNumber: number) {
        setParams({pageNumber})
    }

    useEffect(() => {
        getData(url).then(data => {
            // setAuctions(data.results);
            // setPageCount(data.pageCount);

            setData(data);
        })
    },
        // [pageNumber, pageSize]
        [url]
    );

    // if (auctions.length === 0) {
    if (!data) {
        return <h3>Loading...</h3>
    }

    return (
        <>
            {/*<Filters pageSize={pageSize} setPageSize={setPageSize} />*/}
            <Filters />
            {data.totalCount === 0 ? (
                <EmptyFilter showReset />
            ) : (
                <>
                    <div className='grid grid-cols-4 gap-6'>
                        {/*{JSON.stringify(data, null, 2)}*/}

                        {/*{auctions.map(auction => (*/}
                        {/*    <AuctionCard auction={auction} key={auction.id}/>*/}
                        {/*))}*/}

                        {data.results.map(auction => (
                            <AuctionCard auction={auction} key={auction.id}/>
                        ))}
                    </div>
                    <div className='flex justify-center mt-4'>
                        <AppPagination currentPage={params.pageNumber} pageCount={data.pageCount}
                                       pageChanged={setPageNumber}/>
                    </div>
                </>
            )}
        </>
    )
}