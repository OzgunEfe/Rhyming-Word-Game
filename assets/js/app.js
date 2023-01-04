

$(".start-game").click(function() {
    $(".title").addClass("hide")
    $(".explanation").addClass("hide")
    $("button").addClass("hide")

    $(".word-section").append(`
    <p>Your word is "Dog"</p>
    `)

    $(".text-area-section").append(`
    <textarea name="textarea" id="text-area" cols="50" rows="10"></textarea>
    `)

    $(".submit-btn").append(`
    <button>Submit</button>
    `)

    $(".timer").append(`
    <p>Time: 20</p>
    `)
});