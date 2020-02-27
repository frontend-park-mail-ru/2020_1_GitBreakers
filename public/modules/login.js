function createLogin() {
    const divLogin = document.getElementsByClassName('edit-profile')[0];
    divLogin.innerHTML = '';

    fetch(`http://localhost:8080/profile/${login}`)
        .then((res) => res.json())
        .then((res) => {
            divLogin.innerHTML = updateprofileTemplate(res.body);
        })
        .catch((err) => {
            alert('Error: ', err);
        });
}