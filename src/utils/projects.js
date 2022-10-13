export function calculateProps(val, propObj) {
    console.log({ propObj });
    switch (val) {
        case 'Overview': 
            return {
                title: propObj?.title,
                status: propObj?.status || '',
                deadline: propObj?.deadline || '',
                tags: propObj?.tags || []
            }
        case 'Boards': 
            return {
                boards: propObj?.boards,
            }
        case 'Tasks': 
            return {
                tasks: propObj?.tasks
            }
        case 'Calendar': 
            return {
                deadline: propObj?.deadline,
                createdAt: propObj?.createdAt,
                updatedAt: propObj?.updatedAt,
            }
        case 'Invoices':
            return {
                invoices: propObj?.invoices
            }
    }
}

export const tabList = [
    {   
        id: 'Overview',
        component: 'Overview',
        isActive: false
    },
    {   
        id: 'Boards',
        component: 'Boards',
        isActive: false

    },
    {   
        id: 'Tasks',
        component: 'Tasks',
        isActive: false

    },
    {   
        id: 'Tracker',
        component: 'Tracker',
        isActive: false

    },
    {   
        id: 'Calendar',
        component: 'Calendar',
        isActive: false

    },
    {   
        id: 'Invoices',
        component: 'Invoices',
        isActive: false

    },
    // {   
    //     id: 'Files',
    //     component: 'ProjectOverview'
    // },
];