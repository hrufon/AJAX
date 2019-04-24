const URL = "https://test-users-api.herokuapp.com/users/";

async function getUsers() {
    try {
        const user = await axios.get(URL);
        if (user.status == 200) {
            console.log(user.data.data)
            renderUsers(user.data.data)
        } else {
            throw new Error();
        }
    }
    catch (err) {
        console.log("Can't show users", err);
    }
}
getUsers();

const container = document.querySelector(".container");

function renderUsers(users) {
    users.forEach(item => {
        const userElement = document.createElement('div');
        userElement.classList.add('user');
        userElement.innerHTML = `
        <p>Name: ${item.name}</p>
        <p>Age: ${item.age}</p>
        `
        const closeButton = document.createElement('img');
        closeButton.classList.add('close-button');
        closeButton.src = "img/close.png"
        container.append(userElement);
        userElement.append(closeButton);
        closeButton.addEventListener('click', () => {deleteUser(item.id, userElement)});
    })
}

async function createUsers(name, age){
    const createUser = await axios.post(URL, {name, age})
    try {
        if (createUser.status == 200) {
            console.log(createUser);
            renderUsers([{ name, age }]);
        }
        else {
            throw new Error
        }
    } catch (err) {
        console.log("can't create user", err);
    }
}

const button = document.querySelector('.add-user');
const error = document.querySelector('.error');

button.addEventListener('click', () => {
    const name = document.querySelector(".name");
    const age = document.querySelector(".age");;
    if(0<age.value && age.value <100){
        createUsers(name.value,age.value);
        error.style.display = "none";
    } else {
        error.innerText = 'enter correct name and age';
        error.style.display = "block";
    } 
})


async function deleteUser(userId, box){
    const deleteUsers = await axios.delete(URL + `${userId}`)
    try {
        if (deleteUsers.status == 200) {
            box.remove();
            console.log(deleteUsers);
        }
        else throw new Error;
    }
    catch (err) {
        console.log("can't delete user", err);
    }
}
