const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");
// localStrageからJSON形式でデータを取得。
const todos = JSON.parse(localStorage.getItem("todos"));
if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;  // オブジェクトのテキストを渡す。
  }

  //空文字になるとfalse
  if (todoText) {
    const li = document.createElement("li");  //liを生成し代入。
    li.innerText = todoText;  //input.valueの値を代入。
    li.classList.add("list-group-item");  //classListでHTMLのクラスにアクセスしてaddで追加。

    if (todo && todo.completed) {
      li.classList.add("text-decoration-line-through");
    }

    li.addEventListener("contextmenu", function(event) {
      event.preventDefault();  //右クリック時の通常表示メニューを出さない。
      li.remove();
      saveData();
    });

    li.addEventListener("click", function() {
      // クラスを切り替える。
      li.classList.toggle("text-decoration-line-through");
      saveData();
    });

    ul.appendChild(li);  // ulの子要素としてliを追加。
    input.value = "";
    saveData();
  }
}

// データを取得後、ローカルストレージに反映。
function saveData() {
  const lists = document.querySelectorAll("li")  //liタグの全ての要素を取得。
  let todos = [];

  lists.forEach(list => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("text-decoration-line-through")  // 指定クラスがあれば変数completedにtrueを返す。
    };
    todos.push(todo);  // 配列に要素を追加していく（末尾に）
  });
  // JSONに変換 → localStrageは文字列形式で値が格納されているため。
  localStorage.setItem("todos", JSON.stringify(todos));
}