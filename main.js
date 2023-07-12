let currentPage = 1
let lastPage 
window.addEventListener('scroll',()=>{
    // const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
    // console.log({currentPage,lastPage,endOfPage});
    // console.log({innerHeigt:window.innerHeight,pageYOffset:window.pageYOffset,docu:document.body.offsetHeight});
    // if (endOfPage && currentPage < lastPage) {
    //     currentPage++;
    //     affichageData(currentPage)
    // }
})

affichageData()
function affichageData(page=1){
axios.get("https://tarmeezacademy.com/api/v1/posts?limit=8&page="+page)
 .then(function (response) {
    const info = response.data.data 
    lastPage = response.data.meta.last_page
    // if (reload) {
        document.getElementById("posts").innerHTML = ""
    // }
    info.forEach(element => {
        content = `
                    <div class="d-flex justify-content-center mt-5">
                    <div class="col-8">
                        <div class="container">
                            <div class="card" onclick="afficheCard(${element.id})">
                                <div class="card-header">
                                    <img style="width:50px;height: 30px;" src="${element.author.profile_image}" alt="">
                                    <b>${element.author.username}</b>
                                </div>
                                <div class="card-body">
                                    <img style="width:100%; height: 300px;"src="${element.image}" alt="">    
                                    <span style="color: rgb(167, 166, 166);">${element.created_at}</span>
                                    <p class="fw-semibold">${element.title}</p>
                                    <p class="fw-medium">${element.body}</p>
                                    <hr>
                                    <i class="fas fa-pen"></i> <label> (${element.comments_count}) Comments</label>
                                    <span class="badge rounded-pill text-bg-secondary" id="${element.id}"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ` 
        document.getElementById("posts").innerHTML += content
        
    })
// Replot tags
info.forEach((tags)=>{
    let tagFin = tags.tag = "undefined" ? "" : tags.tag
    document.getElementById(tags.id).innerHTML += tagFin
})
}) 
}


//Register
function btnRegister(){
    const name = document.querySelector("#name-register").value;
    const username = document.querySelector("#username-register").value;
    const password = document.querySelector("#pass-register").value;
    const photoReg = document.querySelector("#photo-register").files[0]

    let fromData = new FormData()
    fromData.append("username", username)
    fromData.append("password", password)
    fromData.append("name",name)
    fromData.append("image",photoReg)

    axios.post("https://tarmeezacademy.com/api/v1/register",fromData)
    .then((response) => {
        // console.log(response.data);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", JSON.stringify(response.data.user))
        // hide modal
        const modal = document.querySelector("#exampleModalRegister");
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert("merci","success")
        setUp()
    }).catch(function (error) {
        showAlert(error.response.data.message,"danger")
      })
}

//Login
function btnLogin(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#pass").value;
    

    let params = {
        "username": username,
        "password": password
    } 
    axios.post("https://tarmeezacademy.com/api/v1/login",params)
    .then((response) => {
        // console.log(response.data);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", JSON.stringify(response.data.user))
        // hide modal
        const modal = document.querySelector("#exampleModal");
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert("merci","success")
        setUp()
    })
}

// function setUp() {
//     let token = localStorage.getItem("token")
    
//     const divLogin = document.querySelector("#div-login")
//     const divLogout = document.querySelector("#div-logout")

//     // Div Post
//     const divPost = document.querySelector("#btn-pst")
    
//     if (token != null) {
//         const user = getCurrentUser()
//         console.log(user);
//         divLogin.style.setProperty("display", "none", "important")
//         divLogout.style.setProperty("display", "flex", "important")
//         divPost.style.setProperty("display", "block", "important")
//         document.getElementById("username-name").innerHTML = user.username
//         let imageUser = Object.keys(user.profile_image).length === 0 ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : user.profile_image;
//         document.getElementById("image-user").src = imageUser
//     }else{
//         divLogout.style.setProperty("display", "none", "important")
//         divLogin.style.setProperty("display", "flex", "important")
//         divPost.style.setProperty("display", "none", "important")
//     }
    

// }



// Function Share Post
function btnPost(){
    const title = document.querySelector("#title-post").value;
    const body = document.querySelector("#body-post").value;
    const image = document.querySelector("#photo-post").files[0];
    const token = localStorage.getItem("token");

    let fromData = new FormData()
    fromData.append("title", title)
    fromData.append("body", body)
    fromData.append("image", image)

    const headers = {
        "Content-Type": "multipart/from-data",
        "authorization":`Bearer ${token}`
    }
    axios.post("https://tarmeezacademy.com/api/v1/posts",fromData,{
        headers:headers
    })
    .then((response) => {
        // hide modal
        const modal = document.querySelector("#exampleModalPost");
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlert("merci","success")
        affichageData()
        setUp()
    }).catch(function (error) {
        showAlert(error.response.data.message,"danger")
      })
}
// btnCardClick
function afficheCard(id){
    window.location = "http://127.0.0.1:5500/homeDetail.html?postId="+id
}
