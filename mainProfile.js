let id = grtIdUrl("userId")

getUserInfo()
getAllPost()
function getUserInfo(){
    // let url = `https://tarmeezacademy.com/api/v1/users/11`
    let url = `https://tarmeezacademy.com/api/v1/users/${id}`
    console.log(url);
    axios.get(url)
    .then((response) =>{
        userInfo = response.data.data
        console.log(userInfo);
        document.getElementById("mail-user").innerHTML = userInfo.email
        document.getElementById("name-user-arabic").innerHTML = userInfo.name
        document.getElementById("name-user").innerHTML = userInfo.username
        document.getElementById("username-post-connect").innerHTML = `${userInfo.username} Posts`
        document.getElementById("number-post").innerHTML = userInfo.posts_count
        document.getElementById("number-comments").innerHTML = userInfo.comments_count
        document.getElementById("img-user").src = userInfo.profile_image
    })
}
//function get all post of user
function getAllPost(){
    let url = `https://tarmeezacademy.com/api/v1/users/${id}/posts`
    axios.get(url)
    .then((response) =>{
        userConnect = getCurrentUser()
        postInfo = response.data.data
        
        postInfo.forEach(element => {
            
            let isMysPost = userConnect != null && userConnect.id == element.author.id
            let btnEdit = ""
            let btnRemove = ""
            if (isMysPost) {
                btnEdit = `<button class='btn btn-secondary mx-1' style='float: right' onclick="editPostBtnClicked('${encodeURIComponent(JSON.stringify(element))}')">edit</button>`
                btnRemove = `<button class='btn btn-danger' style='float: right' onclick="if (confirm('Are you sure?')) removePost(${element.id})">Remove</button>`;
            }else{
                btnEdit = ''
            }
            temp = `
            <div class="d-flex justify-content-center mt-2">
            <div class="col-8">
                <div class="container">
                    <div class="card" >
                        <div class="card-header">
                            <img style="width:50px;height: 30px;"  src="${element.author.profile_image}" alt="">
                            <b>${element.author.username}</b>
                            ${btnEdit}
                            ${btnRemove}
                        </div>
                        <div class="card-body" >
                            <img style="width:100%;  height: 300px;"src="${element.image}" alt="">    
                            <span style="color: rgb(167, 166, 166);"></span>
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
            usersPost.innerHTML += temp
        });
        

    })


}
