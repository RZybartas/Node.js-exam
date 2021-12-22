const form = document.querySelector(".register");
console.log(form)



form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the values
    const formElements = new FormData(form)
    console.log(formElements)
    const [full_name, email, password] = formElements.values()
    try {
        const res = await fetch("http://localhost:6250/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, password }),
        });
        const data = await res.json();
        
        if (!password.value === repeatPassword.value) {
            repeatPassword.style.borderColor = 'red';
        } else {
            repeatPassword.style.borderColor = 'green';
            location.assign('./login.html');
        }
    } catch (err) {
        console.log(err)
    }
    
})