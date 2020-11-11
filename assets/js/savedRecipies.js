// for reference
// will get saved recepies from local storage
// then will call them to display in savedRecipies.html

// Call alert to make sure it is connected
//console.log("This work");

function showRecipie () {
    $(".recipieName").on("click", function() {
        let state = $(this).attr("data-state");

        if (state === "hide") {
            //$(".recipie").removeClass("hide");
            $("#recipie" + $(this).attr("target")).hide();
            $(this).attr("data-state", "show");
            
        } else {
            //$(".recipie").addClass("hide");
            //$(".recipie").show();
            $("#recipie" + $(this).attr("target")).show();
            $(this).attr("data-state", "hide");
        }

        // $("#recipie1").removeClass("hide");

        
        // if (state === "still") {
        //     $(this).attr("src", $(this).attr("data-animate"));
        //     $(this).attr("data-state", "animate");
        //   } else {
        //     $(this).attr("src", $(this).attr("data-still"));
        //     $(this).attr("data-state", "still");
        //   }


    });
};

showRecipie();