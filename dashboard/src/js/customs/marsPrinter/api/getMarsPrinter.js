import {MARS_PRINTER} from "../config.js";
import {fetchStateIndex, mapEntity} from "../../../api/HomeAssistant.js";

export async function getMarsPrinter() {
    const printer = MARS_PRINTER;
    if (!printer) {
        return null;
    }

    const byId = await fetchStateIndex();

    const powerEntity = byId.get(printer.powerSwitch);
    const statusEntity = byId.get(printer.statusSensor);
    if (!powerEntity || !statusEntity) {
        return null;
    }

    const sensor = id => byId.get(id)?.state ?? null;

    return {
        name: printer.name,
        interfaceUrl: printer.interfaceUrl,
        pauseButton: printer.pauseButton,
        resumeButton: printer.resumeButton,
        stopButton: printer.stopButton,
        power: mapEntity(powerEntity),
        status: statusEntity.state,
        printStatus: sensor(printer.printStatusSensor),
        progress: sensor(printer.progressSensor),
        timeLeft: sensor(printer.timeLeftSensor),
        currentLayer: sensor(printer.currentLayerSensor),
        totalLayer: sensor(printer.totalLayerSensor),
        filename: sensor(printer.filenameSensor),
        uvLedTemp: sensor(printer.uvLedTempSensor),
        sdcpConnected: sensor(printer.sdcpStatusSensor) === "on",
        cameraImageUrl: printer.cameraEntity ? `/api/ha/camera_proxy/${printer.cameraEntity}` : null,
    };
}
