import refs from "./refs";
import { getItem, RAW_FORM_DATA_OBJECT, TASKS_LIST_ARR, removeItem, setItem } from "./local-storage-api";
import { nanoid } from 'nanoid'
import { createItem, mapItems } from "./markup-tasks";



refs.addItemForm.addEventListener('input', function (e) {
    const rawFormData = extractFormData(e)
    setItem(RAW_FORM_DATA_OBJECT, rawFormData)
})

refs.addItemForm.addEventListener('submit', function (e) {
    const rawFormData = extractFormData(e)
    
    if(rawFormData.title === '' || rawFormData.description === '') {
        alert('please complete form')
        return;
    }
    
    const submitObject = {
        id: nanoid().trim(),
        title: rawFormData.title.trim(),
        description: rawFormData.description.trim()
    }
    const markup = createItem(submitObject)
    
    const itemListFromLocalStorage = getItem(TASKS_LIST_ARR) ?? []
    setItem(TASKS_LIST_ARR, [...itemListFromLocalStorage, submitObject])

    refs.itemList.insertAdjacentHTML('beforeend', markup)

    removeItem(RAW_FORM_DATA_OBJECT)
    refs.addItemForm.reset()
})

function extractFormData (e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)
    
    const rawFormData = {
        title: formData.get('taskName').trim(),
        description: formData.get('taskDescription').trim(),
    }
    return rawFormData;
}

refs.itemList.addEventListener('click', function (e) {
    if(!e.target.classList.contains('task-list-item-btn')) return;

    const liItem = e.target.closest('.task-list-item')
    
    const liId = liItem.dataset.itemId;
    
    const itemListFromLocalStorage = getItem(TASKS_LIST_ARR) ?? []
    const newList = itemListFromLocalStorage.filter(item => item.id !== liId)

    setItem(TASKS_LIST_ARR, [...newList])
    
    liItem.remove()
})
