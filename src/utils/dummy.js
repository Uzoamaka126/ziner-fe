export const workspacesTypes = [
    {
        id: 1,
        name: 'Art'
    },
    {
        id: 2,
        name: 'Business'
    },
    {
        id: 3,
        name: 'Creative Projects'
    },
    {
        id: 4,
        name: 'Small Business'
    },
    {
        id: 5,
        name: 'Design'
    },
    {
        id: 6,
        name: 'Marketing'
    },
    {
        id: 7,
        name: 'Operations'
    },
    {
        id: 8,
        name: 'Sales/CRM'
    },
    {
        id: 9,
        name: 'Others'
    },
]

export const industryData = ["Arts", "Fintech", "Sales/CRM", "Software", "UX", "Research", "Marketing", "Operations", "Design"]

export const createdWorkspaces = [
    {
        id: '12234',
        name: 'Workspace 1',
        type: 'Marketing',
        members: [
            {
                id: '46789',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Admin',
            },
             {
                id: '1232dfxxc',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Member',
            }
        ],
        list: [
            {
                id: '12234',
                name: 'Untitled ',
                type: 'Marketing',
                tasks: [
                    {
                        id: '122qws34',
                        title: 'Workspace 1',
                        asignee: {
                            name: 'Uzoamaka Anyanwu',
                            email: 'uzo@gmail.com'
                        },
                        due_date: new Date(),
                        priority: 'low',
                        description: 'This is a test task',
                        isCompleted: false,
                        comments: [
                            {
                                id: 'dewdsf12',
                                createdAt: new Date(),
                                updatedAt: new Date()
                            }
                        ]
                    }
                ]
            },
             {
                id: '1232dfxxc',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Member',
            }
        ]
    },
    {
        id: '567890',
        name: 'Workspace 2',
        type: 'Operations',
        members: [
            {
                id: '1122334',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Admin',
            }
        ],
        list: []
    },
    {
        id: '56789',
        name: 'Workspace 3',
        type: 'Sales & CRM',
        members: [
            {
                id: '1122334',
                name: 'Uzoamaka Anyanwu',
                email: 'uzo@gmail.com',
                type: 'Admin',
            }
        ],
        list: []
    },
]

export const dummyInvoicesData = [
    {
        amount: 223.51000000000002,
        currency: "NGN",
        client_email: "uzoamakaanyanwu26@gmail.com",
        date_created: "2021-12-15T22:31:15.000Z",
        date_paid: null,
        description: "Another test note",
        due_date: "2021-12-26T00:00:00.000Z",
        id: 43542,
        meta: {
            PBFPubKey: "FLWPUBK-bf457c347b29cfb06ef14b9dcd608188-X",
            cc_emails: "",
            invoice_interval: [
                {
                    interval_description: null,
                    interval_name: "invoice_int,erval",
                    interval_type: "One Time",
                    interval_value: "One Time"
                }
            ],
            invoice_notes: [
                {
                    notes_description: null,
                    notes_name: "invoice_notes",
                    notes_type: "invoice_notes_1",
                    notes_value: "Another test note",
                    invoice_number: "910207475280"
                }
            ],
            line_items: [
                {
                    item_description: null,
                    item_name: "Test item 1",
                    item_price: 200,
                    item_quantity: 1,
                    item_unit: 200
                },
                {
                    item_description: null,
                    item_name: "Test Item 2",
                    item_price: 23.4,
                    item_quantity: 1,
                    item_unit: 23.4
                }
            ],
            reminders: [],
            tax: [
                {
                    tax_description: null,
                    tax_name: "vat",
                    tax_type: "percentage",
                    tax_value: 0.11
                }
            ]
        },
        invoice_num: "910207475280",
        status: "draft",
        title: "Invoice from SmartBands"
    },
    {
        amount: 223.51000000000002,
        currency: "NGN",
        client_email: "uzoamakaanyanwu26@gmail.com",
        date_created: "2021-12-15T22:31:15.000Z",
        date_paid: null,
        description: "Another test note",
        due_date: "2021-12-26T00:00:00.000Z",
        id: 43545,
        meta: {
            PBFPubKey: "FLWPUBK-bf457c347b29cfb06ef14b9dcd608188-X",
            cc_emails: "",
            invoice_interval: [
                {
                    interval_description: null,
                    interval_name: "invoice_int,erval",
                    interval_type: "One Time",
                    interval_value: "One Time"
                }
            ],
            invoice_notes: [
                {
                    notes_description: null,
                    notes_name: "invoice_notes",
                    notes_type: "invoice_notes_1",
                    notes_value: "Another test note",
                    invoice_number: "910207475280"
                }
            ],
            line_items: [
                {
                    item_description: null,
                    item_name: "Test item 1",
                    item_price: 200,
                    item_quantity: 1,
                    item_unit: 200
                },
                {
                    item_description: null,
                    item_name: "Test Item 2",
                    item_price: 23.4,
                    item_quantity: 1,
                    item_unit: 23.4
                }
            ],
            reminders: [],
            tax: [
                {
                    tax_description: null,
                    tax_name: "vat",
                    tax_type: "percentage",
                    tax_value: 0.11
                }
            ]
        },
        invoice_num: "910207475280",
        status: "issued",
        title: "Invoice from SmartBands"
    }
]

export const projectStatusEnum = ['Blocked', 'Completed', 'In Progress', 'On Hold', 'Paid', 'Pending', 'Requires Fixes']

export const invoiceStatusEnum = ['Blocked', 'Draft', 'Due', 'Paid', 'Pending', 'Rejected']