import {fetchStateIndex, mapEntity} from "./HomeAssistant.js";

export async function getPrinter() {
    const printer = window.PRINTER;
    if (!printer) {
        return null;
    }

    const byId = await fetchStateIndex();

    const powerEntity = byId.get(printer.powerSwitch);
    if (!powerEntity) {
        return null;
    }

    const sensor = id => byId.get(id)?.state ?? null;

    return {
        name: printer.name,
        interfaceUrl: printer.interfaceUrl,
        cameraStreamUrl: printer.cameraStreamUrl,
        pauseButton: printer.pauseButton,
        resumeButton: printer.resumeButton,
        cancelButton: printer.cancelButton,
        power: mapEntity(powerEntity),
        state: sensor(printer.stateSensor),
        progress: sensor(printer.progressSensor),
        timeLeft: sensor(printer.timeLeftSensor),
        currentLayer: sensor(printer.currentLayerSensor),
        totalLayer: sensor(printer.totalLayerSensor),
        filename: sensor(printer.filenameSensor),
        extruderTemp: sensor(printer.extruderTempSensor),
        bedTemp: sensor(printer.bedTempSensor),
        chamberTemp: sensor(printer.chamberTempSensor),
        light: {
            id: printer.lightNumber,
            value: parseFloat(sensor(printer.lightNumber) ?? 0),
        },
        fans: printer.fans.map(fan => ({
            id: fan.id,
            name: fan.name,
            value: parseFloat(sensor(fan.id) ?? 0),
        })),
    };
}
