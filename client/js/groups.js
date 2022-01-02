const wrapper = document.querySelector(".wrapper");
const groupMsg = document.querySelector('.message');
const formGroup = document.querySelector('form')
const id =  location.search.substring(2);
console.log(id)

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
        
        if (data.length === 0) {
            groupMsg.innerHTML = "You don't have Groups"
        };
        data.map(group => {
            const div = document.createElement('div');
            div.className = 'group-card';
            const h3 = document.createElement('h3');
            h3.className = 'group-id';
            h3.innerText = `Id: ${group.group_id}`;
            div.onclick = () => {
                window.location.href = `http://127.0.0.1:5500/client/html/bills.html?=${group.group_id}`}
            
            div.append(h3);
            wrapper.append(div);
            
        })
        return wrapper
    } catch (error) {
        console.log(error)
    }
};

displayGroups();
            
formGroup.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData(formGroup);
    const [group_id] = form.values();
    
    
    try {
        const req = await fetch("http://localhost:6250/accounts", {
            method: "POST",
            headers: { authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"},
            body: JSON.stringify({group_id})
        });
        
        const data = await req.json();
        await displayGroups();
        return data
        
    } catch (error) {
        console.log(error)
    }
    
})
            

        
    


