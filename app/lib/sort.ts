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

    async bubbleSort(arr: number[]): Promise<void> {
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


    mergeSort(array: any[]): any[] {
        if (array.length <= 1) {
            return array;
        }
        const middle = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, middle);
        const rightHalf = array.slice(middle);
        return this.merge(this.mergeSort(leftHalf), this.mergeSort(rightHalf));
    }

    merge(left: any[], right: any[]): any[] {
        let result: any[] = [];
        let leftIndex = 0;
        let rightIndex = 0;

        while (leftIndex < left.length &&
            rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return result.concat(left.slice(leftIndex)).
            concat(right.slice(rightIndex));
    }

}

