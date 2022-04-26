import { ACCESS_KEY } from "./environment";

export default async function getimage(imageQuery = '') {
    return await fetch(`https://api.unsplash.com/search/photos?page=1&query=${imageQuery}&client_id=${ACCESS_KEY}&per_page=20`).then(res => res.json()).then(data => {
        return data;
    })
}