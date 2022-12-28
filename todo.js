var tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter'); 
const remainingCounter = document.getElementById('remaining-task'); 
const doneCounter = document.getElementById('done-tasks-counter');
const deleteAllCompleted=document.getElementById('delete-completed-tasks');
const labelAll=document.getElementById('label-all');
const labelComplete=document.getElementById('label-complete');
const labelUncomplete=document.getElementById('label-uncomplete');

console.log('Working');
// Function to Add Tasks to the dom 
function addTaskToDOM(task){
    const li=document.createElement('li');
    li.innerHTML=`
     
        <input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
        <label for="${task.id}"  style="color:${task.done?'red':'green'}">${task.text}</label>
        <image src="delete.svg" class="delete" data-id="${task.id}"/> 
    `;
    taskList.append(li);
}
//Function to render the list and count all the completed and uncompleted tasks.
function renderList () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++)
    {
        addTaskToDOM(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length; 
    var donecounterall=0;
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].done)
        {
            donecounterall++;
        }
        
    }
    labelAll.style.color="red";
    labelComplete.style.color="rgb(88, 88, 88)";
    labelUncomplete.style.color="rgb(88, 88, 88)";
    doneCounter.innerHTML=donecounterall;
    remainingCounter.innerHTML=tasks.length - donecounterall; 
}
//function to render the completed tasks.
function renderCompleted () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].done==true){
            addTaskToDOM(tasks[i]);
        } 
    } 
    labelAll.style.color="rgb(88, 88, 88)";
    labelComplete.style.color="red";
    labelUncomplete.style.color="rgb(88, 88, 88)"; 
}
//function to render the uncompleted tasks.
function renderUncompleted () {
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++)
    {
        if(tasks[i].done==false){
            addTaskToDOM(tasks[i]);
        } 
    }  
    labelAll.style.color="rgb(88, 88, 88)";
    labelComplete.style.color="rgb(88, 88, 88)";
    labelUncomplete.style.color="red"; 
}
//function to add the mark as complete the tasks completed.
function markTaskAsComplete (taskId) {
    const task=tasks.filter(function(task){
        return task.id===taskId
    });
    if(task.length>0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled successfully !');
        return;
    }
    showNotification('Could not toggle the task !');
}
//here to handle the delete tasks.
function deleteTask (taskId) {
    console.log('entered into delete section',taskId);
    const newTasks=tasks.filter(function(task){ 
        return task.id !== taskId;
    })
    tasks=newTasks;
    renderList();
    showNotification('Task deleted successfully!');
}
//Function to append the tasks to the array and finally call the render function.
function addTask (task) {
    if(task){
        tasks.push(task);
            renderList();
            showNotification('Task added successfully !');
        return;
    }
    showNotification('Task not added successfully !');
}

function showNotification(text) {
    console.log(text);
}
//function to handle the keyinput press.
function handleInputKeypress(e){
    if(e.key=='Enter'){
        const text=e.target.value;
        if(!text){
            showNotification('Task text can not be empty!');
            return;
        }
        const task={
            text,
            id:Date.now().toString(),
            done:false
        }
        e.target.value='';
        addTask(task);
    }
}
//function to handle all the click listners over the container.
function handleClickListener(e){
    const target=e.target;
    console.log(target);
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    } 
    else if(target.className=='deleteAll'){
        console.log("delete called")
        const newTasks=tasks.filter((task)=>{ 
            return task.done !== true;
        }); 
        tasks=newTasks;
        renderList(); 
        console.log(tasks);
        console.log(newTasks);
    }
    else if(target.className=='completeAll'){
        for(let i=0;i<tasks.length;i++)
        {
            if(tasks[i].done==false){
                 tasks[i].done=true;
            } 
        }
        renderList();
    }
    else if(target.className=='all'){
        renderList();
    }
    else if(target.className=="complete"){
        renderCompleted();
    }
    else if(target.className=="uncomplete"){
        renderUncompleted();
    }
    else if(target.className=='custom-checkbox')
    {
        const taskId= target.id;
        markTaskAsComplete(taskId);
        return;
    }
}
addTaskInput.addEventListener('keyup',handleInputKeypress); 
document.addEventListener('click',handleClickListener);

console.log("Developed By :Kamlesh Kumar Bind");