export function getQuery(url){
    let result = [];
    
    let query = url.split("?")[1];
    let lines = query.split("&");
    for(let i = 0; i < lines.length; i++){
        let sides = lines.split("=");

        result[sides[0]] = sides[1];
    }

    return result;
}