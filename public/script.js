async function windowActions(){
    console.log('Window loaded')
    const search = document.querySelector('#search');
    const form = document.querySelector('.userform');

    form.addEventListener('submit', async(event) =>{
        event.preventDefault();
        const data = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({search: search.value})
        
        });
    });
    search.addEventListener('input', async(event) => {
        console.log('input', event.target.value);
    });
}

window.onload = windowActions;