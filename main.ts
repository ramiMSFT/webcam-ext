namespace webcam {
    const CHANNEL = "webcam"
    const EVENT_ID = 4567
    const FRAME_EVENT = 1

    const MICROBIT_ID_BUTTON_A = 1
    const MICROBIT_BUTTON_EVT_CLICK = 3
    let imageBuffer: Buffer = undefined


    let initialized = false;
    export let currentFrame: Image = undefined;

    /**
     * Registers a handler when an image is onReceived
     * from the webcam
    */
    export function onFrameReceived(handler: () => void) {
        init()
        control.onEvent(EVENT_ID, FRAME_EVENT, function () {
            if (handler)
                handler();
        })

        control.onEvent(MICROBIT_ID_BUTTON_A, MICROBIT_BUTTON_EVT_CLICK, function() {
            currentFrame
            serial.writeBuffer(imageBuffer)
        })

    }
    
    function init() {
        if (!initialized)
            initialized = true;

        control.simmessages.onReceived(CHANNEL, function (msg: Buffer) {
            // buffer is the encoded image
            currentFrame = image.ofBuffer(msg);
            imageBuffer = msg
            control.raiseEvent(EVENT_ID, FRAME_EVENT)
        })
    }

}
