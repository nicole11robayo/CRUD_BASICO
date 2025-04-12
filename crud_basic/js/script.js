
document.addEventListener("DOMContentLoaded", function(){
    
    const form = document.getElementById("userForm");
    const userIdField = document.getElementById("userId");
    const nombreField = document.getElementById("nombre");
    const emailField = document.getElementById("email");
    const usersTableBody = document.querySelector("#usersTable tbody");

    function loadUsers(){
        fetch("php/read.php")
        .then(response => response.json())
        .then(data =>{
            usersTableBody.innerHTML="";
            data.forEach(user => {
                let tr = document.createElement("tr");

                tr.innerHTML=`
                    <td>${user.id}</td>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="editUser(${user.id},'${user.nombre}', '${user.email}')">Editar</button>

                        <button onclick="deleteUser(${user.id})">Eliminar</button>
                    </td>
                `;
                usersTableBody.appendChild(tr);
            });
        });
    };

    loadUsers();

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        let url="";
        let formData = new FormData();

        if(userIdField.value === ""){
            url="php/create.php";
            formData.append("nombre", nombreField.value);
            formData.append("email", emailField.value);            
        } else{
            url = "php/update.php";
            formData.append("id", userIdField.value);
            formData.append("nombre", nombreField.value);
            formData.append("email", emailField.value);
        }

        fetch(url, {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            console.log(result);
            form.reset();
            userIdField.value="";
            loadUsers();
        });
    });

    window.editUser = function(id,nombre,email){
        userIdField.value=id;
        nombreField.value = nombre;
        emailField.value=email;
    };

    window.deleteUser = function(id){
        if (confirm("¿Realmente deseas eliminar este usuario?")) {
            let formData = new FormData();
            formData.append("id",id);
            fetch("php/delete.php",{
                method: "POST",
                body:formData
            })
            .then(response => response.text())
            .then(result =>{
                console.log(result);
                loadUsers();
            });
        }
    };
})