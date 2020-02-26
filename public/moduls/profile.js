

async function drawProfilePage(login) {
    let profile = fetch("http://localhost:8080/profile/" + login);
    let activity = fetch("http://localhost:8080/repository/" + login);

    let root = document.getElementById("root");
    let divElement = document.createElement("div")
    divElement.className = "container";

    let profileObj
    let proT;
    let actT;

    await profile.then(res => res.json()).then(res => {
        profileObj = res["body"]
        proT = profileTemplate(profileObj);
    })
        .catch(err => {
            alert("Error: ", err)
        });
    await activity.then(res => res.json()).then(res => {
        actT = activityTemplate(res["body"]);

    })
        .catch(err => {
                alert("Error: ", err)
            }
        );

    divElement.innerHTML = proT + actT;
    root.appendChild(divElement)

    let aList = document.getElementsByClassName("rep-link")
    for (let i = 0; i < aList.length; i++) {
    aList[i].addEventListener("click", function (event) {
            // TODO : rep_link
            event.preventDefault();
            alert(" my link to " + this.name);
        })
    }


    document.getElementById("edit-button").addEventListener("click", updateProfile);


}

