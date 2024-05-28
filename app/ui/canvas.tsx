"use client"

import { useDraw } from "./useDraw";

export default function Canvas() {

    const maxX = 400, maxY = 400;
    const delayTime = 10;
    const lineWidth = 2;

    let arr: number[] = [];
    let max = 200;
    let stop = false;


    const { canvasRef, clear } = useDraw(makeLine);

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function makeLine({ ctx, px, height, color }: Draw) {
        const pos = px * lineWidth;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(pos, maxY);
        ctx.lineTo(pos, maxY - height);
        ctx.stroke();

    }
    
    const clearBoard = () => {
        clear();
        stop = true;
    }

    function initGraph() {

        let initDraw = new CustomEvent("changeDraw", {
            detail: {
                px: 0,
                height: 0,
            }
        });
        for (let i = 0; i < max; i++) {
            arr.push(Math.round(Math.random() * maxY));
            initDraw.detail.px = i + 10;
            initDraw.detail.height = arr[i];
            canvasRef.current?.dispatchEvent(initDraw);
        }
    }
    initGraph();

    const reset = async () => {
        clear();
        stop = false;
        let initDraw = new CustomEvent("changeDraw", {
            detail: {
                px: 0,
                height: 0,
                color: 'white'
            }
        });
        for (let i = 0; i < max; i++) {
                arr[i] = (Math.round(Math.random() * 300));
                initDraw.detail.px = i;
                initDraw.detail.height = arr[i];
                canvasRef.current?.dispatchEvent(initDraw);
        }
    }

    async function bubbleSort(arr: number[]): void {
        const foreColor = "white", backColor = "black", activeColor = 'red';
        let i: number, j, temp: number;
        let drawEvent = new CustomEvent("changeDraw", {
            detail: {
                px: 0,
                height: 0,
                color: foreColor 
            }
        });

        for (j = 1; j < arr.length; j++) {
            if (stop) {
                    console.log("stop....");
                break;
            }
            for (i = 0; i < arr.length; i++) {

                if (stop) {
                    console.log("stop....");
                    break;
                }

                if (arr[i] > arr[i + 1]) {
                    temp = arr[i];

                    drawEvent.detail.px = i + 1;
                    drawEvent.detail.height = arr[i + 1];
                    drawEvent.detail.color = backColor;
                    canvasRef.current?.dispatchEvent(drawEvent); 

                    drawEvent.detail.px = i;
                    drawEvent.detail.height = arr[i];
                    drawEvent.detail.color = backColor;
                    canvasRef.current?.dispatchEvent(drawEvent);

                    arr[i] = arr[i + 1];

                    drawEvent.detail.px = i;
                    drawEvent.detail.height = arr[i];
                    drawEvent.detail.color = foreColor;
                    canvasRef.current?.dispatchEvent(drawEvent);

                    arr[i + 1] = temp;
                    drawEvent.detail.px = i + 1;
                    drawEvent.detail.height = arr[i + 1];
                    drawEvent.detail.color = foreColor;
                    canvasRef.current?.dispatchEvent(drawEvent);

                    await delay(delayTime);
                }
            }
        }
        console.log('done');
        console.log(arr);
    }

    return (
        <div className="flex justify-center items-center">
            <button onClick={() => bubbleSort(arr)} className="m-5">Start</button>
            <button onClick={reset} className="m-5">Reset</button>
            <button onClick={clearBoard} className="m-5">Clear</button>
            <canvas ref={canvasRef} width={maxX} height={maxY} className="bg-black" />

        </div>
    );
}

