$(function(){
    /*REGEX Setup */
    let isName = /([A-Z])\w$/i;
    let isZipCode = /^[0-9]{5}$/;
    let isMailadress = /^\w+@\w+\.(net|com|se|org|nu)$/i;
    let isPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[:;<>,.?/~_+-=|]).{10,14}$/gi;
    /*REGEX Setup */


    /*Rövarspråket*/
    $("#subm_rovar").on("click", function(){
        $( "form" ).submit (function(e){
            e.preventDefault();
    
            let input = $("#rovarspraket_input").val();
            $("#output_rovarspraket").html(input);
            VokalOchKonsonant(input);
            function VokalOchKonsonant(x)
            {
                resultat="";    
                for(var i=0; i < x.length;i++){
                    if(x[i]==='b'||x[i]==='c'||x[i]==='d'||x[i]==='f'||x[i]==='g'||x[i]==='h'||x[i]==='j'||x[i]==='k'||x[i]==='l'||x[i]==='m'||
                    x[i]==='n'||x[i]==='p'||x[i]==='q'||x[i]==='r'||x[i]==='s'||x[i]==='t'||x[i]==='v'||x[i]==='z'||x[i]==='x'){
                        var str = x[i].charAt(0);
                        resultat += str.concat('o' + str.toLowerCase());
                    }else{
                        var str = x[i].charAt(0);
                        resultat += x[i];
                    }
                }
                return $("#output_rovarspraket").html(resultat);
            }
        });
    });
    
    let firstname = $("#fname_field").val();
    let lastname = $("#lname_field").val();
    let zipcode = $("#zipcode_field").val();
    let mailadress = $("#mailadress_field").val();
    let password = $("#password_field").val();
    let notifyTimer;
    // let coolDown = 200;
    
    var arr = [firstname,lastname,zipcode,mailadress,password];
    
    /*testing init*/
    console.log(isName.test(firstname));
    console.log(isName.test(lastname));
    console.log(isZipCode.test(zipcode));
    console.log(isMailadress.test(mailadress));
    console.log(isPassword.test(password));
    
    
    /**Change border color on focus */
    $("input").focus(function() {
        
        $(this).css("outline", "none").css("border-style",
        "dotted").css("border-color", "darkgray");
        })
    
        .blur(function() {
        $(this).css("border-style", "solid").css("border-color",
        "lightskyblue");
    });

    
    /**Function setup */  
    let CheckName = function(){
        /**First name */
        $("#fname_field").keyup(function(){
            arr[0] = this.value;
            // arr[0] = firstname;

            if(isName.test(arr[0])==false){
                $("#fname_error").html("Ditt förnamn måste innehålla minst 2 bokstäver och inga mellanslag.");
                notifyTimer = setTimeout(function(){
                    $("#fname_error").html("");} ,2000
                );
            }else{
                $("#fname_error").html("");
            }
        }),

        $("#fname_field").change(function(){

            if(isName.test(arr[0])==false){
                $("#fname_error").html("Ditt förnamn måste innehålla minst 2 bokstäver och inga mellanslag.");
            }else{
                $("#fname_error").html("");
            }
            console.log("is a valid first name: " + isName.test(arr[0]));
        }),

        $("#fname_field").keydown(function(){
            $("#fname_error").html("");
            clearTimeout(notifyTimer);  
        }),

        /**Last name */
        $("#lname_field").keyup(function(){
            arr[1] = this.value;
            // arr[1] = lastname;
            console.log("first name test: " + isName.test(arr[1]));

            if(isName.test(arr[1])==false){
                $("#lname_error").html("Ditt efternamn måste innehålla minst 2 bokstäver och inga mellanslag.");
                notifyTimer = setTimeout(function(){
                    $("#lname_error").html("");} ,2000
                );
            } else{
                $("#lname_error").html("");
            }
        }),

        $("#lname_field").change(function(){
       
            if(isName.test(arr[0])==false){
                $("#lname_error").html("Ditt efternamn måste innehålla minst 2 bokstäver och inga mellanslag.");
            }else{
                $("#lname_error").html("");
            }
            console.log("is a valid last name: " + isName.test(arr[1]));
        }),
    
        $("#lname_field").keydown(function(){
            $("#lname_error").html("");
            clearTimeout(notifyTimer);  
        });
    
    }
    
    let CheckZipCode = function() {

        $("#zipcode_field").keyup(function(){
            arr[2] = this.value;
            if(isZipCode.test(arr[2])==false){
                $("#zipcode_error").html("Ditt postnummer måste innehålla 5 siffror utan mellanslag.");
                notifyTimer = setTimeout(function(){
                    $("#zipcode_error").html("");} ,2000
                );
            } 
        }),

        $("#zipcode_field").change(function(){
            // zipcode = this.value;

            if(isZipCode.test(arr[2])==false){
                $("#zipcode_error").html("Ditt postnummer måste innehålla 5 siffror utan mellanslag.");
            }else{
                $("#zipcode_error").html("");
            }
            console.log("is a valid zipcode number: " + isZipCode.test(arr[2]));
        });

        $("#zipcode_field").keydown(function(){
            $("#zipcode_error").html("");
            clearTimeout(notifyTimer);  
        });
    }
    
    let CheckMailadress = function(){
        $("#mailadress_field").change(function(){
            if(isMailadress.test(arr[3])==false){
                $("#mailadress_error").html("Din mailadress måste inhehålla (a-Ö) innan @ och därefter ett domänamn.");
                notifyTimer = setTimeout(function(){
                    $("#mailadress_error").html("");} ,2000
                );
            }else{
                $("#mailadress_error").html("");
            }
            console.log("is a valid mailadress: " + isMailadress.test(arr[3]));
        }),
    
        $("#mailadress_field").keyup(function(){
            arr[3] = this.value;
        }),

        $("#mailadress_field").keydown(function(){
            $("#mailadress_error").html("");
            clearTimeout(notifyTimer);  
        });
    }
    
    let CheckPassword = function(){
        $("#password_field").keyup(function(){
            arr[4] = this.value;
            console.log("is a valid password: " + isPassword.test(arr[4]));
            
            console.log("password: " + password);
            console.log("arr[4]: " + arr[4]);
        }),
        
        $("#password_field").change(function(){
            console.log("is a valid password: " + isPassword.test(arr[4]));
            if(isPassword.test(arr[4])==false){
                $("#password_error").html("Ditt lösenord måste vara mellan 10 - 14 tecken och innehålla (a-Ö) och alfanumeriska tecken.");
                setTimeout(function(){
                    $("#password_error").html("");} ,2000
                );
            }
        });

        $("#password_field").keydown(function(){
            $("#password_error").html("");
            clearTimeout(notifyTimer); 

    });   
    }

    CheckName();
    CheckZipCode();
    CheckMailadress();
    CheckPassword();

    $("#subm_formular").on("click", function(){
        $( "form" ).submit (function(e){
            e.preventDefault();
            console.log("is a valid first name: " + isName.test(arr[0]));
            console.log("is a valid lastname: " + isName.test(arr[1]));
            console.log("is a valid zipcode: " + isZipCode.test(arr[2]));
            console.log("is a valid email aderss: " + isMailadress.test(arr[3]));
            console.log("is a valid password: " + isPassword.test(arr[4]));

            let _newarr = [isName.test(arr[0]),isName.test(arr[1]),isZipCode.test(arr[2]),isMailadress.test(arr[3]),isPassword.test(arr[4])];
    
            for (let i = 0; i < _newarr.length; i++) {
                if(_newarr[i] == true){
                    console.log("Every index in array has the value of: " + _newarr);
                    console.log("All values has passed test, can send form");
                    $("#formular_output").html("Tack! Formuläret är skickat!").css("display","flex");
                    setTimeout(function(){
                        $("#formular_output").html("").css("display","none");;} ,2000
                    );
                    return;
                }else{
                    $("#formular_output").html("Du har nog missat något i formuläret!").css("display","flex");
                    setTimeout(function(){
                        $("#formular_output").html("").css("display","none");} ,2000
                    );
                    return;               
                }   
            }  
        });
    });
    
    });// End Script