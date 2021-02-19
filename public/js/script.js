document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("march-version JS imported successfully!");
  },
  false
);

//navbar selected different styling

  $(function() {
    if (location.pathname !== "/") {
    $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('activeLink');
    }
  });

// sign-up / login modal

// Get the modal
const modal = document.querySelector("#loginModal");

// Get the button that opens the modal
document.querySelector("#openLoginModal").onclick = () => { 
  modal.style.display = "block";
};

// Get the <span> element that closes the modal
const span = document.querySelector(".close");


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

// // //Newsletter MODAL
// const popUpNewsletter = document.getElementById('newsletterModal');
// const btnNewsletter = document.getElementById('submitBtn');

// const span1 = document.getElementById("closeCF");

//  btnNewsletter.onclick = function() {
//   const input = document.getElementById('email');
//   popUpNewsletter.style.display = "block";
// }


// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == popUpNewsletter) {
//     popUpNewsletter.style.display = "none";
//   }
// }

// // When the user clicks on <span> (x), close the modal
// span1.onclick = function(event) {
//   popUpNewsletter.style.display = "none";
// }

// Contact Form
//get the form by its id
//https://lo-victoria.com/how-to-build-a-contact-form-with-javascript-and-nodemailer
const form = document.getElementById("contact-form"); 
const popUpContact = document.getElementById('contactFormModal');
const span2 = document.getElementById("closeCF");
console.log(span2)

const sendMail = (mail) => {
  //1.
  fetch("https://ora-arts.herokuapp.com/contact-us", {
    method: "post", //2.
    body: mail, //3.
    
  }).then((response) => {
    return response.json();
  });
};


1.
const formEvent = form.addEventListener("submit", (event) => {
  event.preventDefault();
  //2.
  let mail = new FormData(form);
  //3.
  sendMail(mail);
  popUpContact.style.display = "block";
})


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == popUpContact) {
    popUpContact.style.display = "none";
  }
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function(event) {
  popUpContact.style.display = "none";
}






