export const parseUrl=(url)=>{
    const a = document.createElement("a");
    a.href=url;
    return a;
} 