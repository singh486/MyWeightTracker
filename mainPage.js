class App{
    constructor(selectors){
        this.items = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)

        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })


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
                case "Favorites":
                    this.reprintList("fav")
                    break
            }
        })
    }

    handleSubmit(ev){
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
            this.items.splice(this.items.indexOf(input), 1)
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
        const ul = document.getElementById('itemList')
        ul.innerHTML = ""

        this.items.forEach(function(element) {
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


}

const app = new App({
    formSelector: '#itemForm',
    listSelector: '#itemList',
    templateSelector: '.item.template',
})

app.viewBy()