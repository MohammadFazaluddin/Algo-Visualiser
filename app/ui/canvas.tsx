"use client"

import { useDraw } from "./useDraw";
import { sort } from "../lib/sort";

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
        for (let i = 0; i < max; i++) {
            arr.push(Math.round(Math.random() * maxY));
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


    return (
        <div className="flex justify-center items-center">
            <button onClick={() => sort.bubbleSort(arr)} className="m-5">Start</button>
            <button onClick={reset} className="m-5">Reset</button>
            <button onClick={clearBoard} className="m-5">Clear</button>
            <canvas ref={canvasRef} width={maxX} height={maxY} className="bg-black" />

        </div>
    );
}

