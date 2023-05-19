datalogger.onLogFull(function () {
    Enregistrement = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    Enregistrement = !(Enregistrement)
    if (Enregistrement) {
        basic.showIcon(IconNames.Yes)
    } else {
        basic.showIcon(IconNames.No)
    }
})
let TemperatureI2C = 0
let Enregistrement = false
let Etat_chauffage = 0
Enregistrement = false
datalogger.setColumnTitles(
"TempI2C",
"EtatChauffage"
)
let _4Digit = grove.createDisplay(DigitalPin.P1, DigitalPin.P15)
_4Digit.point(true)
loops.everyInterval(10000, function () {
    TemperatureI2C = grove.aht20ReadTemperatureC()
    if (TemperatureI2C < 26) {
        pins.digitalWritePin(DigitalPin.P0, 1)
        Etat_chauffage = 1
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
        Etat_chauffage = 0
    }
    _4Digit.clear()
    _4Digit.show(TemperatureI2C * 100)
    if (Enregistrement) {
        datalogger.log(
        datalogger.createCV("TempI2C", TemperatureI2C),
        datalogger.createCV("EtatChauffage", Etat_chauffage)
        )
    }
})
