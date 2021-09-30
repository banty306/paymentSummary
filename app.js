// const url='https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userid=1&recipientId=2'
// const transactionsDiv = document.querySelector('#transactionDiv')

// const fetchData = async()=>{
//     return await fetch(url,{
//         method:'get'
//     }).then((response)=>{
//         return response.json();
//     }).catch(err=>{
//         console.error(`err`,err)
//         return err
//     })
// }

// window.addEventListener('DOMContentLoaded',async ()=>{
//     const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     let transactions = await fetchData()
//     const finalData = [];
//     const datesList = [];
//     console.log(transactions)
//     transactions.transactions.forEach((transaction)=>{
//         let startDate = new Date(transaction.startDate);    
//         let newDate = `${startDate.getDate()} ${months[startDate.getMonth()]} ${startDate.getFullYear()}`;    
//         let endDate = new Date(transaction.endDate);
//         let timePeriod;
//         if(endDate.getHours()<=12 && endDate.getHours()>0){
//             hours=endDate.getHours()
//             timePeriod = 'AM'
//         }else if(endDate.getHours()>12){
//             hours=endDate.getHours()-12;
//             timePeriod='PM'
//         }else if(endDate.getHours()==0){
//             hours=12
//             timePeriod = 'AM'
//         }
//         let newDate2 = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()} ${hours}:${endDate.getMinutes()} ${timePeriod}`;
//         datesList.push(transaction.startDate)
//         let finalEndDate = newDate2;
//         console.log(transaction)
//         let imageLink = (transaction.status==2)?'greenTick':'link';
//         let action,message;
//         if(transaction.direction == 1){
//             message=(transaction.type==1)?'You paid':'You requested';
//             action=(transaction.type==1)?`
//                 <div class='transactionDetails'>
//                     <p>Transaction ID</p>
//                     <p>${transaction.id}</p>
//                 </div>
//             `:`
//                 <div class='transactionDetails'>
//                     <button class='actionBtns'>
//                         <p>Cancel</p>
//                     </button>
//                 </div>
//             `
//         }else if(transaction.direction == 2){
//             message=(transaction.type==1)?'Request recieved':'You recieved';
//             action=(transaction.type==1)?`
//                 <div class='transactionDetails'>
//                     <div style='display:flex'>
//                         <button class='actionBtns'>
//                             <p>Pay</p>
//                         </button>
//                         <button class='actionBtns'>
//                             <p>Decline</p>
//                         </button>
//                     </div>
//                 </div>
//             `:`
//                 <div class='transactionDetails'>
//                     <p>Transaction ID</p>
//                     <p>${transaction.id}</p>
//                 </div>
//             `
//         }
//         let directionClass=(transaction.direction==1)?'right':'left';
//         let amount = transaction.amount;
//         const transTemplate = 
//         // <div class="title">
//         //     <div class='dateDiv'></div>
//         //     <span>${newDate}</span>
//         // </div>
//         `
//         <div class=${directionClass} style='display:flex; flex-direction:column'>
//             <div class='card'>
//                 <div class="flexDiv1">
//                     <div class="amountDiv">
//                         <img src="./assets/Indian-Rupee-symbol.svg" alt="" class="rupeeSymbol">
//                         <p class="amount">${amount}</p>
//                     </div>
//                     <div>${action}</div>
//                 </div>
//                 <div class="flexDiv2">
//                     <div class="paymentMessage">
//                         <img src="./assets/${imageLink}.png" alt="">
//                         <p class="message">${message}</p>
//                     </div>
//                     <div class="rightArrowDiv">
//                         <img src="./assets/right-arrow.png" alt="" class="rightArrowImg">
//                     </div>
//                 </div>
//             </div>
//             <p style='font-size:10px; margin-top:5px; margin-right:30px; text-align:right'>${newDate2}</p>
//         </div>
//             `
//         finalData.push(transTemplate)
//     })
//     let dateSet = new Set(datesList)
//     finalData.forEach(data=>{
//         transactionsDiv.innerHTML+=data;
//     })
// })

const api_url = 
`https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2`;
async function getapi(url) {
    const response = await fetch(url);
    
    var data = await response.json();
    show(data);
}
getapi(api_url);
  


function show(data) {
    let str=''
for(let item of data.transactions)

{	
	const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	var current_datetime = new Date(item.startDate);
	var current_datetime2 = new Date(item.endDate);

	let formatted_date = current_datetime.getDate() + " " + months[current_datetime.getMonth()] + " " + current_datetime.getFullYear();
	let formatted_date2 = current_datetime2.getDate() + " " + months[current_datetime2.getMonth()] + " " + current_datetime2.getFullYear();
    let time = current_datetime2.toLocaleTimeString();

	let str2 = formatted_date2 + "," + time;
    let dir = item.direction;
	let status="";
	let type = item.type;
     let btn;
	 let transaction="";
     let img = false;
    if(type === 2)
	{
		if(dir === 2)
		{
          let btn1 = `<input type="submit" value="Pay"/>`;
		  let btn2 = `<input type="submit" value="Decline"/>`;

		  btn = btn1 +" " + btn2;
		  status = "Request received";
		}

		else if(dir === 1)
		{
			btn = `<input type="submit" value="Cancel"/>`;
			status = "You requested";

		}

		img = true;

	}
	else{

		btn = item.id;
		transaction = "Transaction ID";
		if(dir === 1)
		{
			status = "You paid";
		}
		else if(dir === 2)
		{
			status = "You received";
		}
	}
	 str+=`
				<div class="title">
					<span>${formatted_date}</span>
				</div>
				<div class="${item.direction===2?'row':'row active'}">
					<div class="card">
						<div class="line1">
							<div class="l">
								<big><i class="fa fa-rupee"></i>${item.amount}</big>
								<br>
								<tt>${transaction}</tt>
								<br>
								<code>${btn}</code>
							</div>
							<div class="r">
								<big><i class=" ${img === true? ' fa fa-clock-o ': ' fa fa-check '} "></i> ${status}</big>
								<br>
								<br>
								<i class="fa   fa-chevron-right"></i>
							</div>
						</div>
						<div class="line2">
							${str2}
						</div>
					</div>
					<div class="item"></div>
				</div>
	`
	document.querySelector(".modal-body").innerHTML=str
}
}


