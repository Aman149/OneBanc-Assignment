const apiKey = "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

getFunction(apiKey);
async function getFunction(url) {
  const response = await fetch(url);
  var data = await response.json();
  const displayInfo = sortDate(data);
  const result = splitFunction(displayInfo);
  addTransactions(result);
}


function sortDate(data) {
  const x = data.transactions.sort((a, b) => {
    let dAfter = new Date(a.startDate);
    let dBefore = new Date(b.startDate);
    return dAfter-dBefore;
  });
  return x;
}

function splitFunction(sortDate = []) {
  const getData = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortDate.forEach((x) => {
    const key = getData(x.startDate);
    if(!newData[key]) {
      newData[key] = [];
      newData[key].push(x);
    }
    else {
      newData[key].push(x);
    }
  });
  return newData;
}

var date;

function addTransactions(result) {
  for(let information in result) {
    var date = new Date(information);
    date = date.getDate() + " " + monthNames[(date.getMonth() + 1)] + " " + date.getFullYear();
    document.getElementById("transaction").innerHTML += 
      `<div class="top-date">
      <p>${date}</p>
      </div>`;

      for (let i = 0; i < result[information].length; i++) {
        let type = result[information][i].type;
        let direction = result[information][i].direction;
        var new_date = new Date(result[information][i].startDate)
        var date = new_date.toLocaleTimeString();
        new_date = new_date.getDate() + " " + monthNames[(new_date.getMonth() + 1)] + " " + new_date.getFullYear();

        if (type === 1 && direction === 1) {
          document.getElementById("transaction").innerHTML += 
          `<div class="right-align">
              <div class="transaction-box">
                  <p class="transaction-box-amount">&#8377; ${result[information][i].amount}</p>
                  <p class="transaction-box-message"> ✔️ You paid</p>
                  <div class="transaction-box-ID">
                      <p>Transaction ID</p>
                      <p>${result[information][i].id}</p>
                  </div>
                  <a href="#" class="next-btn">&#8250;</a>
              </div>
          </div>
          <div class="right-align-date">
                  <p>${new_date}, ${date}</p>
          </div>`;
        }

        else if (type === 1 && direction === 2) {
          document.getElementById("transaction").innerHTML += 
          `<div class="left-align">
              <div class="transaction-box">
                <p class="transaction-box-amount">&#8377; ${result[information][i].amount}</p>
                <p class="transaction-box-message">✔️ You received</p>
                <div class="transaction-box-ID">
                  <p>Transaction ID</p>
                  <p>${result[information][i].id}</p>
                </div>
                <a href="#" class="next-btn">&#8250;</a>
              </div>
            </div>
            <div class="left-align-date">
              <p>${new_date}, ${date}</p>
            </div>`;
        }

        else if (type === 2 && direction === 2) {
          document.getElementById("transaction").innerHTML += 
          `<div class="left-align">
            <div class="transaction-box">
              <p class="transaction-box-amount">&#8377; ${result[information][i].amount}</p>
              <p class="transaction-box-message">🔗 Request received</p>
              <div>
              <button class="pay-btn">Pay</button>
              <button class="decline-btn">Decline</button>
              </div>
              <a href="#" class="next-btn">&#8250;</a>
            </div>
          </div>
          <div class="left-align-date">
            <p>${new_date}, ${date}</p>
          </div>`;
        }

        else if (type === 2 && direction === 1) {
          document.getElementById("transaction").innerHTML += 
          `<div class="right-align">
              <div class="transaction-box">
                <p class="transaction-box-amount">&#8377; ${result[information][i].amount}</p>
                <p class="transaction-box-message">🔗 You requested</p>
                <div class="transaction-box-ID">
                  <button href="#" class="cancel-btn">Cancel</button>
                </div>
                <a href="#" class="next-btn">&#8250;</a>
              </div>
            </div>
            <div class="right-align-date"> 
               <p>${new_date}, ${date}</p>
            </div>`;
        }
      }

  }
}
