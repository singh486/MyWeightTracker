
class App{
    constructor(selectors){
        this.items = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        if( document.querySelector(selectors.formSelector)){
                document
                .querySelector(selectors.formSelector)
                .addEventListener('submit', ev => {
                    ev.preventDefault()
                    this.handleSubmit(ev)
                })

        }
        var db = firebase.firestore();
        var items2 = []
        var c = 0
        db.collection("users").doc(localStorage.key(0)).collection("items").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                const item = {
                    id: doc.data().id,
                    name: doc.data().name,
                    date: doc.data().date,
                    fav: doc.data().fav
                }
                //console.log(item)
                
                items2.unshift(item)
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data().date);


            const ul = document.getElementById('itemList')
            const li = document.createElement("LI")

            var nameT = document.createTextNode(item.name + " ")
            var dateT = document.createTextNode(item.date + " ")

            var deleteButton = document.createElement("BUTTON")
            deleteButton.innerHTML = "X"

            var favoriteButton = document.createElement("BUTTON")
            favoriteButton.innerHTML = "FAV"

            var editButton = document.createElement("BUTTON")
            editButton.innerHTML = "edit"

            var upButton = document.createElement("BUTTON")
            upButton.innerHTML = "up"

            var downButton = document.createElement("BUTTON")
            downButton.innerHTML = "down"

            var x = document.createTextNode(" ")

            li.append(nameT)
            li.append(dateT)
 
            li.append(x)
            li.append(deleteButton)
            li.append(x)
            li.append(favoriteButton)
            li.append(x)
            li.append(editButton)
            li.append(x)
            li.append(upButton)
            li.append(x)
            li.append(downButton)

            deleteButton.addEventListener('click', ev => {
                li.remove()        
                var db = firebase.firestore();
                var itemCurr = item.date;

            db.collection("users").doc(localStorage.key(0)).collection("items").doc(itemCurr).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            })
    

            favoriteButton.addEventListener('click', ev=>{

                console.log(this.items)
            })

            upButton.addEventListener('click', ev=>{

            })

            downButton.addEventListener('click', ev=>{

            })
    
            // const editButton = li.querySelector('.actions').querySelector('#edit')
            // editButton.addEventListener('click', this.toggleEditable.bind(this, li, input))
            
            // li.addEventListener('keypress', this.saveOnEnter.bind(this, li, input))


            

            ul.append(li)
                //console.log(c);

                //console.log("FUCK ME");
                
