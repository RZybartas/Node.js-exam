
const billMsg = document.querySelector('.message');
const billForm = document.querySelector('form');
const table = document.querySelector('tbody');


const getBills = async () => {
    const group_id =  location.search.substring(2);
    
    table.innerHTML = "";
    try {
        const response = await fetch(`http://localhost:6250/bills/${group_id}`, {
            method: 'GET',
            headers: {
                authorization:
                `Bearer ${sessionStorage.getItem("token")}`
            }
        });
        const data = await response.json();
        
        if (data.length === 0) {
            billMsg.innerHTML = "You don't have  bills"
        };

        data.forEach(bill => {
            const tr = table.insertRow();
            const td1 = tr.insertCell();
            td1.textContent = bill.id;

            const td2 = tr.insertCell();
            td2.textContent = bill.description;

            const td3 = tr.insertCell();
            td3.textContent = bill.amount;

        });
    } catch (error) {
        console.log(error)
    }
};    
getBills();

billForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const group_id =  location.search.substring(2);
    const form = new FormData(billForm);
    const [amount, description] = form.values();
    
    try {
        const req = await fetch(`http://localhost:6250/bills`, {
            method: "POST",
            headers: { authorization: `Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type": "application/json"},
            body: JSON.stringify({group_id, amount, description})
        });
        
        const data = await req.json();
        window.location.reload(true)
        await getBills();
        return data
        
    } catch (error) {
        console.log(error)
    }
    
})