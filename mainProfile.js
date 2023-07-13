// function info user
getUserInfo()
function getUserInfo(){
    let url = "https://tarmeezacademy.com/api/v1/users/5"
    axios.get(url)
    .then((response) =>{
        userInfo = response.data.data
        document.getElementById("mail-user").innerHTML = userInfo.email
        document.getElementById("name-user-arabic").innerHTML = userInfo.name
        document.getElementById("name-user").innerHTML = userInfo.username
        document.getElementById("number-post").innerHTML = userInfo.posts_count
        document.getElementById("number-comments").innerHTML = userInfo.comments_count
        document.getElementById("img-user").src = userInfo.profile_image
    })
}
//function 