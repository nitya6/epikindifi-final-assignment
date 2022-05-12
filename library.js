// Write your code here!
const Booksdatabase=[
    {
        id:1,
        title:"Book1",
        author:"Author1",
        lender:"UserC",
        borrower:"UserB",
    },
    {
        id:2,
        title:"Book2",
        author:"Author2",
        lender:"UserC",
        borrower:"-",
    },
    {
        id:3,
        title:"Book3",
        author:"Author3",
        lender:"UserD",
        borrower:"UserC",
    },
    {
        id:4,
        title:"Book4",
        author:"Author4",
        lender:"UserA",
        borrower:"-",
    },
    {
        id:5,
        title:"Book5",
        author:"Author5",
        lender:"UserA",
        borrower:"-",
    },
    {
        id:6,
        title:"Book6",
        author:"Author6",
        lender:"UserB",
        borrower:"UserA",
    }
]
const Users=["UserA","UserB","UserC","UserD"];
let loggedInUser="";
const loggedin=document.getElementById("logged-in-user-name");
loggedin.innerHTML="No user logged in"
const table=document.getElementById("info-table");
const tbody=document.createElement("tbody");
table.appendChild(tbody);
const generateTable=function(){
Booksdatabase.forEach(data=>{
    const tr=document.createElement("tr");
    tr.id=`${data.id}`
    for(let property in data)
    {
        const td=document.createElement("td");
        td.innerHTML=`${data[property]}`;
        tr.appendChild(td);
    }
    const td=document.createElement("td");
    td.innerHTML="-"
    tr.appendChild(td);
    tbody.appendChild(tr);
})}
generateTable();
const updateTable=function(){
    Booksdatabase.forEach(data=>{
    const tr=document.getElementById(`${data.id}`);
    const tds=tr.childNodes;
    tds[4].innerHTML=`${data.borrower}`
    tds[5].innerHTML="-";  
    })
}
const logOut=function(){
    updateTable();
    const tr=document.getElementById("add");
    if(tr)
    {
        tr.remove();
    }
}
const createAdd=function(){
    const tr=document.createElement("tr");
    tr.id="add";
    const td1=document.createElement("td");
    const td2=document.createElement("td");
    const td3=document.createElement("td");
    const td4=document.createElement("td");
    const td5=document.createElement("td");
    const td6=document.createElement("td");
    td1.innerHTML=`${Booksdatabase.length+1}`
    td2.innerHTML='<input type="text" id="title" placeholder="title"/>'
    td3.innerHTML='<input type="text" id="author" placeholder="author"/>'
    td4.innerHTML=`${loggedInUser}`;
    td5.innerHTML="-";
    td6.innerHTML='<button onclick="addBook(this)">Add book</button>'
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tbody.appendChild(tr);
}
const changeLoggedInUser=function(){
   logOut();
   console.log(Booksdatabase)
   const loginBox=document.getElementById("logged-user");
   const loginText=loginBox.value;
   if(loginText=="")
   {
       loggedInUser=""
       loggedin.innerHTML="No user logged in"
       return;
   }
   if(!Users.includes(loginText))
    {
        loggedInUser=""
        loginBox.value=""
        loggedin.innerHTML="No user logged in"
        return;
    }
    loggedInUser=loginText;
    loggedin.innerHTML=`Logged in user:${loginText}`
    Booksdatabase.forEach(data=>{
        if(data.borrower==loggedInUser)
        {
            const tr=document.getElementById(`${data.id}`);
            const tds=tr.childNodes;
            tds[5].innerHTML='<button onclick="Return(this)">Return</button>';
            tds[5].lastChild.setAttribute("rowid",`${data.id}`)
        }
        if(data.lender!=loggedInUser && data.borrower=="-")
        {
            const tr=document.getElementById(`${data.id}`);
            const tds=tr.childNodes;
            tds[5].innerHTML='<button onclick="borrow(this)">Borrow</button>';
            tds[5].lastChild.setAttribute("rowid",`${data.id}`)
        }
    })
    createAdd();
}
const Return=function(element){
  const rowid=parseInt(element.getAttribute("rowid"))
  console.log(rowid)
  element.innerHTML="Borrow"
  element.setAttribute("onclick","borrow(this)")
  const tr=document.getElementById(`${rowid}`)
  tds=tr.childNodes
  tds[4].innerHTML="-"
  Booksdatabase[rowid-1].borrower="-";
}
const borrow=function(element){
  const rowid=parseInt(element.getAttribute("rowid"))
  console.log(rowid)
  element.innerHTML="Return"
  element.setAttribute("onclick","Return(this)")
  const tr=document.getElementById(`${rowid}`)
  tds=tr.childNodes
  tds[4].innerHTML=`${loggedInUser}`
  Booksdatabase[rowid-1].borrower=`${loggedInUser}`;
}
const addBook=function(element)
{
   const tr=document.getElementById("add")
   const tds=tr.childNodes;
   const title=tds[1].lastChild.value;
   const author=tds[2].lastChild.value;
   if(title!="" && author!="")
   {
      tds[1].innerHTML=`${title}`
      tds[2].innerHTML=`${author}`
      tds[5].innerHTML="-"
      tr.id=`${Booksdatabase.length+1}`;
      const data={
          id:Booksdatabase.length+1,
          title:`${title}`,
          author:`${author}`,
          lender:`${loggedInUser}`,
          borrower:"-"
      }
      Booksdatabase.push(data);
      createAdd();
   }
}
