const RAW_FORM_DATA_OBJECT = 'raw_form_data_object'
const TASKS_LIST_ARR = 'tasks_list_arr'
const CURRENT_THEME = 'current_theme'

function getItem(key) {
    const value = localStorage.getItem(key)
    if (!value) return null

    try {
      return JSON.parse(value)
    } catch (e) {
      return value;
    }
}

function setItem(key, value) {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
}

function removeItem (key) {
    localStorage.removeItem(key)
}

export {setItem, getItem, removeItem, RAW_FORM_DATA_OBJECT, TASKS_LIST_ARR, CURRENT_THEME}