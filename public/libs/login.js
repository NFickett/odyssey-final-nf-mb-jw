var imageLink = document.createElement('img');

function login(){
    window.open("https://odyssey-final-nf-mb-jw.azurewebsites.net/.auth/login/google?post_logout_redirect_url=/home-page.html")
}
function logout(){
    window.open("https://odyssey-final-nf-mb-jw.azurewebsites.net/.auth/logout?post_logout_redirect_uri=/home-page.html")
}

function getEmail(){
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://odyssey-final-nf-mb-jw.azurewebsites.net/.auth/me');
    ourRequest.onload = function(){
        userData = JSON.parse(ourRequest.responseText);
        console.log(userData[0].user_id);

        document.getElementById("emailTest").insertAdjacentHTML('beforeend', userData[0].user_id);
    };
    ourRequest.send();
};

function getImage(){
    
   
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://odyssey-final-nf-mb-jw.azurewebsites.net/.auth/me');
    ourRequest.onload = function(){
        userData = JSON.parse(ourRequest.responseText);
        for(i = 0; userData[0].user_claims[i]; i++){
            if (userData[0].user_claims[i].typ == "picture"){
                imageLink.src = userData[0].user_claims[i].val
                console.log(userData[0].user_claims[i].val)
            }else{}
        }
        document.getElementById("imageTest").appendChild(imageLink);
    };
    ourRequest.send();
};
