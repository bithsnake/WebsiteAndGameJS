document.addEventListener("DOMContentLoaded", handler);
localStorage.clear();
function handler(){
//#region UPPGIFT 3 Gissa ett tal

    //#region Varningsbox
    var myTextbox = document.getElementById('gissa_ett_tal_input');
    myTextbox.addEventListener('keypress', checkInput, false);
    /**Kolla input */
    function checkInput(ev) {
        var charCode = ev.charCode;
        if (charCode != 0) {
            if (charCode < 48 || charCode > 57) {
                ev.preventDefault();
            showWarningBox(
                "Du får bara använda siffror." + "\n"
            );
            }
        }
    }

    /**Skapa varningsboxen med en klass och styla den i css */
    var warningTimeout;
    var warningBox = document.createElement("div");
    warningBox.className = "warning";

    function showWarningBox(msg) {
    warningBox.innerHTML = msg;

    if (document.body.contains(warningBox)) {
        window.clearTimeout(warningTimeout);
    } else {
        // insert warningBox after myTextbox
        myTextbox.parentNode.insertBefore(warningBox, myTextbox.nextSibling);
    }

    warningTimeout = window.setTimeout(function() {
        warningBox.parentNode.removeChild(warningBox);
        warningTimeout = -1;
        }, 1200);
    }
    //#endregion

    /**Gissa ett tal */
    let answer = Math.floor(Math.random() * 10 + 1);
    console.log("My number is: " + answer); //Debugging

    let mySubmitButton = document.getElementById("subm1");
    mySubmitButton.addEventListener("click" , handleForm, false); // When clicked, do this

    function handleForm() {
        event.preventDefault();
        clearInterval();

        let numberInputField = document.getElementById("gissa_ett_tal_input");
        let myNumberInput = numberInputField.value;
        console.log(myNumberInput);

        compareAndOutput = function ()
        {
            let myout ="";
            let num = myNumberInput;

            console.log("You guessed : " + myNumberInput);
            if(typeof num == "number")
            {
                if(num > 10)
                {
                    console.log("Inne i > 10 statementet : " + myNumberInput);//Debugging
                    myout =  "Det var för högt!";
                    document.getElementById("output_gissa_ett_tal").style.color = "red";
                }else if(num < 1)
                {
                    console.log("Inne i < 1 statementet : " + myNumberInput);//Debugging
                    myout =  "Det var för lågt!";
                    document.getElementById("output_gissa_ett_tal").style.color = "red";
                } else if(num === answer)
                {
                    console.log("Inne i === statementet : " + myNumberInput);//Debugging
                    myout =  "Ditt svar var helt rätt!";
                    document.getElementById("output_gissa_ett_tal").style.color = "green";
                }
                else if (num != Number(answer)){
                    console.log("Inne i != statementet : " + myNumberInput);//Debugging
                    myout =  "Inte riktigt rätt... försök igen";
                    document.getElementById("output_gissa_ett_tal").style.color = "red";
                }  
            }
            else if (num == ""){
                console.log("Du skrev inte ett nummer : " + myNumberInput);//Debugging
                myout =  "Detta var ingen siffra";
                document.getElementById("output_gissa_ett_tal").style.color = "red";           
            }
            return myout;
        }  
        setTimeout(function(){
            location.reload();} ,2500
        );
        return document.getElementById("output_gissa_ett_tal").innerHTML = compareAndOutput();       
    }
    //#endregion
}