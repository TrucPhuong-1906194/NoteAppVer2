const notesContainer = document.querySelector(".notes-container");  //notesContainer: Lấy phần tử có class "notes-container" – nơi chứa các ghi chú.
const createBtn = document.querySelector(".btn");                   //createBtn: Lấy nút có class "btn" (tạo)
const completeBtn = document.querySelector(".buttons");             //completeBtn: Lấy nút có class "buttons" (complete)
let notes = document.querySelectorAll(".input-box");                //notes: Lấy tất cả các phần tử có class "inpux-box" – các ghi chú hiện có. 

function showNotes(){
    notesContainer.innerHTML = localStorage.getItem("notes") || "" ; //prevent null issues with "" Nếu không có dữ liệu
}
showNotes()                                                          //Hiển thị các ghi chú ngay khi tải trang 

function updateStorage(){
    localStorage.setItem("notes", notesContainer.innerHTML);         //lưu dưới tên notes và update trong browser; Lưu toàn bộ nội dung của notesContainer dưới dạng chuỗi HTML.
}   

createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    let tick = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable","true");
    img.src = "delete.png";
    img.classList.add("delete-icon");

    notesContainer.appendChild(inputBox).appendChild(img);          //This ensures that the delete image appears inside the text box. img trong inputBox trong container 

    tick.src = "checked.jpg";                                // Use the uploaded tick image
    tick.classList.add("tick-icon");
    tick.style.display = "none";                                    // Hide tick initially

    inputBox.appendChild(tick);                                     //Đưa dấu tick vào trong ghi chú.
    inputBox.appendChild(img);                                      //Đưa ảnh xóa vào trong ghi chú.
    notesContainer.appendChild(inputBox);                           //Thêm ghi chú vào danh sách.
    updateStorage();
});

completeBtn.addEventListener("click", () => {
    document.querySelectorAll(".tick-icon").forEach((tick) => {
        tick.style.display = "block";                               // Show tick when "Complete" is clicked, Khi bấm vào nút "Complete", tất cả ảnh tick (.tick-icon) sẽ hiện lên.
    });
});


notesContainer.addEventListener("click", function(e) {              //Xóa ghi chú khi nhấn vào ảnh delete
    if (e.target.classList.contains("delete-icon")) {
        e.target.parentElement.remove();
        updateStorage();
    } 

    else if (e.target.classList.contains("tick-icon")) {            //Ẩn dấu tick khi bấm
        e.target.style.display = "none";                            // Hide tick when clicked
    } 

    else if(e.target.tagName === "P") {                             //Kiểm tra local storage có chứa gì, khi reload trang sẽ tự update và thể hiện nội dung dưới dạng note
        notes = document.querySelectorAll(".input-box");
        notes.forEach((nt) => { //notes riêng biệt, không giới hạn
            nt.onkeyup = function() {
                updateStorage();
            }
        })
    }
});

document.addEventListener("keydown", event =>{                      //nó sẽ hoạt động như chức năng Enter trên keyboard
    if(event.key === "Enter"){
        document.execCommand("insertLineBreak");                    //Thêm 1 line break trong p, hoạt động tương tự <br>
        event.preventDefault();                                     //Hạn chế default hoạt động dẫn đến tạo thẻ p khi xuống dòng
    }
})

// Mở rộng //

let toastBox = document.getElementById('toastBox');
let successMsg = '<i class="fa-solid fa-heart"></i> Successfully completed! Please delete notes if necessary!'

function showToast(msg){
    let toast = document.createElement('div');                      //Create HTML element with div type
    toast.classList.add('toast');                                   //add 1 class name 'toast'
    toast.innerHTML = msg;                                          //add some content
    toastBox.appendChild(toast);                                    //display the new div inside this box

    setTimeout(()=>{                                                //remove the toast notification after millionseconds
        toast.remove();
    },3000)
}
