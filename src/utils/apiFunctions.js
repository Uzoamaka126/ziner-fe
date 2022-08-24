export function transformQueryToString( url = "", queryParams = undefined ) {
  let queryString = url;
  if( queryParams ) queryString += "?" + convertObjectToQueryString( queryParams );
  return queryString
}

export function transformObjectToQueryString( obj ) {
  var str = [];
  for (var p in obj) {
    
    if( obj[p] === undefined ) { 
      continue;
    }
    
    if (obj.hasOwnProperty(p)) {
      str.push((p) + "=" + (obj[p]));
    }
  }
  
  return str.join("&");
}