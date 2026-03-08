import refs from "./refs";
import { getItem, RAW_FORM_DATA_OBJECT, TASKS_LIST_ARR, removeItem, setItem } from "./local-storage-api";
import { nanoid } from 'nanoid'
import { createItem, mapItems } from "./markup-tasks";

document.addEventListener('DOMContentLoaded', function (e) {
    const savedToLocalStorage = getItem(RAW_FORM_DATA_OBJECT)
    refs.addItemForm.elements.taskName.value = savedToLocalStorage?.title ? savedToLocalStorage.title : ''
    refs.addItemForm.elements.taskDescription.value = savedToLocalStorage?.description ? savedToLocalStorage.description : ''

    const itemListFromLocalStorage = getItem(TASKS_LIST_ARR) ?? []

    const markup = mapItems(itemListFromLocalStorage)
    refs.itemList.innerHTML = markup
})

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
        id: nanoid(),
        title: rawFormData.title,
        description: rawFormData.description
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
        title: formData.get('taskName'),
        description: formData.get('taskDescription'),
    }
    return rawFormData;
}
