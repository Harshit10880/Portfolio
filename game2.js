//first create a varible to store element
let boxes = document.querySelectorAll(".box")
let resetbtn = document.querySelector("#reset-btn")
let newbutton = document.querySelector("#newgame")
let newcontainer = document.querySelector(".msg-container")
let mymsg = document.querySelector("#msg")

// give alternate turn of player
let turn = true     // this is for playerX and playerO

// to add wining pattern accroding to box
const winpattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
]

const resetgame = () => {
    turn = true
    enabledbtn()
    newcontainer.classList.add("hide")
}

// to click the box add event listner
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("i am clicked")
        if (turn) {          // if (turn) means its checks the condition is true ? if yes so would execute of next part otherwise else part and set the value of turn
            box.innerHTML = "O"
            turn = false
        }
        else {
            box.innerHTML = "X"
            turn = true
        }
        box.disabled = true     //it means now whenever we touch again same button value can not change again
        checkpattern()
    })
});

const disabledbtn = () => {
    for(let box of boxes) {
        box.disabled = true
    }
}

const enabledbtn = () => {
    for(let box of boxes) {
        box.disabled = false
        box.innerHTML = ""
    }
}

const showwinner = (winner) => {
        mymsg.innerHTML = `congratulatins winner is ${winner}`
        newcontainer.classList.remove("hide")
        disabledbtn()
}

const checkpattern = () => {
    for (let pattern of winpattern) {
        // console.log(pattern)    //it prints the list of winpatterns
        // console.log(pattern[0], pattern[1], pattern[2])     //it gets the index of win patterns
        // console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]])        // it gets the boxes index
        //  console.log(boxes[pattern[0]].innerHTML, boxes[pattern[1]].innerHTML, boxes[pattern[2]].innerHTML)        //it gets what write in the main box like "o" or "x"

        //to store the value in the variable
        let pos1 = boxes[pattern[0]].innerHTML
        let pos2 = boxes[pattern[1]].innerHTML
        let pos3 = boxes[pattern[2]].innerHTML


        if(pos1 != "" && pos2 != "" && pos3 != "") {        // this lines means not any position should empty because wheneever its empty its first step winner
            if(pos1 === pos2 && pos2 === pos3) {
                console.log("winner", pos1)
                showwinner(pos1)
            }
        }
    }
}

newbutton.addEventListener("click", resetgame)
resetbtn.addEventListener("click", resetgame)