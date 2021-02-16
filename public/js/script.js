document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("march-version JS imported successfully!");
  },
  false
);

// sign-up / login modal

// Get the modal
var modal = document.getElementById("loginModal");

// Get the button that opens the modal
var btn = document.getElementById("openModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// //Newsletter MODAL
// const popUpNewsletter=document.getElementById('newsletterModal')
// const btnNewsletter = document.getElementById('submitBtn')

// btnNewsletter.onclick(){
//   popUpNewsletter.style.display ="block"
// }

// Contact Form
//get the form by its id
//https://lo-victoria.com/how-to-build-a-contact-form-with-javascript-and-nodemailer
const form = document.getElementById("contact-form"); 

//1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();

    //2.
    let mail = new FormData(form);

    //3.
    sendMail(mail);

    const sendMail = (mail) => {
      //1.
      fetch("http://localhost:3000/contact-us", {
        method: "post", //2.
        body: mail, //3.
    
      }).then((response) => {
        return response.json();
      });
    };
  });

