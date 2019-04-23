const container = document.querySelector(".container");
const URL = "https://test-users-api.herokuapp.com/users/";
const button = document.querySelector("#create-user");

async function getUsers() {
    try {
        const user = await axios.get(URL);
        if (user.status == 200) {
            console.log(user)
            renderUsers(user.data.data);
        }
        else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("cannot get users", err);
    }
}
getUsers()

function renderUsers(users) {
    users.forEach(usr => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
        <p>Name: ${usr.name} </p>  <p>Age: ${usr.age}</p> `;
        container.append(userCard);
        userCard.append(clearBtn);
        clearBtn.addEventListener('click', () => { deleteUsers(usr.id, userCard) })
    })
}

async function deleteUsers(userid, block) {
    try {
        const userDel = await axios.delete(URL + `${userid}`)
        if (userDel.status == 200) {
            block.remove();
            console.log(userDel);
        }
        else throw new Error;
    }
    catch (err) {
        console.log("cannot delete users", err);
    }
}

async function createUser(name, age) {
    const userPost = await axios.post(URL, { name, age });
    try {
        if (userPost.status == 200) {
            renderUsers([{ name, age }]);
            console.log(userPost);
        }
        else {
            throw new Error
        }
    }
    catch (err) {
        console.log('cannot post', err);
    }
}

button.addEventListener('click', () => {
    const name = document.querySelector("#name");
    const age = document.querySelector("#age");
    let textMessage = "";

    if (isNaN(age.value) || age.value < 0 || name.value.length === 0 || age.value.length === 0 || Number(age.value) != parseInt(age.value, 10)) {
        textMessage = "Input must not be empty, age must be positive and integer number";
        document.querySelector("#message").innerHTML = textMessage;
          
    }
    else {
        textMessage="";
        document.querySelector("#message").innerHTML = textMessage;
        createUser(name.value, age.value);
    }
    
});


