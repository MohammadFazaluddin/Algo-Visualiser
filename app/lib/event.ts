
export class EventNames { static DRAW_EVENT: string = "changeDraw" }

export const onDrawChange = new CustomEvent(EventNames.DRAW_EVENT, { detail: { px: 0, height : 0, color: "blue"} });

