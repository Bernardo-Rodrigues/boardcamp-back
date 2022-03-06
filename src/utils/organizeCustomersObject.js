import dayjs from "dayjs"

export default function organizeCustomersObject(arrayCustomers){
    return arrayCustomers.map( customer => ({
        ...customer,
        birthday: dayjs(customer.birthday).format("YYYY-MM-DD") 
    }))
}