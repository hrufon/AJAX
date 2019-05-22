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
    users.forEach(usr => renderUserCard(usr));
}

function renderUserCard(user){
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");
    const clearBtn = document.createElement("img");
    clearBtn.classList.add("clear-button");
    clearBtn.src = "close.png";
    userCard.innerHTML = `
    <p>Name: ${user.name} </p>  <p>Age: ${user.age}</p> `;
    container.append(userCard);
    userCard.append(clearBtn);
    clearBtn.addEventListener('click', () => { deleteUsers(user.id, userCard) })
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
    try {
        const userPost = await axios.post(URL, { name, age });
        if (userPost.status == 200) {
            const createdUser = userPost.data.data;
            renderUserCard({
                    ...createdUser,
                    id: createdUser._id,
                });
        }
    } catch (err) {
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
