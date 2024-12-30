import { Body, Container, Head, Heading, Hr, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";


type OrderHistoryEmailProps={
    orders:{
        id:string
        pricePaidInCents:number
        createdAt:Date
        downloadVerificationId:string
    product:{
        name:string
        imagePath:string
        description:string
    }  
}[]
}

OrderHistoryEmail.PreviewProps={
    orders:[
        {
        id:crypto.randomUUID(),
        createdAt:new Date(),
        pricePaidInCents:10000,
        downloadVerificationId:crypto.randomUUID(),
        product:{
            name:"Product Name",
            description:"Some Description",
            imagePath:
            "/products/86db197c-8a9f-428f-a7fa-163ab88f8722-kbs9vu1lk7bx.jpg",
        },
        },
        {
            id:crypto.randomUUID(),
            createdAt:new Date(),
            pricePaidInCents:2000,
            downloadVerificationId:crypto.randomUUID(),
            product:{
                name:"Product Name 2",
                description:"Some Other Description",
                imagePath:
                "/products/158f891c-80d4-4b5e-b1db-18fce8cd3bca-tenor (1).gif",
            },
        },
    ],
}satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({orders}:OrderHistoryEmailProps){
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head/>
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order,index)=>(
                            <React.Fragment key={order.id}>
                                <OrderInformation  order={order} product={order.product} downloadVerificationId={order.downloadVerificationId} 
                             />
                             {index < orders.length - 1  && <Hr/>}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}