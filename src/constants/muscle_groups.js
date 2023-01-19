const MUSCLE_GROUPS = [
    {
        display: "Hamstrings",
        code: ""
    },
    {
        display: "Calves",
        code: ""
    },
    {
        display: "Chest",
        code: ""
    },
    {
        display: "Back",
        code: ""
    },
    {
        display: "Shoulders",
        code: ""
    },
    {
        display: "Biceps",
        code: ""
    },
    {
        display: "Shoulders",
        code: ""
    },
    {
        display: "Forearms",
        code: ""
    },
    {
        display: "Trapezius",
        code: ""
    },
    {
        display: "Abs",
        code: ""
    },
];

MUSCLE_GROUPS.forEach((muscleGroup, index) => {
    muscleGroup.code = muscleGroup.display.toUpperCase()
});

module.exports = MUSCLE_GROUPS;