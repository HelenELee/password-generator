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
        return falsse;
    } else if (typeof numToTest != 'number' || Number.isNaN(numToTest)) {
        //must be a number
        return false;
    } else if (numToTest < 8 || numToTest > 128) {
        //must be between 8 and 128 characters
        return false;
    }
    return true;
}

//get password length and validate it
function getPasswordLength() {
    var chosenLength = prompt("Please enter the password length (between 8 and 128 characters).");
    if (chosenLength != null){
        if (!isValidNumber(+chosenLength)) {
            //not valid so tell user and ask for length again
            alert("Please enter a valid number between 8 and 128 characters.");
            getPasswordLength();
        } else {
            //set password length in passwordCriteria object
            passwordCriteria.length = +chosenLength;
        }   
        return true;    
    }
    return false;
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
}

//ask user if they want special characters in password and store
//result in passwordCriteria
function getSpecialChars() {
    var chosenSpecChars = confirm("Would you like to include SPECIAL characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    if (chosenSpecChars) {
        passwordCriteria.specialChars = true;
    } else {
        passwordCriteria.specialChars = false;
    }
}

//Actually get the password criteria details from user
function getPasswordCriteria() {
    //clear any previous selections
    for (var key in passwordCriteria) {
          delete passwordCriteria[key];
    }

//only proceed with other criteria if password length passes validation
    if (getPasswordLength()){
        getUpperCase();
        getLowerCase();
        getNumeric();
        getSpecialChars();

        //ensure at least one type of criteria is chosen - otherwise cat generate password
        if (!passwordCriteria.lowerCase && !passwordCriteria.upperCase && !passwordCriteria.numeric && !passwordCriteria.specialChars) {
            alert("You must select at least one of lower case, upper case, numeric or special characters.");
            getPasswordCriteria();
        }
    }
    
}

//swap order of characters in password
//avoids a pattern of lowercase, uppercase, numeric, special
function shuffle(strOrig) {
    var strArray = strOrig.split("");
    var arrayLength = strArray.length;

    for(var i = arrayLength - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = strArray[i];
        strArray[i] = strArray[j];
        strArray[j] = tmp;
    }
    return strArray.join("");
}


//generate password ensuring all chosen criteria are included in password
function generatePassword() {
    //set up variables for use when generating password
    var letters = "abcdefghijklmnopqrstuvwxyz";
    var nums = "0123456789";
    var specials = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

    //could not include double quotes in string above so added to 'speccials' using append
    specials = specials.concat('"');
    var password = "";
    var i = 0;

    //loop till you reach password length
    //each time through loop check what criteria were chosen and include chosen ones in password
    //this ensures each chosen criteria is included
    while (i < passwordCriteria.length) {
        if (passwordCriteria.lowerCase) {
            password = password + letters[Math.floor(Math.random() * letters.length)];
            i++;
        }
    
        if (passwordCriteria.upperCase) {
            password = password + letters[Math.floor(Math.random() * letters.length)].toUpperCase();
            i++;
        }
    
        if (passwordCriteria.numeric) {
            password = password + nums[Math.floor(Math.random() * nums.length)];
            i++;
        }

        if (passwordCriteria.specialChars) {
            password = password + specials[Math.floor(Math.random() * specials.length)];
            i++;
        }
    }
    //swap order of characters in password - avoids a pattern of lowercase, uppercase, numeric, special
    //also slice off at chosen password length as password may be longer than requested at this stage
    //because increment i several times in while loop above
    password = shuffle(password.slice(0, passwordCriteria.length));
    return password;
    
}

// Write password to the #password input field
function writePassword() {
    var password;
    var passwordText = document.querySelector("#password");
    var copyText = document.getElementById("copy-text");
    getPasswordCriteria();
    password = generatePassword();
    passwordText.value = password;
    copyText.textContent = "Select password to copy it to clipboard."

}

//selects the text in the password field and copies it to the clipboard
//makes it easier to paste somewhere else
function copyText() {
    // Get the text field
    var copyText = document.getElementById("password");
    if (copyText.value) {
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 128); // For mobile devices limit to max password length
  
        // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
  
        // Alert the copied text
        alert("Copied password to clip board: " + copyText.value);
        copyText.blur();
    }
  } 

  //clear password if user does not want it displayed on screen anymore
  function clearPassword(){
    var copyText = document.getElementById("copy-text");
    document.getElementById("password").value = '';
    copyText.textContent = ""
  }
  

// Add event listener to generate password button
generateBtn.addEventListener("click", writePassword);
//Add event listener to password field so password is copied to clipboard if selected
passwordTextArea.addEventListener("focus", copyText);
//Add event listener to clear button to remove password from screen
clearBtn.addEventListener("click", clearPassword);
