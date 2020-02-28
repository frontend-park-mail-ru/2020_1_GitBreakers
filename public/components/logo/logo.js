class Logo {

    constructor(parent) {
        this.parent = parent;
    }

    render() {
        const logo = document.createElement("h1");
        logo.className = "logo";

        const logo__name = document.createElement("a");
        logo__name.className = "logo__name"; //classList?
        logo__name.href = "/";
        logo__name.textContent = "Git";

        logo.appendChild(logo__name);
        this.parent.appendChild(logo);
    }
}