const Customer = require('../models/customer');
const { ErrorHandler } = require('../middleware/errors');


const searchCustomers = async (term) => {
    try {
        const documents = await Customer.find({name: {$regex: term, $options: 'i'}});
        return {
            documents
        }
    } catch(err) {
        if(err) {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

const getCustomers = async (skip, limit) => {
    try {
        const totalDocuments = await Customer.find({}).countDocuments();
        const documents = await Customer.find({}).sort({name: 1}).skip(skip).limit(limit);
        return {
            totalDocuments,
            documents
        }
    } catch(err) {
        if(err) {
            throw new ErrorHandler(500, 'Database server error')
        }
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
        if(err.code === 11000) {
            throw new ErrorHandler(400, 'Duplicate cif')
        } else {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

const updateCustomer = async (_id, customerData) => {
    try {
        const document = await Customer.findOneAndUpdate({_id}, customerData, {new: true});
        return {
            document
        }
    } catch(err) {
        if(err.code === 11000) {
            throw new ErrorHandler(400, 'Duplicate cif')
        } else {
            throw new ErrorHandler(500, 'Database server error')
        }
    }
}

module.exports = {
    searchCustomers,
    getCustomers,
    createCustomer,
    updateCustomer
}