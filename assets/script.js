// Assignment Code
const generateBtn = document.querySelector("#generate");
const passwordTextArea = document.getElementById("password");
const clearBtn = document.getElementById("clear");

//object holds the selected password criteria
let passwordCriteria = {
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
        return false;
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
    const chosenLength = prompt("Please enter the password length (between 8 and 128 characters).");
    //check if user clicked cancel i.e. dont want to proceed
    if (typeof(chosenLength) == "object"){
        return false;
    }
    //check is user entered blank value
    if (chosenLength.length == 0) {
        return getPasswordLength();
    } 
    if (!isValidNumber(+chosenLength)) {
         //not valid so tell user and ask for length again
        return getPasswordLength();
    } 
    //set password length in passwordCriteria object
    passwordCriteria.length = +chosenLength;
    return true;
}     


//Actually get the password criteria details from user
function getPasswordCriteria() {    
    passwordCriteria.upperCase = confirm("Would you like to include UPPER CASE characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    passwordCriteria.lowerCase = confirm("Would you like to include LOWER CASE characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    passwordCriteria.numeric = confirm("Would you like to include NUMERIC characters in the password?\nClick 'OK for yes and 'Cancel' for no.");
    passwordCriteria.specialChars = confirm("Would you like to include SPECIAL characters in the password?\nClick 'OK for yes and 'Cancel' for no.");

    //ensure at least one type of criteria is chosen - otherwise cant generate password
    if (!passwordCriteria.lowerCase && !passwordCriteria.upperCase && !passwordCriteria.numeric && !passwordCriteria.specialChars) {
        alert("You must select at least one of lower case, upper case, numeric or special characters.");
        return getPasswordCriteria();
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
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    let specials = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

    //could not include double quotes in string above so added to 'specials' using append
    specials = specials.concat('"');
    var password = "";
    var i = 0;

    //loop till you reach password length
    //each time through loop check what criteria were chosen and include chosen ones in password
    //this ensures each chosen criteria is included
    while (i < passwordCriteria.length) {
        if (passwordCriteria.lowerCase && i < passwordCriteria.length) {
            password = password + letters[Math.floor(Math.random() * letters.length)];
            i++;
        }
    
        if (passwordCriteria.upperCase && i < passwordCriteria.length) {
            password = password + letters[Math.floor(Math.random() * letters.length)].toUpperCase();
            i++;
        }
    
        if (passwordCriteria.numeric && i < passwordCriteria.length) {
            password = password + nums[Math.floor(Math.random() * nums.length)];
            i++;
        }

        if (passwordCriteria.specialChars && i < passwordCriteria.length) {
            password = password + specials[Math.floor(Math.random() * specials.length)];
            i++;
        }
    }
    //swap order of characters in password - avoids a pattern of lowercase, uppercase, numeric, special
    //based on shuffle function from stackoverflow - Andy E
    password = shuffle(password);
    return password;
    
}

// Write password to the #password input field
function writePassword() {
    const copyText = document.getElementById("copy-text");
    //clear any previous selections
    for (var key in passwordCriteria) {
        delete passwordCriteria[key];
    }

    //check password length before proceeding with other criteria
    //length must be valid and check user did not click cancel i.e dont want to proceed
    if (getPasswordLength()) {
        getPasswordCriteria();
        passwordTextArea.value = generatePassword();
        //just tell user they can copy to clipboard
        copyText.textContent = "Select password to copy it to clipboard."
    }
}

//selects the text in the password field and copies it to the clipboard
//makes it easier to paste somewhere else
function copyText() {
    // Get the text field
    const copyText = document.getElementById("password");
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
    const copyText = document.getElementById("copy-text");
    document.getElementById("password").value = '';
    copyText.textContent = ""
  }
  

// Add event listener to generate password button
generateBtn.addEventListener("click", writePassword);
//Add event listener to password field so password is copied to clipboard if selected
passwordTextArea.addEventListener("focus", copyText);
//Add event listener to clear button to remove password from screen
clearBtn.addEventListener("click", clearPassword);
