export default function organizeRentalsObject(arrayRentals){
    return arrayRentals.map( rental => ({
        id: rental.id,
        customerId: rental.customerId,
        gameId: rental.gameId,
        rentDate: rental.rentDate,
        daysRented: rental.daysRented,
        returnDate: rental.returnDate,
        originalPrice: rental.originalPrice,
        dealyFee: rental.dealyFee,
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