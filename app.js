const url='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userid=1&recipientId=2'
const transactionsDiv = document.querySelector('#transactionDiv')

const fetchData = async()=>{
    return await fetch(url,{
        method:'get'
    }).then((response)=>{
        return response.json();
    }).catch(err=>{
        console.error(`err`,err)
        return err
    })
}

window.addEventListener('DOMContentLoaded',async ()=>{
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let transactions = await fetchData()
    const finalData = [];
    const datesList = [];
    console.log(transactions)
    transactions.transactions.forEach((transaction)=>{
        let startDate = new Date(transaction.startDate);    
        let newDate = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;    
        let endDate = new Date(transaction.endDate);
        let timePeriod;
        if(endDate.getHours()<=12 && endDate.getHours()>0){
            hours=endDate.getHours()
            timePeriod = 'AM'
        }else if(endDate.getHours()>12){
            hours=endDate.getHours()-12;
            timePeriod='PM'
        }else if(endDate.getHours()==0){
            hours=12
            timePeriod = 'AM'
        }
        let newDate2 = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()} ${hours}:${endDate.getMinutes()} ${timePeriod}`;
        datesList.push(transaction.startDate)
        let finalEndDate = newDate2;
        console.log(transaction)
        let imageLink = (transaction.status==2)?'greenTick':'link';
        let action,message;
        if(transaction.direction == 1){
            message=(transaction.type==1)?'You paid':'You requested';
            action=(transaction.type==1)?`
                <div class='transactionDetails'>
                    <p>Transaction ID</p>
                    <p>${transaction.id}</p>
                </div>
            `:`
                <div class='transactionDetails'>
                    <button class='actionBtns'>
                        <p>Cancel</p>
                    </button>
                </div>
            `
        }else if(transaction.direction == 2){
            message=(transaction.type==1)?'Request recieved':'You recieved';
            action=(transaction.type==1)?`
                <div class='transactionDetails'>
                    <div style='display:flex'>
                        <button class='actionBtns'>
                            <p>Pay</p>
                        </button>
                        <button class='actionBtns'>
                            <p>Decline</p>
                        </button>
                    </div>
                </div>
            `:`
                <div class='transactionDetails'>
                    <p>Transaction ID</p>
                    <p>${transaction.id}</p>
                </div>
            `
        }
        let directionClass=(transaction.direction==1)?'right':'left';
        let amount = transaction.amount;
        const transTemplate = 
        // <div class="title">
        //     <div class='dateDiv'></div>
        //     <span>${newDate}</span>
        // </div>
        `
        <div class=${directionClass} style='display:flex; flex-direction:column'>
            <div class='card'>
                <div class="flexDiv1">
                    <div class="amountDiv">
                        <img src="./assets/Indian-Rupee-symbol.svg" alt="" class="rupeeSymbol">
                        <p class="amount">${amount}</p>
                    </div>
                    <div>${action}</div>
                </div>
                <div class="flexDiv2">
                    <div class="paymentMessage">
                        <img src="./assets/${imageLink}.png" alt="">
                        <p class="message">${message}</p>
                    </div>
                    <div class="rightArrowDiv">
                        <img src="./assets/right-arrow.png" alt="" class="rightArrowImg">
                    </div>
                </div>
            </div>
            <p style='font-size:10px; margin-top:5px; margin-right:30px; text-align:right'>${newDate2}</p>
        </div>
            `
        finalData.push(transTemplate)
    })
    let dateSet = new Set(datesList)
    finalData.forEach(data=>{
        transactionsDiv.innerHTML+=data;
    })
})
