$(document).ready(function() {
    $("#zipDiv").hide();
    $("#otherDiv").hide();
    $(document).on("click", ".nextButton", function() {
        event.preventDefault();
        $(this).parent("div").next("div").show();
        $(this).parent("div").hide();
    })
})