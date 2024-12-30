import { Body, Container, Head, Heading, Html, Preview, Tailwind } from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import { string } from "zod";


type PurchaseReceiptEmailProps={
    product:{
        name:string
        imagePath:string
        description:string
    }
    order:{id:string
        createdAt:Date
        pricePaidInCents:number
        }
    downloadVerificationId:string
}

PurchaseReceiptEmail.PreviewProps={
    product:{name:"Product Name",
        imagePath:"/products/86db197c-8a9f-428f-a7fa-163ab88f8722-kbs9vu1lk7bx.jpg",
    description:"Some Description"
    },
    
    order:{
        id:crypto.randomUUID(),
        createdAt:new Date(),
        pricePaidInCents:10000,
    },
    downloadVerificationId:crypto.randomUUID()
    
}satisfies PurchaseReceiptEmailProps

export default function PurchaseReceiptEmail({product,order,downloadVerificationId}:PurchaseReceiptEmailProps){
    return (
        <Html>
            <Preview>Download {product.name} and view receipt</Preview>
            <Tailwind>
                <Head/>
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Purchase Receipt</Heading>
                        <OrderInformation order={order} product={product} downloadVerificationId={downloadVerificationId}  />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}