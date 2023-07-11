setUp() 
axios.get("https://tarmeezacademy.com/api/v1/posts")
 .then(function (response) {
    const info = response.data.data 
    info.forEach(element => {
        content = `
                    <div class="d-flex justify-content-center mt-5">
                    <div class="col-8">
                        <div class="container">
                            <div class="card">
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
        posts.innerHTML += content

        
    })


// Replot tags
info.forEach((tags)=>{
    let tagFin = tags.tag = "undefined" ? "" : tags.tag
    document.getElementById(tags.id).innerHTML += tagFin
})
//  
}) 
//Login
function btnLogin(){
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#pass").value;
    const params = {
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
        showAlertSuccess("merci","success")
        setUp()
    })
}

//Register
function btnRegister(){
    const name = document.querySelector("#name-register").value;
    const username = document.querySelector("#username-register").value;
    const password = document.querySelector("#pass-register").value;
    const params = {
        "username": username,
        "password": password,
        "name":name
    }
    axios.post("https://tarmeezacademy.com/api/v1/register",params)
    .then((response) => {
        // console.log(response.data);
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("username", JSON.stringify(response.data.user))
        // hide modal
        const modal = document.querySelector("#exampleModalRegister");
        const modalInstance = bootstrap.Modal.getInstance(modal)
        modalInstance.hide()
        showAlertSuccess("merci","success")
        setUp()
    }).catch(function (error) {
        showAlertSuccess(error.response.data.message,"danger")
      })
}

function logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showAlertSuccess("merci","danger")
    setUp()
}

function setUp() {
    let token = localStorage.getItem("token")
    
    const divLogin = document.querySelector("#div-login")
    const divLogout = document.querySelector("#div-logout")

    // Div Post
    const divPost = document.querySelector("#btn-pst")
    
    if (token != null) {
        divLogin.style.setProperty("display", "none", "important")
        divLogout.style.setProperty("display", "flex", "important")
        divPost.style.setProperty("display", "block", "important")
    }else{
        divLogout.style.setProperty("display", "none", "important")
        divLogin.style.setProperty("display", "flex", "important")
        divPost.style.setProperty("display", "none", "important")
    }
    

}

function showAlertSuccess(msj,tpe){
    const alertPlaceholder = document.getElementById('succes-alert')
    const alert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

    alert(msj, tpe)
    const alertToHide = bootstrap.Alert.getOrCreateInstance('#succes-alert')
    // Rja3 liha  setTimeout(()=>{
        // alertToHide.close()
    // }, 2000)
}

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
        showAlertSuccess("merci","success")
        setUp()
    }).catch(function (error) {
        showAlertSuccess(error.response.data.message,"danger")
      })

}