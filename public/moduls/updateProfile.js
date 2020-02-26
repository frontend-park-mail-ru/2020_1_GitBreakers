function updateProfile(event) {
    // console.log(proT);
    event.preventDefault();
    document.getElementsByClassName("edit-profile")[0].innerHTML = updateprofileTemplate(profileObj);

    document.getElementById("updateProfileData").addEventListener("click", function (event) {
        let name = document.getElementsByName("name")[0].textContent || "";
        let bio = document.getElementsByName("bio")[0].textContent || "";
        let url = document.getElementsByName("url")[0].textContent || "";
        fetch("http://localhost:8080/settings/profile", {
            method : 'POST',
            body : {
                name,
                bio,
                url
            },
        }).then(res => res.json()).then(res => {

        }).catch(err => {
            alert(err)
        })
    })

}