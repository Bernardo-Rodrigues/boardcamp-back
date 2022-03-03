import dayjs from "dayjs"

export default function organizeRentalsObject(arrayRentals){
    return arrayRentals.map( rental => ({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: dayjs(rental.rentDate).format("YYYY-MM-DD") ,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate !== null ? dayjs(rental.returnDate).format("YYYY-MM-DD") : rental.returnDate,
        originalPrice: rental.originalPrice,
        dealyFee: rental.delayFee,
        customer:{
            id: rental.customerId,
            name: rental.customerName
        },
        game:{
            id: rental.gameId,
            name: rental.gameName,
            categoryId: rental.categoryId,
            categoryName: rental.categoryName
        }
    }))
}