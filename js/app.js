import Kanban from "./view/Kanban.js";

new Kanban(
    document.querySelector(".kanban")
);

//import KanbanAPI from "./api/KanbanAPI.js";

// console.log(KanbanAPI.getItems(1));
// console.log(KanbanAPI.insertItem(2, "I am new!"));
// KanbanAPI.updateItem(68707);
// KanbanAPI.updateItem(68707, {
//     columniD: 1,
//     position: 0,
//     content: "I've changed."
// });