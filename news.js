// 3a131c0e33204ff8a2cbd9b365f4ee12

const cards = document.querySelector(".cards");
const category = document.querySelector(".category")
const categorySpan =document.querySelectorAll(".category span");

const url ="https://newsapi.org/v2/everything?q=tesla&from=2023-03-11&sortBy=publishedAt&apiKey=3a131c0e33204ff8a2cbd9b365f4ee12";

const usBusiness ="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3a131c0e33204ff8a2cbd9b365f4ee12";

const crypto ="https://newsapi.org/v2/everything?q=crypto&sortby=publishedAt&apiKey=3a131c0e33204ff8a2cbd9b365f4ee12";

const urlT = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=3a131c0e33204ff8a2cbd9b365f4ee12";
 
const backupImg ="https://images.unsplash.com/photo-1678698611311-535d7d644c1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2038&q=80";
async function dataRequest(url) {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
//promise
function urlReq(url){
    dataRequest(url).then((data) => {
        data.articles.forEach((item) => {
          cards.innerHTML += ` <div class="card">
              <div class="image">
                  <img src="${item.urlToImage ? item.urlToImage : backupImg}" alt="img">
              </div>
              <div class="information">
                  <div>
                      <p class="title">${item.title}</p>
                      <p class="description">${item.description}</p>
                      <p class="time">
                          <span>${item.publishedAt.replace("Z", "").split("T")[1]}</span>
                          <span>${item.publishedAt.replace("Z", "").split("T")[0]}</span>
                      </p>
                  </div>
                  <div class="other">
                      <span class="source">${item.source.name}</span>
                      <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                  </div>
              </div>
          </div>
      `;
          //console.log(item);
        });
      });
      
}

category.addEventListener("click", event =>{
    if(event.target.tagName ==="SPAN"){
        cards.innerHTML = "";
        urlReq(event.target.dataset.id);
        categorySpan.forEach(item => item.classList.remove("active"));
        event.target.classList.add("active");
    }
    //console.log(event.target)  
});

urlReq(url);
