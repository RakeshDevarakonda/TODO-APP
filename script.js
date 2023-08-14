let uolist = document.getElementById("uolist");
let taskbox = document.getElementById("taskbox");
let addbutton = document.getElementById("addbutton");
let totaldiv = document.getElementById("totaldiv");

// check whether entering task is empty or not
taskbox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && taskbox.value != "") {
    addtask();
  } else if (e.key === "Enter" && taskbox.value === "") {
    alert("Please Enter Some Text");
  }
});

// function to add task

function addtask() {
  if (taskbox.value === "") {
    alert("please enter some text");
  } else {
    let listitem = `
    <div class="totallistitem ">
    <input type="checkbox" class="checkbox">
  
      <span class="spantag">${taskbox.value}</span>
      
        <div class="deletebutton main">
        <i class="fa-solid fa-pen"></i>
              <i class="fa-solid fa-xmark"></i>
        </div>
     </div>`;

    uolist.insertAdjacentHTML("afterbegin", listitem);

    taskbox.value = "";

    setlocal();
    editbuttonanddelete();
    handleCheckbox();
  }
}

// add button to add tasks
addbutton.addEventListener("click", () => {
  addtask();
});

// fuction to edit and cross or delete button
function editbuttonanddelete() {
  handleCheckbox();

  // delete button
  let deletebutton = document.querySelectorAll(" .fa-xmark");
  deletebutton.forEach((e) => {
    e.addEventListener("click", () => {
      e.parentNode.parentNode.remove();
      setlocal();
    });
  });

  // edit button

  const penicons = document.querySelectorAll(".fa-pen");

  penicons.forEach((edittext) => {
    const total = edittext.closest(".totallistitem");
    const spanitemtag = edittext
      .closest(".totallistitem")
      .querySelector(".spantag");

    // for autotext save while editing
    spanitemtag.addEventListener("input", () => {
      setlocal();
    });

    edittext.addEventListener("click", () => {
      spanitemtag.contentEditable = "true";
      total.style.border = "1.5px solid black";
      setlocal();
    });

    spanitemtag.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        spanitemtag.contentEditable = "false";
        total.style.border = "";

        setlocal();
        if (spanitemtag.textContent.trim().length <= 0) {
          spanitemtag.parentNode.remove();
          setlocal();
        }
      }
    });

    document.addEventListener("click", (e) => {
      const clickedElement = e.target;
      setlocal();

      if (!clickedElement.closest(".totallistitem")) {
        spanitemtag.contentEditable = false;
        total.style.border = "";

        setlocal();
      }
      if (spanitemtag.textContent.trim().length <= 0) {
        spanitemtag.parentNode.remove();
        setlocal();
      }
    });
  });
}

// checkbox task complete

function handleCheckbox() {
  let checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      let parentDiv = checkbox.closest(".totallistitem");
      let spanTag = parentDiv.querySelector(".spantag");
      let pen = spanTag.nextElementSibling.querySelector(".fa-pen");

      if (checkbox.checked) {
        spanTag.classList.add("completed");
        pen.style.display = "none";
        spanTag.style.color = "green";
      } else {
        spanTag.classList.remove("completed");
        pen.style.display = "inline";
        spanTag.style.color = "black";
      }

      setlocal();
    });
  });
}

// setting data to local Storage

function setlocal() {
  localStorage.setItem("totaldata", uolist.innerHTML);

  let checkboxStates = [];
  let checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkboxStates.push(checkbox.checked);
  });
  localStorage.setItem("checkboxStates", JSON.stringify(checkboxStates));
}

function loadlocal() {
  uolist.innerHTML = localStorage.getItem("totaldata");
  editbuttonanddelete();
  handleCheckbox();

  let checkboxStates = JSON.parse(localStorage.getItem("checkboxStates")) || [];
  let checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox, index) => {
    checkbox.checked = checkboxStates[index];
  });
}

loadlocal();
