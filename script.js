let myleads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads")) // step 2** get the val and conver it to array

if(leadsFromLocalStorage){                                  // //step 3** saving the value i.e. even after refresh it still remains there
    myleads=leadsFromLocalStorage
    render(myleads)
}

// const tabs = [
//     {url: "https://www.linkedin.com/in/prakhar-chandrakar-31393a189/"}
// ]

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        console.log(tabs)
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)
    })
})

function render(leads) 
{   let listitem = ""
    for(let i=0;i<leads.length;i++){
        listitem += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a> 
        </li>`
    }
    ulEl.innerHTML=listitem
}

inputBtn.addEventListener("click",function() {
    myleads.push(inputEl.value)
    inputEl.value="" // to clear the input line
    localStorage.setItem("myleads",  JSON.stringify(myleads))  // step1** store vals in localstorge also convert them to string
    render(myleads)
})

deleteBtn.addEventListener("dblclick",function() {
    localStorage.clear(),
    myleads=[]
    render(myleads)
})



// notes for local storage
// localStorage.setItem("myleads","www.prakhar.com")
// let name = localStorage.getItem("myleads")
// console.log(name)
// localStorage.clear()

// myleads=JSON.parse(myleads)   to convert string to array 
// console.log(myleads)

// myleads = JSON.stringify(myleads)   // to convert array to string
// console.log(typeof myleads)

