import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/db";
import { formatCurrency, FormatNumber } from "@/lib/formatters";


async function getSalesData(){
    const data=await db.order.aggregate({
        _sum:{pricePaidInCents:true},
        _count:true
    })
    await wait(2000)

    return{
        amount:(data._sum.pricePaidInCents || 0) /100,
        numberOfSales:data._count
    }
}


function wait(duration:number){
    return new Promise(resolve=>setTimeout(resolve,duration))
}

async function getUserData(){
   const [userCount,orderData]=await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum:{pricePaidInCents:true},
        }),
    ])
    return{
        userCount,
        averageValuePerUser:userCount===0? 0 :(orderData._sum.pricePaidInCents || 0) / userCount/100
    }
}

async function getProductsData(){
    const [activeCount,inactiveCount]=await Promise.all([
        db.product.count({where:{isAvailableForPurchase:true}}),
        db.product.count({where:{isAvailableForPurchase:false}})
    ])

    return {activeCount,inactiveCount}
}


export default async function AdminDashboard(){
    const [salesData,userData,productData]=await Promise.all([
        getSalesData(),
        getUserData(),
        getProductsData()
    ])
    
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
       <DashboardCard title="Sales" subtitle={`${FormatNumber(salesData.numberOfSales)} Orders`} body={formatCurrency(salesData.amount)}/>
       <DashboardCard
       title="Customer"
       subtitle={`${formatCurrency(userData.averageValuePerUser)} Average Value`}
       body={FormatNumber(userData.userCount)}
       />
       <DashboardCard
       title="Active Products"
       subtitle={`${formatCurrency(productData.inactiveCount)} Inactive`}
       body={FormatNumber(productData.activeCount)}
       />
    </div>
}


type DashboardCardProps={
    title:string
    subtitle:String
    body:String
}



function DashboardCard({title,subtitle,body}:DashboardCardProps){
    return <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{body}</p>
        </CardContent>
    </Card>
}