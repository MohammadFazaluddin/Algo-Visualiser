"use client"

import { useDraw } from "./useDraw";
import { EventNames } from "../lib/event";
import { sort } from "../lib/sort";
import { useEffect, useState } from "react";

export default function Canvas() {

    const maxX = 500, maxY = 500;
    const lineWidth = 2;
    const sortO = new sort;
    sortO.delayTime = 10;
    sortO.maxY = maxY;

    let arr: number[] = [];
    let max = 100;

    const { canvasRef, clear } = useDraw(makeLine);
    sortO.canvasRef = canvasRef;

    const [inputDelay, setInputDelay] = useState(sortO.delayTime);

    useEffect(() => {
        sortO.delayTime = inputDelay;
    }, [inputDelay]);

    const [inputLength, setInputLength] = useState(max);

    useEffect(() => {
        max = inputLength;
    }, [inputLength]);

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

    const merge = async () => {
        arr = await sortO.mergeSort(arr, 0, arr.length);
        console.log(arr);
    }
    const shell = async () => {
        arr = await sortO.shellSort(arr);
        console.log(arr);
    }

    return (
        <div className="flex flex-col justify-center items-center p-5">
            <div className="flex justify-center items-center">
                <canvas ref={canvasRef} width={maxX} height={maxY} className="bg-black" />
            </div>
            <div className="flex flex-col gap-4 w-36 justify-center items-center">
                <label>Delay: </label>
                <input type="number" className="outline-black outline"
                    value={inputDelay}
                    onChange={(e) => setInputDelay(parseInt(e.target.value))} />

                <label>Length: </label>
                <input
                    type="number"
                    max={maxX}
                    className="outline-black outline"
                    value={inputLength} onChange={(e) => setInputLength(parseInt(e.target.value))} />
            </div>
            <div className="flex justify-center items-center">


                <button onClick={() => sortO.bubbleSort(arr)} className="m-5">Bubble sort</button>
                <button onClick={merge} className="m-5">Merge sort</button>
                <button onClick={shell} className="m-5">Shell sort</button>
                <button onClick={reset} className="m-5">Reset</button>
                <button onClick={clearBoard} className="m-5">Clear</button>

            </div>
        </div>
    );
}

