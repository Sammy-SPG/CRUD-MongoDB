const tBody = document.querySelector('#templateTableBody').content;
const fragment = new DocumentFragment();

addEventListener('DOMContentLoaded', (e) => {
    (async () => {
        const result = await fetch('/getUser');
        const body = await result.json();
        setData(body);
    })();
});

const setData = (data) => {
    data.forEach(element => {
        tBody.querySelector('.id').textContent = element._id;
        tBody.querySelector('.name').textContent = element.name;
        tBody.querySelector('.shape').textContent = element.shape;
        tBody.querySelector('.btn-danger').dataset.name = element.name;
        tBody.querySelector('.btn-warning').dataset.name = element.name;
        const clone = tBody.cloneNode(true);
        fragment.appendChild(clone);
    });
    document.querySelector('.table').appendChild(fragment);
}

document.querySelector('.table').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-danger')) {
        (async () => {
            const result = await fetch('/delteUser', {
                method: 'delete',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name: e.target.dataset.name })
            });
            console.log(e.target.dataset.id);
            const body = await result.json();
            console.log(body);
        })();
    }
    if (e.target.classList.contains('btn-warning')) {
        (async () => {
            const result = await fetch('/updateUser', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name: e.target.dataset.name })
            });
            console.log(e.target.dataset.id);
            const body = await result.json();
            console.log(body);
        })();
    }

    e.stopPropagation();
});

document.querySelector('.btn-primary').addEventListener('click', async (e) => {
    e.preventDefault();
    const result = await fetch('/setUser', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({ name: document.querySelector('#exampleFormControlInput1').value })
    });

    const body = await result.json();
    console.log(body);
});