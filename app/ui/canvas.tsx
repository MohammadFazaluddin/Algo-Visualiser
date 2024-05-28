"use client"

import { useDraw } from "./useDraw";
import { EventNames } from "../lib/event";
import { sort } from "../lib/sort";

export default function Canvas() {

    const maxX = 400, maxY = 400;
    const lineWidth = 2;
    const sortO = new sort;
    sortO.delayTime = 0;

    let arr: number[] = [];
    let max = 150;

    const { canvasRef, clear } = useDraw(makeLine);
    sortO.canvasRef = canvasRef; 

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
        sortO.stopLoop = true;
    }

    function initArray() {
        for (let i = 0; i < max; i++) {
            arr.push(Math.round(Math.random() * maxY));
        }
    }
    initArray();

    const reset = async () => {
        clear();
        sortO.stopLoop = false;
        let initDraw = new CustomEvent(EventNames.DRAW_EVENT, {
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

    const merge = () => {
        arr = sortO.mergeSort(arr);
        console.log(arr);
    }

    return (
        <div className="flex justify-center items-center">
            <button onClick={() => sortO.bubbleSort(arr)} className="m-5">Bubble sort</button>
            <button onClick={merge} className="m-5">Merge sort</button>
            <button onClick={reset} className="m-5">Reset</button>
            <button onClick={clearBoard} className="m-5">Clear</button>
            <canvas ref={canvasRef} width={maxX} height={maxY} className="bg-black" />

        </div>
    );
}

