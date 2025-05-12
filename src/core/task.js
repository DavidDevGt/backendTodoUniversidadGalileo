const TaskModel = {
    "name": "Task",
    "properties": {
        "id": {
            "type": "number",
            "required": true,
            "unique": true
        },
        "title": {
            "type": "string",
            "required": true
        },
        "dueDate": {
            "type": "date",
            "required": true
        },
        "description": {
            "type": "string",
            "required": true
        },
        "createdAt": {
            "type": "date",
            "required": true
        },
        "completed": {
            "type": "boolean",
            "required": true
        }
    }
}

module.exports = TaskModel
