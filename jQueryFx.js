/**JQUERY FX */
$(document).ready(function() {
    hasInitRotation = false;
    let hasInitClass = $("#rotateButtonForms").hasClass("initRotation");
    if(hasInitClass==false && hasInitRotation==false)
    {
        $("#rotateButtonForms").addClass("isRotating");
        $("#rotateButtonGame").addClass("isRotating");

        $("#rotateButtonForms").addClass("initRotation");
        $("#rotateButtonGame").addClass("initRotation");
        $("#myForms").slideToggle(500, function(){
            console.log("slide toggle är klar.");
            $("#myForms").hide();
        });
        $("#myGame").slideToggle(500, function(){
            console.log("slide toggle är klar.");
        });
        hasInitRotation=true;
    }

    $("#rotateButtonForms").click(function(){
        let _HasClass = $("#rotateButtonForms").hasClass("isRotating");
        
        if(_HasClass == true){
            $("#myForms").slideToggle(500, function(){
                console.log("slide toggle är klar.");
            });
            $("#myForms").show();
            $("#rotateButtonForms").removeClass("isRotating");
            $("#rotateButtonForms").removeClass("initRotation");
        }else if(_HasClass == false){
            
            $("#myForms").slideToggle(500, function(){
                console.log("slide toggle är klar.");
                $("#rotateButtonForms").removeClass("initRotation");
                $("#myForms").hide();
            });
            $("#rotateButtonForms").addClass("isRotating");
        }
    });


    $("#rotateButtonGame").click(function(){
        let _HasClass = $("#rotateButtonGame").hasClass("isRotating");
        if(_HasClass == true){
            globalCanGameRun=false;
            $("#myGame").slideToggle(500, function(){
                console.log("slide toggle är klar.");
            });
            $("#myGame").show();
            $("#rotateButtonGame").removeClass("isRotating");
            $("#rotateButtonGame").removeClass("initRotation");
        }else if(_HasClass == false){
            globalCanGameRun=true;
            $("#myGame").slideToggle(500, function(){
                console.log("slide toggle är klar.");
                $("#myGame").hide();
                $("#rotateButtonGame").removeClass("initRotation");
            });
            $("#rotateButtonGame").addClass("isRotating");
        }
    });

}); // end ready