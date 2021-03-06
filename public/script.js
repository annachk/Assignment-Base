// The filter is by category

const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json'
x = []

async function windowActions(){
    console.log('Window loaded')
    const search = document.querySelector('#search');
    const form = document.querySelector('.userform');

    form.addEventListener('submit', async(event) =>{
        event.preventDefault();
        fetch(endpoint)
            .then(blob => blob.json())
            .then(data => x.push(...data))
            
        
        });

    search.addEventListener('input', async(event) => {
        console.log('input', event.target.value);
    });
    
}

window.onload = windowActions;

function findMatches(wordToMatch, x){
    return x.filter(place => {

        const regex = new RegExp(wordToMatch, 'gi');
        return place.category.match(regex)
    });
}
function displayMatches(){
    const matchArray = findMatches(this.value, x);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const categoryName = place.category.replace(regex, `<p>${this.value}</p>`);
        return `
            <li class="block mt-4 py-4">
                <p class="name big">${place.name}</p>
                ${categoryName}
                <address>
                    <p>${place.address_line_1}
                    </br>
                    ${place.city}
                    </br>
                    ${place.zip}</p>
                </address>
            </li>
        `;
    }).join('');
    suggestions.innerHTML = html;
}

const suggestions = document.querySelector('.suggestions');

search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);