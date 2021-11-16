const Customer = require('../models/customer');

const getCustomers = async () => {
    try {
        const documents = await Customer.find({})
        return {
            documents
        }
    } catch(err) {
        // gestionaremos el error
    }
}

const createCustomer = async (customerData) => {
    try {
        const customer = new Customer({
            name: customerData.name,
            cif: customerData.cif,
            email: customerData.email,
            orderNumbers: customerData.orderNumbers,
            adress: customerData.adress,
            cp: customerData.cp,
            city: customerData.city,
            contact: customerData.contact
        })
        const document = await customer.save();
        return {
            document
        }
    } catch(err) {
        // gestionaremos el error
    }
}

const updateCustomer = async (_id, customerData) => {
    try {
        const document = await Customer.findOneAndUpdate({_id}, customerData, {new: true});
        return {
            document
        }
    } catch(err) {
         // gestionaremos el error
    }
}

module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer
}