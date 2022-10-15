import Column from "./Column.js";

export default class Kanban {
    constructor(root) {
        this.root = root;

        Kanban.columns().forEach(column => {
            // TODO: create an instance of Column class
            const columnView = new Column(column.id, column.title);

            this.root.appendChild(columnView.elements.root);
        });
    }

    static columns() {
        return [
            {
                id: 1,
                title: "Not Started"
            },
            {
                id: 2,
                title: "In Progress"
            },
            {
                id: 3,
                title: "Completed"
            }
        ];
    }
}

// the "root" refers to the div in the index.html of class "kanban"
// user interface 38:24 - 