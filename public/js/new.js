const newForm = async function(event) {
    event.preventDefault()

    const title = document.querySelector('input[name="postTitle"]')
    const body = document.querySelector('textarea[name="postBody')

    await fetch(`/ap/post`, {
        method: 'POST',
        body: JSON.stringify({
            title, body,
        }),
        headers: { 'Content-Type': 'application/json'}
    })
    document.location.replace('/dashboard')
}

document.querySelector('#newForm').addEventListener('submit', newForm)