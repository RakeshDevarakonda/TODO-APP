let uolist = document.getElementById("uolist");
let taskbox = document.getElementById("taskbox");
let addbutton = document.getElementById("addbutton");
let totaldiv = document.getElementById("totaldiv");

taskbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && taskbox.value != "") {
    addtask();
  } else if (e.key === "Enter" && taskbox.value === "") {
    alert("Please Enter Some Text");
  }
});

function addtask() {
  if (taskbox.value === "") {
    alert("please enter some text");
  } else {
    let listitem = `
    <div class="totallistitem ">
      <span class="spantag">${taskbox.value}</span>
      <div class="editicon main">
              <i class="fa-solid fa-pen"></i>
        </div>
        <div class="deletebutton main">
              <i class="fa-solid fa-xmark"></i>
        </div>
     </div>`;

    uolist.insertAdjacentHTML("afterbegin", listitem);
    taskbox.value = "";
    setlocal();
    editbuttonanddelete();
  }
}

addbutton.addEventListener("click", () => {
  addtask();
});



function editbuttonanddelete() {


  let deletebutton = document.querySelectorAll(".deletebutton");
  deletebutton.forEach((e) => {
    e.addEventListener("click", () => {
      e.parentNode.remove();
      setlocal();
    });
  });



  const editIcons = document.querySelectorAll(".editicon");

  editIcons.forEach((editIcon) => {
    editIcon.addEventListener("click", () => {

      
      const spanTag = editIcon.previousElementSibling;
      let containertag = editIcon.previousElementSibling.parentNode;
      console.log(containertag)

      spanTag.contentEditable = "true";
      containertag.focus()





    

      spanTag.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          spanTag.contentEditable = "false";
          setlocal();
        }
      });






    });
  });
}

function setlocal() {
  localStorage.setItem("totaldata", uolist.innerHTML);
}

function loadlocal() {
  uolist.innerHTML = localStorage.getItem("totaldata");
  editbuttonanddelete();
}
loadlocal();
