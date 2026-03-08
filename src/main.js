/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/
import { CURRENT_THEME, getItem, RAW_FORM_DATA_OBJECT, TASKS_LIST_ARR } from './js/local-storage-api'
import { mapItems } from './js/markup-tasks'
import refs from './js/refs'
import './js/tasks'
import './js/theme-switcher'


document.addEventListener('DOMContentLoaded', function (e) {
  const savedToLocalStorage = getItem(RAW_FORM_DATA_OBJECT)
  refs.addItemForm.elements.taskName.value = savedToLocalStorage?.title ? savedToLocalStorage.title.trim() : ''
  refs.addItemForm.elements.taskDescription.value = savedToLocalStorage?.description ? savedToLocalStorage.description.trim() : ''

  const itemListFromLocalStorage = getItem(TASKS_LIST_ARR) ?? []

  const markup = mapItems(itemListFromLocalStorage)
  refs.itemList.innerHTML = markup

  const bodyClasses = refs.body.classList
  
  const themeColor = getItem(CURRENT_THEME) ?? 'theme-dark'
  
  if (bodyClasses.contains('theme-dark')) {
    bodyClasses.replace('theme-dark', themeColor)
  } else {
    bodyClasses.replace('theme-light', themeColor)
  }
})

