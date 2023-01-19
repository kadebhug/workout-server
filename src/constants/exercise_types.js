const EXERCISE_TYPES = [
    {
        display: "Endurance",
        code: ""
    },
    {
        display: "Strength",
        code: ""
    },
    {
        display: "Balance",
        code: ""
    },
    {
        display: "Flexibility",
        code: ""
    }
];

EXERCISE_TYPES.forEach((exerciseType, index) => {
    exerciseType.code = exerciseType.display.toUpperCase()
});

module.exports = EXERCISE_TYPES;