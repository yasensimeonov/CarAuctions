import Heading from "@/app/components/heading";
import AuctionForm from "@/app/auctions/auctionForm";

export default function Create() {
    return (
        <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
            <Heading title='Sell your car!' subtitle='Please enter the details of your car' />
            <AuctionForm />
        </div>
    )
}