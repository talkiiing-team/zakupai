

export async function getSchedulers() {
    const res = await fetch('https://api.закуп-ай.рф/schedulers/', { 
        method: 'GET',
    });

    return res.json();
}
