let my_leads = []
const textBox = document.getElementById("text_box")
const save_input = document.getElementById("save-input")
const deletee_btn=document.getElementById("deletee-btn")
const ulEl = document.getElementById("unordlist")
const tab_btn= document.getElementById("tab-btn")
let leads_from_local_storage=JSON.parse(localStorage.getItem("my_leads"))

if(leads_from_local_storage)
{
    my_leads=leads_from_local_storage
    renderlist(my_leads)
}
save_input.addEventListener("click", function () {
    my_leads.push(textBox.value) // this is how you take values from text box
    textBox.value = " " //Clears out the input feild once btn is clicked
    localStorage.setItem("my_leads",JSON.stringify(my_leads)) //Saving the array in local storage
    renderlist(my_leads)
})

tab_btn.addEventListener("click",function(){
    // Below is the line for getting the url of current tab and changes are also done in the manifest
    chrome.tabs.query({active:true , currentWindow:true} , function(tabs){
        my_leads.push(tabs[0].url)
        localStorage.setItem("my_leads",JSON.stringify(my_leads))
        renderlist(my_leads)
    })
})

deletee_btn.addEventListener("click",function(){
    localStorage.clear()
    my_leads=[]
    renderlist(my_leads)

}) 

// Const mtlb the value will not be changed once assigned



function renderlist(leads) {
    let listitem = ""
    for (let i = 0; i < leads.length; i++) {
        //listitem += "<li><a target='blank' href='" + leads[i] + "'>" + leads[i] + "</a></li>"
        // above we saw lots of use of quotation and double quotation
        // now to make it more redable we use template string
        listitem += `
        <li>
            <a target='_blank' href='${leads[i]}'> 
                    ${leads[i]}
            </a>
        </li>`
    }
    //ulEl.textContent += my_leads[i]+ " "
    // we want it to render in an list not plain text this is how it is
    ulEl.innerHTML = listitem  //Through .innerHTML we can write html elements in js
}