                //console.log(items2)
            });
            //this.items=items2;
            

        });
        console.log("PRINT HERE " + c)

        

    }


    viewBy(){

        const select = document.getElementById("select")
        select.onchange = (ev=>{
            console.log(select.value)
            switch(select.value){
                case "All":
                    this.reprintList()
                    break
                case "Earliest to Latest":
                    this.bubbleSort(0)
                    this.reprintList()
                    break
                case "Latest to Earliest":
                    this.bubbleSort(1)
                    this.reprintList()
                    break
                case "Least to Greatest":
                    this.bubbleSort(2)
                    this.reprintList()
                    break
                case "Greatest to Least":
                    this.bubbleSort(3)
                    this.reprintList()
                    break
                case "Favorites":
                    this.reprintList("fav")
                    break
            }
        })
    }

    handleSubmit(ev){
        console.log(localStorage)
        const f = ev.target
        const item = {
            id: ++this.max,
            name: f.itemName.value,
            date: document.querySelector("#date").value,
            fav: false,
        }

        this.items.unshift(item)

        const listItem = this.renderListItem(item)
        this.list.insertBefore(listItem, this.list.firstChild)
        //var email = document.getElementById("email").value;

        var db = firebase.firestore();
        console.log("LOCAL STORE " + localStorage.key(0))
        db.collection("users").doc(localStorage.key(0)).collection("items").doc(item.date).set({
            name: item.name,
            id: item.id,
            fav: item.fav,
            date: item.date
          })
          .then(function(docRef) {
              console.log("ADDEDITMES")
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });



    //   db.collection("items").doc(item.date).set({
    //     name: item.name,
    //     id: item.id
    //   })
    //   .then(function(docRef) {
    //       console.log("ADDEDITMES")
    //   })
    //   .catch(function(error) {
    //     console.error("Error adding document: ", error);
    //   });
    
        f.reset()
    }

    renderListItem(input){
        const ul = document.getElementById('itemList')
        const li = this.template.cloneNode(true)
        li.classList.remove('template')
        li.dataset.id = input.id
        li.querySelector('.itemName').textContent = input.name
        li.querySelector('#dateDisplay').textContent = input.date
        //console.log(li.querySelector('.actions').textContent)
        const deleteButton = li.querySelector('.actions').querySelector('.alert')
        deleteButton.addEventListener('click', ev => {
            li.remove()
            var itemCurr = this.items[this.items.indexOf(input)].date;
            console.log("CURRENT ITEM: " + itemCurr);
            var db = firebase.firestore();
            db.collection("users").doc(localStorage.key(0)).collection("items").doc(itemCurr).delete().then(function() {
                console.log("Document successfully deleted!");
            }).catch(function(error) {
                console.error("Error removing document: ", error);
            });
            this.items.splice(this.items.indexOf(input), 1)
            var db = firebase.firestore();
            
            console.log(this.items)          
        })

        const favoriteButton = li.querySelector('.actions').querySelector('.warning')
        favoriteButton.addEventListener('click', ev=>{
            li.style.backgroundColor = "#6699ff"
            
            for (var i = 0, len = this.items.length; i < len; i++) {
                if(Object.is(this.items[i], input)){
                    if(this.items[i].fav == true){
                        li.style.backgroundColor = "#ffffff"
                        this.items[i].fav = false
                        break
                    }else{
                        this.items[i].fav = true
                        break
                    }
                }
            }
            //input.fav = li.classList.toggle('fav')
            console.log(this.items)
        })

        const upButton = li.querySelector('.actions').querySelector('#up')
        upButton.addEventListener('click', ev=>{
            for (var i = 1, len = this.items.length; i < len; i++) {
                if(Object.is(this.items[i], input)){
                    var temp = this.items[i-1]
                    this.items[i-1] = input
                    this.items[i] = temp
                    break
                    //ul.replaceChild(tempUl, ul.childNodes[i])
                }
            }
            this.reprintList()
            console.log(this.items)
        })

        const downButton = li.querySelector('.actions').querySelector('#down')
        downButton.addEventListener('click', ev=>{
            for (var i = 0, len = this.items.length; i < len-1; i++) {
                if(this.items[i]== input){
                    var temp = this.items[i+1]
                    this.items[i] = temp
                    this.items[i+1] = input
                    break
                }
            }
            this.reprintList()
            console.log(this.items)
        })

        const editButton = li.querySelector('.actions').querySelector('#edit')
        editButton.addEventListener('click', this.toggleEditable.bind(this, li, input))
        
        li.addEventListener('keypress', this.saveOnEnter.bind(this, li, input))
        return li
    }

    reprintList(option){
        console.log("Called reprinList")
        const ul = document.getElementById('itemList')
        ul.innerHTML = ""

        this.items.forEach(function(element) {
            console.log(element)
            if(option == "fav"){
                if(element.fav){
                    var listItem = this.renderListItem(element);
                    if(element.fav){
                        listItem.style.backgroundColor = "#6699ff"
                    }
                    this.list.appendChild(listItem)   
                }
            }else{
                var listItem = this.renderListItem(element);
                if(element.fav){
                    listItem.style.backgroundColor = "#6699ff"
                }
                this.list.appendChild(listItem)  
            }
                 
        }, this);

    }

    saveOnEnter(li, input, ev){
        if(ev.key === 'Enter'){
            this.toggleEditable(li, input)
        }
    }

    toggleEditable(li,input,ev){
        console.log(li.querySelector(".itemName").textContent)
        const nameField = li.querySelector('.itemName')
        const dateField = li.querySelector('#dateDisplay')
        const btn = li.querySelector('#edit')
        if(nameField.isContentEditable){
            nameField.contentEditable = false
            dateField.contentEditable = false

            btn.textContent = "✎"

            input.name = nameField.textContent
            input.date  = dateField.textContent
        }else{
            nameField.contentEditable = true
            dateField.contentEditable = true
            nameField.focus()
            btn.textContent = 'save'
        }
    }

    bubbleSort(option){
        if(option == 0){//low to high
            for(var i=0; i<this.items.length; i++){
                for(var j=0; j<this.items.length - 1; j++){
                    if(this.items[j].date > this.items[j+1].date){
                        var temp = this.items[j]
                        this.items[j] = this.items[j+1]
                        this.items[j+1] = temp
                    }
                }
            }
        }else if(option == 1){//high to low
            for(var i=0; i<this.items.length; i++){
                for(var j=0; j<this.items.length - 1; j++){
                    if(this.items[j].date < this.items[j+1].date){
                        var temp = this.items[j]
                        this.items[j] = this.items[j+1]
                        this.items[j+1] = temp
                    }
                }
            }
        }else if(option == 2){//least to greatest
            for(var i=0; i<this.items.length; i++){
                for(var j=0; j<this.items.length - 1; j++){
                    if(this.items[j].name < this.items[j+1].name){
                        var temp = this.items[j]
                        this.items[j] = this.items[j+1]
                        this.items[j+1] = temp
                    }
                }
            }
        }else if(option == 3){//greatest to least
            for(var i=0; i<this.items.length; i++){
                for(var j=0; j<this.items.length - 1; j++){
                    if(this.items[j].name > this.items[j+1].name){
                        var temp = this.items[j]
                        this.items[j] = this.items[j+1]
                        this.items[j+1] = temp
                    }
                }
            }
        }
    }
}

const app = new App({
    formSelector: '#itemForm',
    listSelector: '#itemList',
    templateSelector: '.item.template',
})


app.viewBy()
app.reprintList()