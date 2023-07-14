let currentPage = 1
let lastPage = 1
window.addEventListener('scroll',()=>{
    let endOfPage = (window.innerHeight + window.pageYOffset) >= (document.documentElement.scrollHeight - 1);    // console.log({currentPage,lastPage,endOfPage});
    // console.log({innerHeigt:window.innerHeight,pageYOffset:window.pageYOffset,docu:document.body.scrollHeight,somme:window.innerHeight+window.pageYOffset+1,endOfPage});
    if (endOfPage && currentPage<lastPage) {
        currentPage++;
        console.log("second");
        affichageData(currentPage)
    }
})

affichageData()
function affichageData(page=1){
    toogleLoading(1)
axios.get("https://tarmeezacademy.com/api/v1/posts?limit=3&page="+page)
 .then(function (response) {
    toogleLoading(0)
    userConnect = getCurrentUser()
    const info = response.data.data 
    lastPage = response.data.meta.last_page
    // if (reload) {
        document.getElementById("posts").innerHTML = ""
        // }
        info.forEach(element => {
            let isMysPost = userConnect != null && userConnect.id == element.author.id
            let btnEdit = ""
            let btnRemove = ""
            if (isMysPost) {
                btnEdit = `<button class='btn btn-primary mx-1' style='float: right' onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(element))}')"><i class="fas fa-edit"></i></button>`
                btnRemove = `<button class='btn btn-danger' style='float: right' onclick="if (confirm('Are you sure?')) removePost(${element.id})"><i class="fas fa-trash"></i></button>`;
            }else{
                btnEdit = ''
            }
                content = `
                    <div class="d-flex justify-content-center mt-5">
                    <div class="col-8">
                        <div class="container">
                            <div class="card" >
                                <div class="card-header">
                                <span onclick="clickUser(${element.author.id})">
                                    <img style="width:50px;height: 30px;"  src="${element.author.profile_image}" alt="">
                                    <b>${element.author.username}</b>
                                </span>
                                    ${btnRemove}
                                    ${btnEdit}
                                </div>
                                <div class="card-body" onclick="afficheCard(${element.id})">
                                    <img style="width:100%;  height: 300px;"src="${element.image}" alt="">    
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
    toogleLoading(1)
    axios.post("https://tarmeezacademy.com/api/v1/register",fromData)
    .then((response) => {
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
      }).finally(function () {
        toogleLoading(0)
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
    toogleLoading(1)
    axios.post("https://tarmeezacademy.com/api/v1/login",params)
    .then((response) => {
        toogleLoading(0)
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




// Function Share Post
function btnPost(){
    let postId = document.getElementById("post-id");
    let isCreate = (postId == null || postId == "") ? false : true 
    // console.log(isCreate);
    toogleLoading(1)

    const title = document.querySelector("#title-post").value;
    const body = document.querySelector("#body-post").value;
    const image = document.querySelector("#photo-post").files[0];
    const token = localStorage.getItem("token");
    let fromData = new FormData()
    fromData.append("title", title)
    fromData.append("body", body)
    fromData.append("image", image)
    let url =""
    const headers = {
        "Content-Type": "multipart/from-data",
        "authorization":`Bearer ${token}`
    }
    if (isCreate){
        url = "https://tarmeezacademy.com/api/v1/posts"
    }else{
        fromData.append("_method","put")
        url = "https://tarmeezacademy.com/api/v1/posts/"+postId
    }
    axios.post(url,fromData,{
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
      }).finally(function () {
        toogleLoading(0)
      })

}

// btnCardClick
function afficheCard(id){
    window.location = "homeDetail.html?postId="+id
}

// FUNCTIPN EDIT POST
function editPostBtnClicked(postObject){
    let post = JSON.parse(decodeURIComponent(postObject))
    // console.log(post);
    
    document.getElementById("titleModal").innerHTML = "Edit Post"
    document.getElementById("btn-share").innerHTML = "Edit"
    document.getElementById("post-id").value = post.id
    document.getElementById("title-post").value = post.title
    document.getElementById("body-post").value = post.body
    
    let postModal = new bootstrap.Modal(document.getElementById("exampleModalPost",{}))
    postModal.toggle()
    // console.log(post);
    // return
}

// switch Modal 
function switchModal(){
    document.getElementById("titleModal").innerHTML = "Make New Post"
    document.getElementById("btn-share").innerHTML = "Share"
    document.getElementById("post-id").value = ""
    document.getElementById("title-post").value = ""
    document.getElementById("body-post").value = ""
}
// // Function Remove Post
function removePost(idPost){
    console.log(idPost);

    const token = localStorage.getItem("token");
    
    const headers = {
        "Content-Type": "multipart/from-data",
        "authorization":`Bearer ${token}`
    }
    toogleLoading(1)
    axios.delete("https://tarmeezacademy.com/api/v1/posts/"+idPost,{headers:headers})
    .then((response) => {
        toogleLoading(0)
        affichageData()
        // getAllPost()
    })
}

function clickUser(userId){
    window.location = "profile.html?userId="+userId
}
// function loading
function toogleLoading(bol){
    if (bol) {
        document.querySelector("#loading").style.visibility = "visible"
    }else{
        document.querySelector("#loading").style.visibility = "hidden"
    }
}