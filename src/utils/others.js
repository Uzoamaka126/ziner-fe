import { format, formatDistance, subDays, parse  } from 'date-fns'

/**
 * @param  {Date} date: Mon Feb 27 2017 18:33:38 GMT+0000 (UTC)
 * @returns {string} 27-Feb-2017
 */
export function formatDateTime(date) {
    return format(new Date(date), "dd/MM/yyyy")
}

/**
 * @param  {string} dateString: 2022-08-26T13:31:34.062Z
 * @returns {string} 27-Feb-2017
 */
export function formatDateStrings(dateString) { 
    const date = new Date(dateString)
    // const formatDate = parse(new Date(date), "dd MMMM yyyy", new Date(), { weekStartsOn: 0 })
    // console.log({ formatDate });
    return format(new Date(date), "dd MMMM yyyy")
}

/**
 * @param  {string} dateString: 2022-08-26T13:31:34.062Z
 * @returns {string} 27-Feb-2017
 */
 export function formatDateToDays(dateString) { 
    return formatDistance(subDays(new Date(dateString), 3), new Date(), { addSuffix: true })
}

/**
 * @param  {object} queryObj example: serialize({
  foo: "hi there",
  bar: {
    blah: 123,
    quux: [1, 2, 3]
  }
}
 * @returns {string} example: foo=hi%20there&bar=100%25
 */

export function serilaizeQuery(queryObj) {
    console.log('queryObj:', queryObj);
    var str = [];
    for (var x in queryObj)
        if (queryObj.hasOwnProperty(x)) {
            str.push(encodeURIComponent(x) + "=" + encodeURIComponent(queryObj[x]));
        }
    return str.join("&")
}

/**
 * @param  {object} queryObj example: serialize({
  foo: "hi there",
  bar: {
    blah: 123,
    quux: [1, 2, 3]
  }
}
 * @returns {string} example: foo=hi+there&bar=100%25&foo=hi+there&bar=100%25 //
    This function does not work for nested objects. If you try to run it, you'll get something like this: foo=hi+there&bar=100%25&foo=hi+there&bar=100%25&foo=hi+there&bar=%5Bobject+Object%5D
 */
export function serilaizeQueryNotNested(queryObj) {
    const searchParams = new URLSearchParams();
    
    Object.keys(queryObj).forEach(key => searchParams.append(key, queryObj[key]));
    
    return searchParams.toString()
}

/**
 * @param  {object} routeData
 * @param  {object} pageData 
}
 * @returns {{
        page: number,
        limit: number,
        email: string,
        name: string,
        download: boolean,
        title: string,
        clientName: string,
        status: boolean,

    }}
 */
export function assembleQueryList(routeData, pageData) {
    let queryObj = {}

    // build page num into query object
    if (typeof pageData !== 'undefined') {
        if (typeof pageData.paginationNum !== 'undefined' && typeof pageData.paginationNum === 'number') {
            queryObj.page = pageData.paginationNum
        }  
        // add limit to query list
        if (typeof pageData.limit !== 'undefined' && typeof pageData.limit === 'number') {
            queryObj.limit = pageData.limit
        } 
    }

    // build download into query list if download is set to true
    if ((typeof routeData.query.download !== 'undefined' && routeData.query.download) || pageData.download) {
        queryObj.download = true
    }

    // build client name into query list if route path is on '/clients' and a query name string exists
    if (routeData.path.includes('clients')) {
        if (typeof routeData.query.name !== 'undefined') {
            queryObj.name = routeData.query.name
        }
    }

    // build query for projects // TO DO
    return queryObj
}

export function setDataOnLs(key, data) {
    window.localStorage.setItem(key, data)
}

export function clearDataOnLs (key) {
    window.localStorage.removeItem(key)
}

export function sortList (sortingType, arr, valueToSortBy) {
    if (sortingType && sortingType === 'A - Z') {
        arr.sort((a, b) => {
            var lowerValue = a[valueToSortBy].toLowerCase(); // ignore upper and lowercase
            var higherValue = b[valueToSortBy].toLowerCase();

            if (lowerValue < higherValue) {
                return -1;
            }
            if (lowerValue > higherValue) {
                return 1;
            }

            return 0;
        }) 
    } else {
        arr.sort((a, b) => {
            var lowerValue = a[valueToSortBy].toLowerCase(); // ignore upper and lowercase
            var higherValue = b[valueToSortBy].toLowerCase();

            if (lowerValue < higherValue) {
                return 1;
            }
            if (lowerValue > higherValue) {
                return -1;
            }

            return 0;
        }) 
    }
}

export function formatAmount (x) {
    return x && typeof x === 'number' ? x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
};


export function formatPhoneNumber(str) {
    if (str && typeof str === 'string') {
        return str.slice(1, str.length)
    } else {
        return ''
    }
}

export function toLowerCaseTransform(str) {
    return str && typeof str === 'string' ? str.toLowerCase() : ''
}