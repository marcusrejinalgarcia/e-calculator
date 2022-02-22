let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");

const calculator = {
    numString: "",
    zeroFlag: true,
    decimalFlag: true,
    operationFlag: false,
    finishFlag: false,

    // Methods
    addDigit(a) {
        console.log(display2.value)
        // reinitialize if number is typed when not empty
        if(this.finishFlag) {
            this.clearAll();
        };
    
        // prevents 0 from being added if numArray is empty
        if(!(this.zeroFlag == false && a == 0)) {
            display1.value += a; // add digit to display
            if(display1.value.slice(-1) == 0 && this.decimalFlag == true) this.zeroFlag = false;
        };
        if(this.operationFlag) this.compute();
    },
    addDecimal() {
        if(this.decimalFlag == true) {
            this.numString += ".";
            display1.value += ".";
            this.zeroFlag = true;
            this.decimalFlag = false;
        }
    },
    operation(op) {
        if(this.finishFlag) {
            display1.value = display2.value;
            display2.value = "";
        }
        if(this.opCheck()) {
            this.delete();
        }
        display1.value += ` ${op} `;
        display2.value = "";
        this.zeroFlag = true;
        this.decimalFlag = true;
        this.operationFlag = true;
        this.finishFlag = false;
    },
    percent() {
        if(!isNaN(parseInt(display1.value.slice(-1)))) display1.value += "% ";
        this.operationFlag = true;
        this.compute();
    },

    compute() {
        if(display1.value == "") return null;

        this.numString = display1.value.replace("%", " / 100");
        if(this.numString.slice(-3, -2) == "/" && this.numString.slice(-1) == 0) {
            console.log("error")
            display2.value = "Error";
            return 0;
        }
        // GUMAGAMIT NG eval()
        // WAG TULARAN
        ans = eval(this.numString);
        display2.value = ans;
    },

    opCheck() {
        switch (display1.value.slice(-2, -1)) {
            case "+":
            case "-":
            case "*":
            case "/":
                return true;

            default:
                return false;
        }
    },

    equals() {
        this.compute();
        this.finishFlag = true;
        display1.value = "";
    },

    delete() {
        if(this.opCheck()) {
            display1.value = display1.value.slice(0, -3)
        }
        else {
            display1.value = display1.value.slice(0, -1)
        }

        display2.value = "";
        if(display1.value.includes("+") || display1.value.includes("-") || display1.value.includes("*") || display1.value.includes("/")) this.operationFlag = true;
        else this.operationFlag = false;
        if(this.operationFlag) this.compute();
    },

    clearAll() {
        display1.value = "";
        display2.value = "";
        this.numString = "";
        this.zeroFlag = true;
        this.operationFlag = false;
        this.decimalFlag = true;
        this.finishFlag = false;
    },

}

let digits = document.getElementsByClassName("digit");
for(let i = 0; i < digits.length; i++) {
    digits[i].addEventListener("click", () => calculator.addDigit(digits[i].value));
}

// let operations = document.getElementsByClassName("op");
// for(oper of operations) {
//     oper.addEventListener("click", () => calculator.operation(oper.value));
// }

document.getElementById("btn-add").addEventListener("click", () => calculator.operation("+"));
document.getElementById("btn-sub").addEventListener("click", () => calculator.operation("-"));
document.getElementById("btn-mul").addEventListener("click", () => calculator.operation("*"));
document.getElementById("btn-div").addEventListener("click", () => calculator.operation("/"));

document.getElementById("btn-pc").addEventListener("click", () => calculator.percent());

document.getElementById("btn-dec").addEventListener("click", () => calculator.addDecimal());

document.getElementById("btn-eq").addEventListener("click", () => calculator.equals());

document.getElementById("btn-del").addEventListener("click", () => calculator.delete())

document.getElementById("btn-ac").addEventListener("click", () => calculator.clearAll())