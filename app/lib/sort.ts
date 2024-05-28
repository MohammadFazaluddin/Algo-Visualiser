import { RefObject } from "react";
import { Utils } from "./utils";

export class sort {

    stopLoop: boolean;
    canvasRef: RefObject<HTMLCanvasElement> | null;
    utils = new Utils;
    delayTime: number;


    constructor() {
        this.stopLoop = false;
        this.canvasRef = null;
        this.delayTime = 0;
    }
    
    async bubbleSort(arr: number[]) : Promise<void> {
        const foreColor = "white", backColor = "black";
        let i: number, j, temp: number;
        let drawEvent = new CustomEvent("changeDraw", {
            detail: {
                px: 0,
                height: 0,
                color: foreColor 
            }
        });

        for (j = 1; j < arr.length; j++) {

            if (this.stopLoop) {
                break;
            }

            for (i = 0; i < arr.length; i++) {

                if (this.stopLoop) {
                    break;
                }
                if (arr[i] > arr[i + 1]) {
                    temp = arr[i];

                    drawEvent.detail.px = i + 1;
                    drawEvent.detail.height = arr[i + 1];
                    drawEvent.detail.color = backColor;
                    this.canvasRef?.current?.dispatchEvent(drawEvent); 

                    drawEvent.detail.px = i;
                    drawEvent.detail.height = arr[i];
                    drawEvent.detail.color = backColor;
                    this.canvasRef?.current?.dispatchEvent(drawEvent);

                    arr[i] = arr[i + 1];

                    drawEvent.detail.px = i;
                    drawEvent.detail.height = arr[i];
                    drawEvent.detail.color = foreColor;
                    this.canvasRef?.current?.dispatchEvent(drawEvent);

                    arr[i + 1] = temp;
                    drawEvent.detail.px = i + 1;
                    drawEvent.detail.height = arr[i + 1];
                    drawEvent.detail.color = foreColor;
                    this.canvasRef?.current?.dispatchEvent(drawEvent);

                    await this.utils.delay(this.delayTime);
                }
            }
        }
    }

}

