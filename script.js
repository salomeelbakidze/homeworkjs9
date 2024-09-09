'use strict'

let btnLoadMore = document.getElementById("btn-load-more");
let btnPrev = document.getElementById("btn-prev-users");
let ulElement = document.getElementById("ul-users");
let currentPage = 1;
let totalPages;

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    method: "GET",
  })
    .then(function (response) {
     
      if (!response.ok) {
        throw "Server Error";
      }
      return response.json();
    })
    .then(function (dataInfo) {
      console.log(dataInfo);
      const fragment = document.createDocumentFragment();

      dataInfo.data.forEach((element) => {
        let li = document.createElement("li");

        let title = document.createElement("h2");
        title.innerText = `${element.first_name} ${element.last_name}`;

        let imgElement = document.createElement("img");
        imgElement.src = element.avatar;

        li.appendChild(title);
        li.appendChild(imgElement);
        fragment.appendChild(li);
      });

      ulElement.innerHTML = " ";
      ulElement.appendChild(fragment);

      totalPages = dataInfo.total_pages;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getUsers(currentPage);

btnLoadMore.addEventListener("click", function () {
  if (currentPage === totalPages) {
    return;
  }
  currentPage++;
  getUsers(currentPage);
});

btnPrev.addEventListener("click", function () {
  if (currentPage === 1) {
    return;
  }
  currentPage--;
  getUsers(currentPage);
});





// posts example

let mainWraperPost = document.getElementById("posts-wraper");
let overlayPost = document.getElementById("overlay");
let content = document.getElementById("contentPost");
let closeIcon = document.getElementById("close");


function ajaxPosts() {
  let requist = new XMLHttpRequest();
  requist.open("GET", "https://jsonplaceholder.typicode.com/posts");
  requist.addEventListener("load", function () {
    console.log(this);
    

    let responseData = JSON.parse(this.responseText); 
    responseData.forEach((element) => {
      
      createPostDiv(element);
    });
  });
  requist.send();
}
ajaxPosts();


function createPostDiv(item) {
  let divElement = document.createElement("div");
  divElement.classList.add("post-container");
  divElement.setAttribute("data-id", item.id);

  let titleElement1 = document.createElement("h3");
  titleElement1.innerText = item.id;

  let titleElement2 = document.createElement("h2");
  titleElement2.innerText = item.title;

  divElement.appendChild(titleElement1);
  divElement.appendChild(titleElement2);

  divElement.addEventListener("click", function () {
    overlayPost.classList.add("overlayActive");
    console.log(this);

    let clickedDivId = this.getAttribute("data-id");
    console.log(clickedDivId);
  });

  mainWraperPost.appendChild(divElement);
}


closeIcon.addEventListener("click", function () {
  overlayPost.classList.remove("overlayActive");
});