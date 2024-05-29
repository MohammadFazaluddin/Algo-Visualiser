import { RefObject } from "react";
import { Utils } from "./utils";
import { EventNames } from "./event";

export class sort {

    stopLoop: boolean;
    canvasRef: RefObject<HTMLCanvasElement> | null;
    utils = new Utils;
    delayTime: number;
    maxY: number;
    foreColor: string = "white";
    backColor: string = "black";

    constructor() {
        this.stopLoop = false;
        this.canvasRef = null;
        this.delayTime = 0;
        this.maxY = 0;
    }

    drawLine(x: number, height: number, color: string, event: CustomEvent): void {
        event.detail.px = x;
        event.detail.height = height;
        event.detail.color = color;
        this.canvasRef?.current?.dispatchEvent(event);
    }

    async bubbleSort(arr: number[]): Promise<void> {
        let i: number, j, temp: number;
        let drawEvent = new CustomEvent(EventNames.DRAW_EVENT, {
            detail: {
                px: 0,
                height: 0,
                color: this.foreColor
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

                    this.drawLine(i + 1, arr[i + 1], this.backColor, drawEvent);

                    this.drawLine(i, arr[i], this.backColor, drawEvent);

                    arr[i] = arr[i + 1];

                    this.drawLine(i, arr[i], this.foreColor, drawEvent);

                    arr[i + 1] = temp;
                    this.drawLine(i + 1, arr[i + 1], this.foreColor, drawEvent);

                    await this.utils.delay(this.delayTime);
                }
            }
        }
    }


    async mergeSort(array: any[], leftStart: number, rightStart: number): Promise<any[]> {
        if (array.length <= 1) {
            return array;
        }
        if (this.stopLoop) {
            return array;
        }

        const middleStart = Math.floor((leftStart + rightStart) / 2);
        const middle = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, middle);
        const rightHalf = array.slice(middle);
        return await this.merge(await this.mergeSort(leftHalf, leftStart, middleStart),
            await this.mergeSort(rightHalf, middleStart + 1, rightStart),
            leftStart, middleStart + 1);
    }

    async merge(left: any[], right: any[], leftStart: number, rightStart: number): Promise<any[]> {
        let result: any[] = [];
        let leftIndex = 0;
        let rightIndex = 0;

        if (this.stopLoop) {
            return result;
        }


        let drawEvent = new CustomEvent(EventNames.DRAW_EVENT, {
            detail: {
                px: 0,
                height: 0,
                color: this.foreColor
            }
        });

        while (leftIndex < left.length &&
            rightIndex < right.length) {

            if (this.stopLoop) {
                return result;
            }
            if (left[leftIndex] < right[rightIndex]) {
                // erase previous drawing 

                this.drawLine(leftStart, this.maxY, this.backColor, drawEvent);

                this.drawLine(leftStart, left[leftIndex], this.foreColor, drawEvent);

                result.push(left[leftIndex]);

                leftIndex++;
                leftStart++;
            } else {

                this.drawLine(rightStart, this.maxY, this.backColor, drawEvent);

                this.drawLine(rightStart, right[rightIndex], this.foreColor, drawEvent);

                result.push(right[rightIndex]);
                rightIndex++;
                rightStart++;
            }
            await this.utils.delay(this.delayTime);
        }

        while (leftIndex < left.length) {
            if (this.stopLoop) {
                return result;
            }
            this.drawLine(leftStart, this.maxY, this.backColor, drawEvent);

            this.drawLine(leftStart, left[leftIndex], this.foreColor, drawEvent);

            result.push(left[leftIndex++])
            await this.utils.delay(this.delayTime);
        }

        while (rightIndex < right.length) {
            if (this.stopLoop) {
                return result;
            }

            this.drawLine(rightStart, this.maxY, this.backColor, drawEvent);

            this.drawLine(rightStart, right[rightIndex], this.foreColor, drawEvent);

            result.push(right[rightIndex++]);
            rightStart++;
            await this.utils.delay(this.delayTime);
        }

        for (let num = 0; num < result.length; num++) {
            if (this.stopLoop) {
                return result;
            }

            this.drawLine(num, this.maxY, this.backColor, drawEvent);

            this.drawLine(num, result[num], this.foreColor, drawEvent);

            await this.utils.delay(this.delayTime);
        }

        return result;
    }

    async shellSort(array: any[]) {
        let gap: number, i: number, j: number, temp: number;

        let drawEvent = new CustomEvent(EventNames.DRAW_EVENT, {
            detail: {
                px: 0,
                height: 0,
                color: this.foreColor
            }
        });
 
        for (gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (i = gap; i < array.length; i++) {
                for (j = i - gap; j >= 0 && array[j] > array[j + gap]; j -= gap) {
                    temp = array[j + gap];
 
                    this.drawLine(j, array[j], this.backColor, drawEvent);
 
                    this.drawLine(j + gap, array[j + gap], this.backColor, drawEvent);
 
                    array[j + gap] = array[j];
                    array[j] = temp;
 
                    this.drawLine(j, array[j], this.foreColor, drawEvent);
 
                    this.drawLine(j + gap, array[j + gap], this.foreColor, drawEvent);
                    console.log(array[j]);
 
                    await this.utils.delay(this.delayTime);

                    if (this.stopLoop) {
                        return array;
                    }
                }
            }
        } 
        return array;

    }

}
