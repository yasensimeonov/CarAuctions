// 'use client';

import Listings from "@/app/auctions/listings";

export default function Home() {
    function test(i: number) {
        return i * 8;
    }

    function handleClick() {
        const result = test(5);
        console.log('button', result);
    }

    return (
        <div>
            <Listings />

            <br/>
            <br/>

            {/*<button onClick={handleClick}>Test</button>*/}
        </div>
    )
}
