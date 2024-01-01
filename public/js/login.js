const loginForm = async function(event) {
    event.preventDefault()

    const usernameEl = document.querySelector('#userLogin')
    const passwordEl = document.querySelector('#passwordLogin')

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { 'Content-Type': 'application/json'}
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to login')
    }
}

const newUserForm = async function(event) {
    event.preventDefault()

    const usernameEl = document.querySelector('#userLogin')
    const passwordEl = document.querySelector('#passwordLogin')

    const response = await fetch('/api/user/', {
        method: 'POST',
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { 'Content-Type': 'application/json'}
    })
    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert('Failed to login')
    }
}


document.querySelector('#loginForm').addEventListener('submit', loginForm)
document.querySelector('#newUserForm').addEventListener('submit', newUserForm)