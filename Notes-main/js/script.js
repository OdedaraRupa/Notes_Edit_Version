displayNotes();




let addbtn = document.getElementById(`addBtn`)

addbtn.addEventListener(`click`, function (e) {
    let addTxt = document.getElementById(`addText`);
    console.log(addTxt.value)
    const jsondata = {
        notetext:addTxt.value,
        important: false
        
      }
   
    let notes = localStorage.getItem(`notes`);
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    
    notesobj.push(jsondata);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    addTxt.value = "";
    displayNotes();
})

function displayNotes() {

    let notes = localStorage.getItem(`notes`);
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = ``;

    notesobj.forEach((element, index) => {
        // let todayDate= new Date();
        
        html += `<div class="col-3 notecard mx-2 my-2   ${element.important === true ? "bg-green":"bg-grey"}" >
        <div class="card-body"> 
        <h5 class="card-title" id ="para${index}">Notes : ${element.notetext}</h5>
        <p class="card-text "> </p>
        <button id="button-${index}" onclick="importantOject(${index})" class="btn btn-primary ">Important</button>
         <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary ">Delete</button>
         
             </div>
             </div> `

    });
    let notesElm = document.getElementById(`notes`);
    if (notesobj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Make New Notes`
    }
}

function deleteNotes(index) {
    console.log(`I am deleting note`, index);
    let notes = localStorage.getItem(`notes`);
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesobj));
    displayNotes();


}


let search = document.getElementById(`searchTxt`);
search.addEventListener(`input`, function () {
    let inputVal = search.value;
    // console.log(`input event fire`, inputVal)
    let noteCards = document.getElementsByClassName(`notecard`);
    // console.log(noteCards);
    Array.from(noteCards).forEach(function (element) {
          let cardTxt = element.getElementsByTagName("p")[0].innerText;

        if (cardTxt.includes(inputVal)) {
            element.style.display = "block"
        }
        else {
            element.style.display = `none`
        }

    })

})

function importantOject(index){
     

  let notes = localStorage.getItem(`notes`);
  if (notes == null) {
    notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
   
    const newData = {
        notetext:notesobj[index].notetext,
        important: true
    };
    console.log(index);
    console.log(notesobj[index].notetext)
    notesobj[index] = Object.assign({}, notesobj[index], newData)
    localStorage.setItem('notes', JSON.stringify(notesobj));
    displayNotes();
   
}