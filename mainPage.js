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

}

const app = new App({
    formSelector: '#itemForm',
    listSelector: '#itemList',
    templateSelector: '.item.template',
})

app.viewBy()