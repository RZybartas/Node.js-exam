const formLogin = document.getElementById("login");
const logMessage = document.querySelector('.message');


const login = async (email, password) => {
    try {
        const req = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
            const data = await req.json();
        
        
            if (data.error) {
                logMessage.style.color = 'red';
                logMessage.innerHTML = 'Incorrect email or password'
            }else {
                sessionStorage.setItem("token", data.token);
                location.assign('./groups.html');
            }
            
        } catch (err) {
            console.log(err)
        }
    }
       

        

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the values
    const form = new FormData(formLogin);
    const [email, password] = form.values()
    await login(email, password)
    
})


