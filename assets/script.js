// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordTextArea = document.getElementById("password");
var clearBtn = document.getElementById("clear");

var passwordCriteria = {
    length : 0,
    lowerCase: false,
    upperCase: false,
    numeric: false,
    specialChars: false,
}

//validate number
function isValidNumber(numToTest) {
    if (!numToTest) {
        //cannot be blank
        console.log("no value");
        return false;
    } else if (typeof numToTest != 'number' || Number.isNaN(numToTest)) {
        //must be a number
        console.log('not number');
        return false;
    } else if (numToTest < 8 || numToTest > 128) {
        //must be between 8 and 128 characters
        console.log('wrong length');
        return false;
    }
    return true;
}
//get password length and validate it
function getPasswordLength() {
    var chosenLength = prompt("Please enter the password length (between 8 and 128 characters).");
    if (chosenLength === null){
        return false;
    }
    if (!isValidNumber(+chosenLength)) {
        //not valid so tell user and ask for length again
        alert("Please enter a valid number between 8 and 128 characters.");
        getPasswordLength();
    } else {
        //set password length in passwordCriteria object
        passwordCriteria.length = +chosenLength;
    }   
    console.log("length = " + passwordCriteria.length) ;
    return true;   
}
//ask user if they want uppercase in password and store
//result in passwordCriteria
function getUpperCase() {
    var chosenUppCase = confirm("Would you like to include UPPER CASE characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    if (chosenUppCase) {
        passwordCriteria.upperCase = true;
    } else {
        passwordCriteria.upperCase = false;
    }
    console.log("upper case = " + passwordCriteria.upperCase);
}
//ask user if they want lowercase in password and store
//result in passwordCriteria
function getLowerCase() {
    var chosenLowerCase = confirm("Would you like to include LOWER CASE characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    if (chosenLowerCase) {
        passwordCriteria.lowerCase = true;
    } else {
        passwordCriteria.lowerCase = false;
    }
    console.log("lower case = " + passwordCriteria.lowerCase);
}
//ask user if they want numbers in password and store
//result in passwordCriteria
function getNumeric() {
    var chosenNumeric = confirm("Would you like to include NUMERIC characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    if (chosenNumeric) {
        passwordCriteria.numeric = true;
    } else {
        passwordCriteria.numeric = false;
    }
    console.log("numeric = " + passwordCriteria.numeric);
}

function getSpecialChars() {
    var chosenSpecChars = confirm("Would you like to include SPECIAL characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    if (chosenSpecChars) {
        passwordCriteria.specialChars = true;
    } else {
        passwordCriteria.specialChars = false;
    }
    console.log("spec chars = " + passwordCriteria.specialChars);
}

function getPasswordCriteria() {

    if (getPasswordLength()){
        getUpperCase();
        getLowerCase();
        getNumeric();
        getSpecialChars();
    }
    
    if (!passwordCriteria.lowerCase && !passwordCriteria.upperCase && !passwordCriteria.numeric && !passwordCriteria.specialChars) {
        alert("You must select at least one of lower case, upper case, numeric or special characters.");
        getPasswordCriteria();
    }
    console.log("passwordCriteria = " + passwordCriteria);
}

function generatePassword() {
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var nums = "0123456789";
    var specials = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
    specials = specials.concat('"');
    console.log("specials= " + specials);
    var password = "";
    var i = 0;

    while (i < passwordCriteria.length) {
        if (passwordCriteria.lowerCase) {
            password = password + letters[Math.floor(Math.random() * letters.length)];
            i++;
            console.log("added lowerCase i = " + i);
        }
    
        if (passwordCriteria.upperCase) {
            password = password + letters[Math.floor(Math.random() * letters.length)].toUpperCase();
            i++;
            console.log("added upperCase i = " + i);
        }
    
        if (passwordCriteria.numeric) {
            password = password + nums[Math.floor(Math.random() * nums.length)];
            i++;
            console.log("added numeric i = " + i);
        }

        if (passwordCriteria.specialChars) {
            password = password + specials[Math.floor(Math.random() * specials.length)];
            i++;
            console.log("added special case i = " + i);
        }
    }
    //return password.slice(0, passwordCriteria.length);
    return password;
    
}

// Write password to the #password input
function writePassword() {
    getPasswordCriteria();
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

function copyText() {
    // Get the text field
    var copyText = document.getElementById("password");
    if (copyText.value) {
        // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    alert("Copied password to clip board: " + copyText.value);
    copyText.blur();
    }
  } 

  function clearPassword(){
    document.getElementById("password").value = '';
  }
  

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
passwordTextArea.addEventListener("focus", copyText);
clearBtn.addEventListener("click", clearPassword);
