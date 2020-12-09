const button = document.querySelector('#submit');

button.onclick = async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;

    const body = JSON.stringify({name, phone, email});

    const response = await fetch('http://localhost:3000/api/contact', {
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        method: 'POST',
        body
    })

    console.log(response);
}
