import DropZone from "./DropZone.js";
import KanbanAPI from "../api/KanbanAPI.js";

export default class Item {
    constructor(id, content) {
        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.deleteItem = this.elements.root.querySelector(".kanban__item-delete");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(bottomDropZone);

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

            if (newContent == this.content) {
                return;
            }

            this.content = newContent;
            KanbanAPI.updateItem(id, {
                content: this.content
            });

            console.log(this.content);
            console.log(newContent);
        };

        this.elements.input.addEventListener("blur", onBlur);
         
        this.elements.deleteItem.addEventListener("click", () => {
            const check = confirm("Are you sure you want to delete this item?");

            if (check) {
                KanbanAPI.deleteItem(id);

                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }
        });

        // drag and drop
        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });
        //stop it from adding the id to the text in the note/item
        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }

    static createRoot() {
        const range = document.createRange();
        
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__item" draggable="true">
                <div class="kanban__item-input" contenteditable>
                </div>
                <button type="button" class="kanban__item-delete">X</button>
            </div>
        `).children[0];
    }
}