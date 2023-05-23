const dalBtn = document.getElementById('dalBtn');
const dalModal = document.getElementById('dalModal');
const closeModal2 = document.getElementsByClassName('close2')[0];
const content2 = document.getElementsByClassName('content')[0];





dalBtn.onclick = () => {
    dalModal.style.display = 'block';
    content.classList.add('blurred');
}

closeModal2.onclick = () => {
    dalModal.style.display = 'none';
    content2.classList.remove('blurred');
}

window.onclick = (event) => {
    if (event.target === dalModal) {
        dalModal.style.display = 'none';
        content2.classList.remove('blurred');
    }
}
