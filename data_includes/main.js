PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// First show instructions, then experiment trials, send results and show end screen
Sequence("consent","instructions", shuffle(randomize("maintrial")), SendResults(), "end")

// Instructions

///// consent form
newTrial("consent",
    newHtml("consent_form", "consent.html")
        .checkboxWarning("You must consent before continuing.")
        .print()
    ,
    newButton("continue", "Click to continue to instructions")
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
).setOption("hideProgressBar", true)



newTrial("instructions",
     // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newText("Welcome!")
    ,
    newText("In this task, you will have to read few sentences.")
    ,
    newText("Are you ready?")
    ,
    newButton("Start")
        .center()
        .print()
)

// First experiment trial
Template("stimuli.csv", row =>
    newTrial("maintrial",
     newText("instructions", "Click on the button below to start reading. Click spacebar to proceed to the next word.")
        .print()
    ,
    newButton("Start reading")
        .print()
        .wait()
        .remove()
    ,
    getText("instructions")
        .remove()
    ,
    newText("question",row.question)
        .print()
    ,
    // We use the native-Ibex "DashedSentence" controller
    // Documentation at:   https://github.com/addrummond/ibex/blob/master/docs/manual.md#dashedsentence
    newController("DashedSentence", {s : row.stimulus})
        .print()
        .log()      // Make sure to log the participant's progress
        .wait()
        .remove()
    ,
    newText("tobe added","somewhere here should go the question answering controller").print()
    ,
    newButton("Next item please!")
        .print()
        .wait()
)
.log("group", row.group)
.log("condition",row.condition)
.log("item_no",row.item_no)
.log("stimulus",row.stimulus)
.log("question",row.question)
)

newTrial("end",
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This link a placeholder: replace it with a URL provided by your participant-pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
)
.setOption("countsForProgressBar",false)