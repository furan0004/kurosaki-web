export function getQuery(url){
    if(url.indexOf("?") == -1) return [];
    
    let result = [];

    let query = url.split("?")[1];
    let lines = query.split("&");
    for(let i = 0; i < lines.length; i++){
        let sides = lines[i].split("=");

        result[sides[0]] = sides[1];
    }

    return result;
}