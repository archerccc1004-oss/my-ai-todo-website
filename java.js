//1. 傳送某一段話給控制台
console.log('Javascript已連結,準備進行互動...');

//2. 詢問使用者的姓名
let visitorname = prompt('你好，我是你的助理，請問我應該要怎麼稱呼您:');

if(visitorname === '' || visitorname === null){
    visitorname = '訪客'
}
window.alert('Hello '+ visitorname + ',歡迎來到我的網站!');

const logoelement = document.getElementById('main-logo')
logoelement.innerText = visitorname +"'s Website";

const titleElement = document.getElementById('hero-title');
titleElement.innerHTML =`我的未來，由<span class="highlight">${visitorname}</span>主宰`;

function changeColor (){
    const highlight = document.querySelector('.highlight');
    if (highlight.style.color === 'red'){
        highlight.style.color = '#38bdf8';
    } else {
        highlight.style.color = 'red';
    }
}

const SendBtn = document.getElementById('send-btn')
const userInput = document.getElementById('user-input')
const aiResponse = document.getElementById('ai-response')

SendBtn.addEventListener('click', function(){
    const userMessage = userInput.value;

    if(userMessage===""){
        alert('請先輸入指令唷!')
        return;
    }
    
    setTimeout(function(){
    if (userMessage.includes("你好") || userMessage.includes("哈囉")){
        aiResponse.innerText="AI 助理:你好呀~今天過得還好嗎?";
    }else if(userMessage.includes("功能") || userMessage.includes("做什麼")){
        aiResponse.innerText="AI 助理:我可以陪你聊天、幫你換標題的顏色!";
    }else if(userMessage.includes("學校") || userMessage.includes("東吳")){
        aiResponse.innerText="AI 助理:東吳大學是一個學習網頁設計最棒的地方!";
    }else if(userMessage.includes("淺色") || userMessage.includes("白天")){
        document.body.className = "theme-light";
        aiResponse.innerText="AI 助理:你好呀~今天過得還好嗎?";
    }else if(userMessage.includes("綠色") || userMessage.includes("駭客")){
        document.body.className = "theme-matrix";
        aiResponse.innerText="AI 助理:已啟動駭客矩陣模式";
    }else if(userMessage.includes("深色") || userMessage.includes("晚上")){
        document.body.className = "";
        aiResponse.innerText="AI 助理:已為您恢復至預設深色模式";
    }else if(userMessage.startsWith("新增代辦|")){

    const parts = userMessage.split("|");

    if(parts.length >= 3){

        const task = parts[1].trim();
        const time = parts[2].trim();

        document.getElementById("todo-input").value = task;
        document.getElementById("todo-time").value = time;

        addTodo();

        aiResponse.innerText =
        `AI 助理:已新增代辦事項「${task}」，提醒時間為 ${time}`;

    }else{

        aiResponse.innerText =
        "AI 助理:格式錯誤，請輸入：新增代辦|事項|日期時間";

    }

}else {
        aiResponse.innerText="AI 助理:我收到你的訊息「" + userMessage + "」了!不過我目前還沒開通這樣的功能~";
    }

    userInput.value =""
},300);
});

function notifyUser(task, time){
    if(Notification.permission === "granted"){
        new Notification("Reminder",{ body: `Time for: ${task} at ${time}`});
    }
}

function scheduleReminder(task, time){
    const now = new Date();
    const reminderTime = new Date(time);
    const delay = reminderTime - now;

    if(delay>0){
        setTimeout(() => notifyUser(task, time), delay);
    }
}

function addTodo(){
    const input = document.getElementById('todo-input');
    const timeInput = document.getElementById('todo-time');
    const newTodoText = input.value.trim();
    const reminderTime = timeInput.value;


    if (newTodoText !==''){
    const li = document.createElement('li');
    li.className = 'todo-item';

    const textSpan = document.createElement('span')
    textSpan.textContent = newTodoText;

    const timeSpan = document.createElement('span')
    timeSpan.textContent = reminderTime ? `提醒時間與日期: ${new Date(reminderTime)}`:'沒有設定提醒時間';

    li.appendChild(textSpan);
    li.appendChild(timeSpan);

    li.onclick = function(){
       this.classList.toggle('completed')
    };

    li.ondblclick = function(){
        this.remove();
    };

    document.getElementById('todo-list').appendChild(li);
    input.value ='';
    timeInput.value ='';

    if(reminderTime){
        scheduleReminder(newTodoText, reminderTime);
    }
}
}

