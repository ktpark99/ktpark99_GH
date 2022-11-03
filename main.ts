basic.showIcon(IconNames.Happy)
OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("iptime5G", "01092611378")
basic.forever(function () {
    OLED.clear()
    OLED.writeString("Dust(ug/m3) : ")
    OLED.writeNum(Environment.ReadDust(DigitalPin.P13, AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("Temp(C) : ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("Humidity(0 ~ 100) : ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.setData(
    "FQBXEJCOO4XINOJH",
    Environment.ReadDust(DigitalPin.P13, AnalogPin.P1),
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity)
    )
    ESP8266_IoT.uploadData()
    basic.pause(5000)
})
