const GoalModel = {
    "name": "Goal",
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
        "targetDate": {
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

module.exports = GoalModel
