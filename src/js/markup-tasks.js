function createItem({id, title, description}) {
    return `
        <li class="task-list-item" data-item-id="${id}"> 
            <button class="task-list-item-btn">Delete</button>
            <h3>${title}</h3>
            <p>${description}</p>
        </li>
        `
}

function mapItems(arr) {
    return arr.map(createItem).join('\n')
}

export {createItem, mapItems}