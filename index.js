// Retrieve date for initial message
var d = new Date();
var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Initialize input tag id counter
var inputCounter = 0;

// Initialize directory
var directory = {
    name: "home",
    type: "directory",
    children: [
        {name: "about.txt",
        type: "file",
        data: "about"},
        {name: "blog",
        type: "directory", 
        children: []},
        {name: "contact.txt",
        type: "file", 
        data: "Email: seungb.jun@gmail.com<br>\
        Facebook: <a href=\"https://www.facebook.com/seungbjun\">facebook.com/seungbjun</a><br>\
        Github: <a href=\"https://github.com/seungbjun\">github.com/seungbjun</a><br>\
        Instagram: <a href=\"https://instagram.com/seungbjun\">@seungbjun</a><br>\
        LinkedIn: <a href=\"https://linkedin.com/in/seungbjun\">linkedin.com/in/seungbjun</a>"},
        {name: "welcome.txt",
        type: "file", 
        data: "welcome"}
    ]
}

var masterDirectory = directory
var currentDirectory = directory
var parentDirectory = directory

// Print initial messages
document.getElementById('terminal').innerHTML = ("Last login: " + days[d.getDay()] + " " + months[d.getMonth()] + " " + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + " on ttys000")
getInput(0)

// Get user input
function getInput (clear) {
    if (clear == 1){
        document.getElementById('terminal').innerHTML = ("SeungBJun.github.io:" + currentDirectory.name + " user$ ");
        document.getElementById('terminal').innerHTML += ("<input type=\"text\" id=\"userInput" + inputCounter + "\"/>");
        var input = document.getElementById('userInput' + inputCounter)
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                if (input.value == "") {
                    inputCounter += 1;
                    getInput(0);
                } else {
                    document.getElementById('userInput' + inputCounter).defaultValue = input.value
                    document.getElementById('userInput' + inputCounter).disabled = true;
                    readInput(input);
                }
            }
        });
        input.focus();
        input.select();
    } else {
        document.getElementById('terminal').innerHTML += "<br>"
        document.getElementById('terminal').innerHTML += ("SeungBJun.github.io:" + currentDirectory.name + " user$ ");
        document.getElementById('terminal').innerHTML += ("<input type=\"text\" id=\"userInput" + inputCounter + "\"/>");
        var input = document.getElementById('userInput' + inputCounter)
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                if (input.value == "") {
                    inputCounter += 1;
                    getInput(0);
                } else {
                document.getElementById('userInput' + inputCounter).defaultValue = input.value
                document.getElementById('userInput' + inputCounter).disabled = true;
                readInput(input);
                }
            }
        });
        input.focus();
        input.select();
    }
}

// Read user input
function readInput (input) {
    // Initialize array of valid inputs
    var inputs = ["cat", "cd", "clear", "help", "ls"];

    var splitInput = input.value.split(" ");
    // Check if input is valid
    var correctInput = inputs.indexOf(splitInput[0]);

    // Run if valid
    if (correctInput > -1) {
        switch (splitInput[0]) {
            case "cat":
                cat(splitInput);
                break; 
            case "cd":
                cd(splitInput)
                break;
            case "clear":
                clear();
                break;
            case "help":
                help();
                break;
            case "ls":
                ls();
                break;
        }
    // Run if not valid
    } else {
        if (input != "") {
            document.getElementById('terminal').innerHTML += ("<br>");
            document.getElementById('terminal').innerHTML += ("bash: " + splitInput[0] + ": command not found");
        }
        inputCounter += 1;
        getInput(0);
    }
}

function cat (arr) {
    var child;
    var check;
    document.getElementById('terminal').innerHTML += ("<br>");
    for (child of currentDirectory.children) {
        if (child.name == arr[1]) {
            check = 1;
            break;
        } else {
            check = 0;
        }
    }
    if (check) {
        if (child.type == "directory") {
            document.getElementById('terminal').innerHTML += "cat: " + child.name + " : Is a directory"  
        } else { 
            document.getElementById('terminal').innerHTML += child.data
        }
    } else {
        document.getElementById('terminal').innerHTML += ("bash: cd: " + arr[1] + ": No such file or directory");
    }
    inputCounter += 1;
    getInput(0);
}
function cd (arr) {
    if (arr.length > 1) {
        if (arr[1] == ".") {
            inputCounter += 1;
            getInput(0);
        } else if (arr[1] == "..") {
            parentDirectory = masterDirectory;
            currentDirectory = parentDirectory;
            inputCounter += 1;
            getInput(0);
        } else {
            if (currentDirectory.children.length > 0) {
                // Check file exists
                var child;
                for (child of currentDirectory.children) {
                    if (child.name == arr[1]) {
                        check = 1;
                        break;
                    } else {
                        check = 0;
                    }
                }
                // Run if file exists
                if (check) {
                    if (child.type == "directory") {
                        parentDirectory = currentDirectory;
                        currentDirectory = child;
                        inputCounter += 1;
                        getInput(0);
                    } else {
                        document.getElementById('terminal').innerHTML += ("<br>");
                        document.getElementById('terminal').innerHTML += ("bash: cd: " + arr[1] + ": Not a directory");
                        inputCounter += 1;
                        getInput(0);
                    }
                // Run if file does not exist
                } else {
                    document.getElementById('terminal').innerHTML += ("<br>");
                    document.getElementById('terminal').innerHTML += ("bash: cd: " + arr[1] + ": No such file or directory");
                    inputCounter += 1;
                    getInput(0);
                }
            } else {
                document.getElementById('terminal').innerHTML += ("<br>");
                document.getElementById('terminal').innerHTML += ("bash: cd: " + arr[1] + ": No such file or directory");
                inputCounter += 1;
                getInput(0);
            }             
        }

    } else {
        parentDirectory = masterDirectory;
        currentDirectory = masterDirectory;
        inputCounter += 1;
        getInput(0);
    }
}

function clear () {
    getInput(1);
}

function help() {
    document.getElementById('terminal').innerHTML += ("<br>");
    document.getElementById('terminal').innerHTML += ("cat - view contains of file");
    document.getElementById('terminal').innerHTML += ("<br>");
    document.getElementById('terminal').innerHTML += ("cd (..) - change the working directory");
    document.getElementById('terminal').innerHTML += ("<br>");
    document.getElementById('terminal').innerHTML += ("clear - remove all previous commands and output from window");
    document.getElementById('terminal').innerHTML += ("<br>");
    document.getElementById('terminal').innerHTML += ("help - provide information on built-in commands");
    document.getElementById('terminal').innerHTML += ("<br>");
    document.getElementById('terminal').innerHTML += ("ls - list contents of a directory,");
    inputCounter += 1;
    getInput(0);
}
function ls () {
    if (currentDirectory.children.length > 0) {
        var child;
        document.getElementById('terminal').innerHTML += ("<br>");
        for (child of currentDirectory.children) {
            document.getElementById('terminal').innerHTML += child.name;
            if ((currentDirectory.children.indexOf(child)+1) == currentDirectory.children.length) {
            } else {
                document.getElementById('terminal').innerHTML += ("<br>");
            }
        }
    }
    inputCounter += 1;
    getInput(0);
}

