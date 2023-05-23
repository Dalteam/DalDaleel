const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementsByClassName('close')[0];
const content = document.getElementsByClassName('content')[0];

loginBtn.onclick = () => {
    loginModal.style.display = 'block';
    content.classList.add('blurred');
}

closeModal.onclick = () => {
    loginModal.style.display = 'none';
    content.classList.remove('blurred');
}

window.onclick = (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none';
        content.classList.remove('blurred');
    }
}
