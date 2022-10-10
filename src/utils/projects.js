export function calculateProps(val, propObj) {
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