const mongoose = require('mongoose');

// 9 fields
//1 more field - onlinePaymentDone - boolean
const schema  = mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] 
    },
    phone: {
        type: String,
        required: true,
        // unique: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
},

    serviceType:{
        type: String,
        required:true,
        enum: ['civil', 'criminal', 'family'], // Restricts to specific roles
        default: 'civil', // Default role
        
    },
    date:{
        type: Date,
        required:true,
        set: (value) => {
            // Strip the time by converting to ISO date string
            const utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
            return utcDate;
          },
    },
    slot:{
        type: String,
        required:true,
        enum: ['6', '7', '8','9'], 
        // Restricts to specific slots
        // default: '6',
        // Default slot
    },
    address:{
        type: String,
        required:true
    },
    pincode: {
        type: Number,
        required: true,
        validate: {
            validator: function (v) {
                return /^\d{6}$/.test(v.toString());
            },
            message: 'Pincode must be a 6-digit number'
        }
    }, 
    caseBrief:{
        type: String,
        required:true
    },
    onlinePaymentDone:{
        type:Boolean,
        required:true,
        default:false
    }

});

const userBookingSchema = mongoose.model('userBookingSchema',schema);

module.exports = userBookingSchema;