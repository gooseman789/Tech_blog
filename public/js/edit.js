const postId = document.querySelector('input[name="psot-id"]')

const editForm = async function(event) {
    event.preventDefault()
    const title = document.querySelector('input[name="postTitle"]').value 
    const body = document.querySelector('textarea[name="postBody"]').value
    await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title, 
            body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    document.location.replace('/dashboard')
}

const deletePost = async function() {
    await fetch(`api/post/${postId}`, {
        method: 'DELETE'
    })
    document.location.replace('/dashboard')
}

document.querySelector('#editPost').addEventListener('submit', editForm)
document.querySelector('#deletePost').addEventListener('click', deletePost)