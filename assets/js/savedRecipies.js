// for reference
// will get saved recepies from local storage
// then will call them to display in savedRecipies.html


// Function to show or hide recipie
function showRecipie() {
    $(".recipieName").on("click", function () {
        let state = $(this).attr("data-state");

        if (state === "hide") {
            $("#recipie" + $(this).attr("target")).hide();
            $(this).attr("data-state", "show");
        } else {
            $("#recipie" + $(this).attr("target")).show();
            $(this).attr("data-state", "hide");
        }

    });
};

// call function
showRecipie();