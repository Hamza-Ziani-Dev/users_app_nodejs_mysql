


// get All Users 
async function getAllUsers() {
  const url = "http://localhost:3000/fetch-all-users";
  const table = document.getElementById("users");

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      data.forEach((user) => {
          let newRow = table.insertRow();
          let cell1 = newRow.insertCell(0);
          let cell2 = newRow.insertCell(1);
          let cell3 = newRow.insertCell(2);

          cell1.innerHTML = user.name;
          cell2.innerHTML = user.email;
          cell3.innerHTML = `
              <span class="edit" onclick="editUser(${user.id})">Edit</span>
              <span class="delete" onclick="deleteUser(${user.id})">Delete</span>
          `;
          cell3.dataset.user = JSON.stringify(user); 
      });
  } catch (error) {
      console.error('Error fetching users:', error);
      alert("An error occurred while fetching users.");
  }
}



// Create User
  function createUser(){
    let userForm  = document.getElementById("user_form");
    userForm.onsubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(userForm);
        let data = {
            
        }
        formData.forEach((value, key) => {
            data[key] = value;
            
        });
        const url = "http://localhost:3000/create";
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
             if(res.status == 200){
                alert("User Created");
                location.reload();
             }else{
                alert("User Not Created");
             }
        })
    }

  }


// Edit User
  function editUser(userId){
    console.log("Edit User:", userId);
    let url = `http://localhost:3000/users/${userId}`;
    fetch(url).then((res) => {
        return res.json();
    }).then((user) => {
       console.log(user);
       let inputName = document.getElementById("name");
       let inputEmail = document.getElementById("email");
       let button = document.getElementById("submit");
       inputName.value = user[0].name;
       inputEmail.value = user[0].email;
       button.textContent = "Update";
       updateUser(userId);
    })
  }

  // Update User 
  async function updateUser(userId){
    let userForm  = document.getElementById("user_form");
    userForm.onsubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(userForm);
        let data = {}
        data.id = userId;
        formData.forEach((value, key) => {
            data[key] = value;
            
        });
        const url = "http://localhost:3000/update";
        fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
             if(res.status == 200){
                alert("User Update");
                location.reload();
             }else{
                alert("User Not Updated");
             }
        })
    }

  }

// Delete User
function deleteUser(userId) {
  console.log("User ID to delete:", userId);
  let url = `http://localhost:3000/delete/${userId}`;
  fetch(url, { method: "DELETE" })
      .then((res) => {
          if (res.status === 200) {
              alert("User Deleted");
              location.reload();
          }
      })
      .catch((error) => {
          console.error('Error:', error);
          alert("An error occurred while deleting the user.");
      });
}




//   Apppel The Functions :
getAllUsers();
createUser();
editUser();
deleteUser();