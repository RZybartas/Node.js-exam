const formLogin = document.querySelector(".login");

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the values
    const formElements = new FormData(formLogin)

    const [email, password] = formElements.values()
    try {
        const res = await fetch("http://localhost:6250/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        
        if (!data) {
            console.log('Incorrect data')
        } 
    } catch (err) {
        console.log(err)
    }
    
})


