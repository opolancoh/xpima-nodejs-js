module.exports = {
    validData: [{
            amount: 85000,
            date: '2019-05-26',
            description: 'Comida en Presto',
            paymentType: 'Bank'
        },
        {
            amount: 150000,
            date: '2019-12-01',
            description: 'Mensualidad de parqueadero',
            paymentType: 'Cash'
        },
        {
            amount: 452000,
            date: '2019-05-26',
            description: 'Paseo a Melgar',
            paymentType: 'Cash'
        },
        {
            amount: 1150000,
            date: '2018-06-30',
            description: 'Pension de colegio',
            paymentType: 'Bank'
        },
        {
            amount: 620000,
            date: '2019-02-05',
            paymentType: 'Cash'
        },
        {
            amount: 10530.54,
            date: '2018-05-26',
            paymentType: 'Bank'
        },
        {
            amount: 1550.12,
            date: '2019-07-06',
            paymentType: 'Cash'
        },
        {
            amount: 5850,
            date: '2019-08-07',
            paymentType: 'Bank'
        },
        {
            amount: 200000,
            date: '2019-10-15',
            paymentType: 'Cash'
        },
        {
            amount: 74500,
            date: '2018-11-01',
            paymentType: 'Bank'
        },
        {
            amount: 1512000,
            date: '2019-04-08',
            paymentType: 'Cash'
        },
        {
            amount: 87000,
            date: '2019-09-26',
            paymentType: 'Bank'
        },
        {
            amount: 1000,
            date: '2019-10-19',
            paymentType: 'Cash'
        }
    ],
    invalidData: [{
            body: {
                date: '2019-09-26',
                paymentType: 'Bank'
            },
            status: 400,
            message: 'should not CREATE an item if AMOUNT is missing'
        },
        {
            body: {
                amount: -1,
                date: '2019-09-26',
                paymentType: 'Cash'
            },
            status: 400,
            message: 'should not CREATE an item if AMOUNT is not valid'
        },
        {
            body: {
                amount: 1001,
                paymentType: 'Bank'
            },
            status: 400,
            message: 'should not CREATE an item if DATE is missing'
        },
        {
            body: {
                amount: 1002,
                date: '2019-02-32',
                paymentType: 'Cash'
            },
            status: 400,
            message: 'should not CREATE an item if DATE is not valid'
        },
        {
            body: {
                amount: 1003,
                date: '2019-24-30',
                paymentType: 'Cash'
            },
            status: 400,
            message: 'should not CREATE an item if DATE is not valid'
        },
        {
            body: {
                amount: 1004,
                date: '2019-4-30',
                paymentType: 'Cash'
            },
            status: 400,
            message: 'should not CREATE an item if DATE is not valid'
        },
        {
            body: {
                amount: 1005,
                date: '2019-04-3',
                paymentType: 'Cash'
            },
            status: 400,
            message: 'should not CREATE an item if DATE is not valid'
        },
        {
            body: {
                amount: 1006,
                date: '2019-10-19',
            },
            status: 400,
            message: 'should not CREATE an item if PAYMENTTYPE is missing'
        },
        {
            body: {
                amount: 1007,
                date: '2019-24-30',
                paymentType: 'Other'
            },
            status: 400,
            message: 'should not CREATE an item if PAYMENTTYPE is not valid'
        },
        {
            body: {
                amount: 1008,
                date: '2019-24-30',
                paymentType: ''
            },
            status: 400,
            message: 'should not CREATE an item if PAYMENTTYPE is not valid'
        },
        {
            body: {
                amount: 1003,
                date: '2019-24-30',
                paymentType: 'Cash',
                category: '123456'
            },
            status: 400,
            message: 'should not CREATE an item if CATEGORY is not valid'
        },
        {
            body: {
                amount: 1009,
                date: '2019-10-19',
                paymentType: 'Cash',
                prop: 'prop'
            },
            status: 400,
            message: 'should not CREATE an item when field/property is not allowed'
        },
        {
            body: {},
            status: 400,
            message: 'should not CREATE an empty item/object'
        },
    ]
}