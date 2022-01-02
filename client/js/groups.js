const wrapper = document.querySelector(".wrapper");
const groupMsg = document.querySelector('.message');
const formGroup = document.querySelector('form')

const displayGroups = async () => {
    wrapper.innerHTML = '';

    try {
        const response = await fetch('http://localhost:6250/accounts', {
            method: 'GET',
            headers: {
                authorization:
                `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        const data = await response.json();
        console.log(data)

        if (data.length === 0) {
            
            groupMsg.innerHTML = "You don't have Groups"
        }
    } catch (error) {
        console.log(error)
    }
    
};

displayGroups();



formGroup.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(formGroup);
    const [group_id, name] = form.values();
    
    
    try {
        const req = await fetch("http://localhost:6250/accounts", {
            method: "POST",
            headers: { authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"},
            body: JSON.stringify({group_id, name})
        });
        const data = await req.json();
        console.log(data)
        
    } catch (error) {
        console.log(error)
    }
    
})