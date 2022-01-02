const formRegister = document.querySelector("form");
const pw = document.querySelector('.password');
const pw2 = document.querySelector('.confirm-password');
const btnSubmit = document.querySelector('.add');
const message = document.querySelector('.message')


const register = async (full_name, email, password) => {
    try {
        const req = await fetch("http://localhost:6250/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, password }),
        });
        
        const data = req.json();
        window.location.reload(true)
        return data
    } catch (error) {
        console.log({error: ' Incorrect password or email'})
    }
};


        

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the values
    const form = new FormData(formRegister)
    
    const [full_name, email, password] = form.values()
    
    await register(full_name, email, password)  
})

const check = () => {
    if (pw.value !== pw2.value) {
        pw.style.border = '1px solid red';
        pw2.style.border = '1px solid red';
        message.innerHTML = 'Passwords do not match';
        message.style.color = 'red'
        btnSubmit.disabled = true;
    } else {
        pw.style.border = '1px solid green';
        pw2.style.border = '1px solid green';
        message.innerHTML = 'Macthing';
        message.style.color = 'green'
        btnSubmit.disabled = false;
};
};
