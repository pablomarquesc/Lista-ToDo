const inputElement = document.querySelector(".new-task-input");
const addTakButton = document.querySelector(".new-task-button");
const tasksContainer = document.querySelector(".tasks-container");


const validarInput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
    const inputValid = validarInput();

    if(!inputValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");

    deleteItem.addEventListener('click', () => 
        handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    tasksContainer.appendChild(taskItemContainer);

    inputElement.value ="";
    
    updateLocalStorage();
};

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;
    
    for ( const task of tasks){
        if(task.firstChild.isSameNode(taskContent)){
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

    for (const task of tasks){
        if (task.firstChild.isSameNode(taskContent)){
            taskItemContainer.remove();
        }
    }

    updateLocalStorage();
}

const handleInputChange = () => {
    const inputValid = validarInput ();

    if(inputValid) {
        return inputElement.classList.remove("error");
    }
};


const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;

    const localStorageTasks = [...tasks].map(task =>{
        const content = task.firstChild;
        const isCompleted = content.classList.contains("completed")

        return {description: content.innerText, isCompleted };
    });

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
};

const atualizarLocalStorage = () => {
    const taskFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));

    for(const task of taskFromLocalStorage) {
        const taskItemContainer = document.createElement("div");
        taskItemContainer.classList.add("task-item");
    
        const taskContent = document.createElement("p");
        taskContent.innerText = task.description;

        if (task.isCompleted){
            taskContent.classList.add("completed");
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent));
    
        const deleteItem = document.createElement("i");
        deleteItem.classList.add("far");
        deleteItem.classList.add("fa-trash-alt");
    
        deleteItem.addEventListener('click', () => 
            handleDeleteClick(taskItemContainer, taskContent)
        );
    
        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
    
        tasksContainer.appendChild(taskItemContainer);
    }
};

atualizarLocalStorage();

addTakButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());