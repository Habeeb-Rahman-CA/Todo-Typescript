const form = document.querySelector<HTMLFormElement>("#form")
const input = document.querySelector<HTMLInputElement>("#input")
const list = document.querySelector<HTMLUListElement>("#list")

//types
type Task = {
  description: string,
  isCompleted: boolean,
}
//load the task from local storage
const tasks: Task[] = loadTask()

tasks.forEach(renderTask) //render the task

//save to local storage
function loadTask(): Task[] {
  const storedTasks = localStorage.getItem('tasks')
  return storedTasks ? JSON.parse(storedTasks) : []
}

// form submit event listener
form?.addEventListener('submit', (e) => {
  e.preventDefault()

  const taskDescription = input?.value //get the value


  if (taskDescription) {
    //check the input is not empty
    const task: Task = {
      description: taskDescription,
      isCompleted: false
    }
    addTask(task)
    renderTask(task)
    updateStorage()
    input.value = ''
    return
  } else {
    alert("Please enter a task")
  }
})

//add the task to task array
function addTask(task: Task): void {
  tasks.push(task)
}

//show the task to the UI
function renderTask(task: Task, index: number = tasks.length - 1): void {
  const taskElement = document.createElement("li")
  taskElement.textContent = task.description

  //checkbox
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
    updateStorage()
  

//delete the task
checkbox.addEventListener('click', () =>{
  deleteTask(index)
  taskElement.remove()
})

  taskElement.appendChild(checkbox)
  list?.appendChild(taskElement)
}

//delete task function
function deleteTask (index: number):void{
  tasks.splice(index, 1)
  updateStorage()
}

//storage update function
function updateStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}