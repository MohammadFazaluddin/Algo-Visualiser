import { useEffect, useRef } from "react"
import { onDrawChange } from "../lib/event";

export const useDraw = (onDraw: ({ px, height }: Draw) => void) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const clear = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }


    useEffect(() => {
        const handler = (e: typeof onDrawChange) => {

            const ctx = canvasRef.current?.getContext('2d');

            if (!ctx)
                return;

            const px = e.detail.px, height = e.detail.height;
            const color = e.detail.color;

            onDraw({ctx,  px, height, color });
        }

        // add event
        canvasRef.current?.addEventListener("changeDraw", handler);

        // remove event
        return () => {
            canvasRef.current?.removeEventListener("changeDraw", handler);
        }; 

    }, [onDraw])

    return  { canvasRef, clear };
}

