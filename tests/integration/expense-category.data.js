module.exports = {
    validData: [{
            name: 'Food',
            description: 'Description for food.'
        },
        {
            name: 'Bills'
        },
        {
            name: 'Transportation',
            description: 'Description for Transportation.'
        },
        {
            name: 'Home'
        },
        {
            name: 'Car',
            description: 'Description for Car.'
        },
        {
            name: 'Entertainment'
        },
        {
            name: 'Shopping',
            description: 'Description for Shopping.'
        },
        {
            name: 'Clothing'
        },
        {
            name: 'Insurance',
            description: 'Description for Insurance.',
        },
        {
            name: 'Tax'
        },
        {
            name: 'Telephone',
            description: 'Description for Telephone.'
        },
        {
            name: 'Health'
        },
        {
            name: 'Sport',
            description: 'Description for Sport.'
        }
    ],
    invalidData: [{
            body: {
                description: 'This is a description'
            },
            response: {
                status: 'failure',
                code: 400
            },
            message: 'should not CREATE an item if NAME is missing'
        }, {
            body: {
                prop: 'prop'
            },
            response: {
                status: 'failure',
                code: 400
            },
            message: 'should not CREATE an item when field/property is not allowed'
        },
        {
            body: {},
            response: {
                status: 'failure',
                code: 400
            },
            message: 'should not CREATE an empty item/object'
        },
        {
            body: {
                name: 'Home'
            },
            response: {
                status: 'failure',
                code: 409
            },
            message: 'should not CREATE a duplicated item'
        }
    ]
}