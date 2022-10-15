import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js";

export default class Column {
    constructor(id, title) {
        const topDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            //TODO: add item
            const newItem = KanbanAPI.insertItem(id, "");

            this.renderItem(newItem);
            // resume at 57:42 at this time, column 3 does not appear to exist -- fixed by adding column data to Local Storage
        });

        KanbanAPI.getItems(id).forEach(item => {
            //console.log(item);
            this.renderItem(item);
        });
    }

    //return an HTML element as an object containing the basic structure for a particular column
    static createRoot() {
        const range = document.createRange();
        
        range.selectNode(document.body);

        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-title"></div>
                <div class="kanban__column-items"></div>
                <button class="kanban__add-item" type="button">+ Add</button>
            </div>
        `).children[0];
    }

    renderItem(data) {
        // TODO: create Item instance
        const item = new Item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);
    }
}

// this class represents a single column in the user interface
// "range" is just a thing for creating HTML stuff in JavaScript