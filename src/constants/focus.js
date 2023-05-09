const FOCUS = [
    {
        display: "General Fitness",
        code: ""
    },
    {
        display: "Bulking",
        code: ""
    },
    {
        display: "Cutting",
        code: ""
    },
    {
        display: "Sport Specific",
        code: ""
    }
];

FOCUS.forEach((focus, index) => {
    if(focus.display.includes(" ")) {
        focus.code = focus.display.split(" ").join("_").toUpperCase();
    }else{
        focus.code = focus.display.toUpperCase();
    }
});

module.exports = FOCUS;