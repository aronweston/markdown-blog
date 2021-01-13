//Init firebase and declare database reference
firebase.initializeApp(config.firebase);

const reference = firebase.database().ref('contact');




class Send {
    constructor(config) {
        this.name = document.getElementById("name");
        this.email = document.getElementById("email");
        this.msg = document.getElementById("message");
        this.form = document.getElementById("contactForm");
        this.config = config;
    }

    sendForm() {
        let name = this.name.value;
        let email = this.email.value;
        let msg = this.msg.value
        this.saveMessage(name, email, msg);
        this.emailJS(name, email, msg);
    }

    saveMessage(name, email, msg) {
        const newMessageRef = reference.push();
        newMessageRef.set({
            name: name,
            email: email,
            message: msg
        });
    }

    emailJS(name, email, msg) {
        //define template parameters 
        const templateParams = {
            name: name,
            email: email,
            message: msg
        };

        emailjs.send(config.service_id, config.template_id, templateParams, config.user_id)
            .then(res => {
                console.log("success", res.status, res.text)
            }).catch(err => console.log(err));
    }

}

//init UI and Send objects
const ui = new UI();
const send = new Send();

//Vars
document.querySelector("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    send.sendForm();
    ui.loader(true);
})

//Form validation
name.addEventListener('blur', () => {
    const name = document.getElementById("name");
    const re = /^[a-zA-Z]{2,10}$/;
    ui.validate(name, re);
});

email.addEventListener('blur', () => {
    const email = document.getElementById("email");
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i;
    validate(email, re);
});