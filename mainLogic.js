setUp()
// get Id Post Par Url
const utlParms = new URLSearchParams(window.location.search);
const id = utlParms.get("postId");
// Remplir cars par Id Post 
getPost()
function getPost(){
axios.get("https://tarmeezacademy.com/api/v1/posts/"+id)
.then(response => {
    post = (response.data.data);
    console.log(post);
    let commentContent = ''
    for (const comment of post.comments) {
        let imageUser = Object.keys(comment.author.profile_image).length === 0 ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : comment.author.profile_image;
        commentContent+=`
                    <!-- Comment -->
                        <div class="p-3" style="background-color: rgb(234, 234, 234);">
                            <!-- Picture + userName -->
                            <div>
                                <img src="${imageUser}" style="border-radius: 50%;width: 40px;height: 40px;" alt="">
                                <b>@${comment.author.username}</b>
                                <p>${comment.body}</p>
                            </div>
                            <!-- Picture + userName -->
                        </div>
                    <!-- Comment -->
        `

    }
    temp = `
            <div class="d-flex justify-content-center mt-5">
            <div class="col-8">
                <div class="container">
                    <div class="card">
                        <div class="card-header">
                            <img style="width:50px;height: 30px;" src="${post.author.profile_image}" alt="">
                            <b>${post.author.username}</b>
                        </div>
                        <div class="card-body">
                            <img style="width:100%; height: 300px;"src="${post.image}" alt="">    
                            <span style="color: rgb(167, 166, 166);">${post.created_at}</span>
                            <p class="fw-semibold">${post.title}</p>
                            <p class="fw-medium">${post.body}</p>
                            <hr>
                            <i class="fas fa-pen"></i> <label> (${post.comments_count}) Comments</label>
                            <span class="badge rounded-pill text-bg-secondary" id="${post.id}"></span>
                        </div>
                        <!-- Comments -->
                        <div id="comments">
                            ${commentContent}
                        </div>
                        <!-- Comments -->
                    </div>
                    <div class="input-group mb-3" id="add-comment-div">
                        <input type="text" id="add-comment" placeholder="Add Comment" class="form-control">
                        <button class="btn btn-outline-primary" type="button" onclick="shareComment()">Send</button>
                    </div>
                </div>
            </div>
        </div>


    `
    postUser.innerHTML =temp
})
}
//Alert 
function showAlert(msj,tpe){
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




// logout
function logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    showAlert("merci","danger")
    setUp()
}


// ignore btn
function setUp() {
    let token = localStorage.getItem("token")
    
    const divLogin = document.querySelector("#div-login")
    const divLogout = document.querySelector("#div-logout")

    // Div Post
    const divPost = document.querySelector("#btn-pst")
    
    if (token != null) {
        divLogin.style.setProperty("display", "none", "important")
        divLogout.style.setProperty("display", "flex", "important")
        if (divPost != null) {
            divPost.style.setProperty("display", "block", "important")
        }
        const user = getCurrentUser()
        document.getElementById("username-name").innerHTML = user.username
        let imageUser = Object.keys(user.profile_image).length === 0 ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : user.profile_image;
        document.getElementById("image-user").src = imageUser
    }else{
        divLogout.style.setProperty("display", "none", "important")
        divLogin.style.setProperty("display", "flex", "important")
        if (divPost != null) {
            divPost.style.setProperty("display", "block", "important")
        }
    }
    

}
// get Current User
function getCurrentUser(){
    
    let user = null
    const storageUser = localStorage.getItem("username")
    if (storageUser != null) {
        user =JSON.parse(storageUser)
    }
    return user 
       
}
// add comment
function shareComment(){
    let comment  = document.getElementById("add-comment").value
    let params = {
        "body":comment
    }
    let token = localStorage.getItem("token")
    let url = `https://tarmeezacademy.com/api/v1/posts/${id}/comments`
    axios.post(url, params,{
        headers:{ 
            "authorization":`Bearer ${token}`
        }
    }).then(response=>{
        console.log(response.data);
        getPost()
    }).catch( (error) => {
        // handle error
        msjEroor = (error.response.data.message);
        showAlert(msjEroor,"danger")
      })
}
