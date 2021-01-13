class UI {

    constructor() {
        this.contact = document.getElementById("contact");
        this.spinner = document.querySelector("#spinner");
        this.contents = document.querySelector("#contact-main");
        this.container = document.querySelector(".contact-container");
    }

    formResponse(msg) {
        let div = document.createElement("div");
        div.classList = "wrapper center";
        div.innerHTML = msg;
        this.contact.appendChild(div);
    }

    loader(res) {
        //hide container
        this.container.classList.add("hidden");
        //show spinner
        this.spinner.classList.remove("hidden");
        setTimeout(() => {
            this.contents.remove();
            if (res === true) {
                this.formResponse(
                    `<div class="text-wrapper"><h1>Thank you for your question</h1>
                    <p>I will get back to you as soon as possible.</p></div>`
                );
            } else {
                this.formResponse(
                    `<div class="text-wrapper"><h1>Error. Form not submitted.</h1>
                    <p>Hmm. Strange. You'll have to try that again.</p></div>
                    <button onClick="window.location.reload();">Try again</button`
                );
            }
        }, 3000);
    }

    validate(el, re) {
        if (!re.test(el.value)) {
            //if invalid, add class
            el.classList.add('is-invalid');
        } else {
            el.classList.remove('is-invalid');
            el.classList.add('is-valid');
        }

    }

}








