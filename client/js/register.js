const formRegister = document.querySelector(".register");

formRegister.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the values
    const formElements = new FormData(formRegister)

    const [full_name, email, password] = formElements.values()
    try {
        const res = await fetch("http://localhost:6250/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ full_name, email, password }),
        });
        const data = await res.json();
        
        if (!data) {
            console.log('Incorrect data')
        } else {
            
            location.assign('./login.html');
        }
    } catch (err) {
        console.log(err)
    }
    
})


