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
                                    <span class="badge rounded-pill text-bg-secondary">${element.tags.join(" ,")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ` 
        posts.innerHTML += content

        
    });
})

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
    })
    setUp()
}
function logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUp()
}

function setUp() {

    let token = localStorage.getItem("token")
    const btnReg = document.querySelector("#btn-register")
    const btnLogin = document.querySelector("#btn-login")
    const btnLogout = document.querySelector("#btn-logout")
    console.log(token);
    
    
    if (token == null) {
        btnLogout.style.setProperty("display", "none", "!important")
        btnReg.style.setProperty("display", "flex", "!important")
        btnLogin.style.setProperty("display", "flex", "!important")
    }else{
        btnReg.style.setProperty("display", "none", "!important")
        btnLogin.style.setProperty("display", "none", "!important")
        btnLogout.style.setProperty("display", "flex", "!important")
    }
}