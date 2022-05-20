import { ScaleLinear } from "d3";
import { Ani } from "../ani/Ani";
import { Component } from "../component/Component";
import { TextOptions } from "../component/Text";
import { Stage } from "../Stage";
export interface BaseChartOptions {
    interpolateInitValue?: number;
    aniTime?: [number, number];
    fadeTime?: [number, number];
    freezeTime?: [number, number];
    position?: {
        x: number;
        y: number;
    };
    shape?: {
        width: number;
        height: number;
    };
    margin?: {
        left: number;
        top: number;
        bottom: number;
        right: number;
    };
    xTickFormat?: (n: number | {
        valueOf(): number;
    }) => string;
    yTickFormat?: (n: number | {
        valueOf(): number;
    }) => string;
    showAxis?: boolean;
    showXAxis?: boolean;
    showYAxis?: boolean;
    idField?: string;
    colorField?: string | KeyGenerate;
    imageField?: string | KeyGenerate;
    dateField?: string;
    valueField?: string;
    /**
     * 数据消失和进入时的动画时间
     */
    dataFadeMS?: number;
    valueKeys?: string[];
    valueFormat?: (cData: any) => string;
    labelFormat?: (id: string, meta: Map<string, any>, data: Map<string, any>) => string;
    dateFormat?: string;
    visualRange?: "total" | "current" | "history" | [number, number];
    dataName?: string;
    metaName?: string;
    maxIntervalMS?: number;
}
export declare type KeyGenerate = ((id: string) => string) | ((id: string, meta: Map<string, any>) => string) | ((id: string, meta: Map<string, any>, data: Map<string, any>) => string);
export declare abstract class BaseChart extends Ani {
    yAxisWidth: number;
    xAxisHeight: number;
    yAxisPadding: number;
    xAxisPadding: number;
    maxIntervalMS: number;
    dataGroupByDate: Map<any, any[]>;
    visualRange: "total" | "current" | "history" | [number, number];
    interpolateInitValue: number;
    indexToDate: Map<number, string>;
    nonstandardDate: any;
    dataFadeMS: number;
    showAxis: boolean;
    showXAxis: boolean;
    showYAxis: boolean;
    constructor(options?: BaseChartOptions);
    tickKeyFrameDuration: number;
    dataScales: Map<string, any>;
    idField: string;
    colorField: string | KeyGenerate;
    imageField: string | KeyGenerate;
    dateField: string;
    valueField: string;
    valueKeys: string[];
    imageKey: string;
    shape: {
        width: number;
        height: number;
    };
    position: {
        x: number;
        y: number;
    };
    margin: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    aniTime: [number, number];
    freezeTime: [number, number];
    fadeTime: [number, number];
    data: any[];
    dataGroupByID: Map<string, any>;
    meta: Map<string, any>;
    dataName: string;
    metaName: string;
    alphaScale: ScaleLinear<number, number, never>;
    secToDate: ScaleLinear<any, any, never>;
    dateFormat: string;
    xTickFormat: (n: number | {
        valueOf(): number;
    }) => string;
    yTickFormat: (n: number | {
        valueOf(): number;
    }) => string;
    totallyMax: number;
    totallyMin: number;
    currentMax: number;
    currentMin: number;
    historyMax: number;
    historyMin: number;
    setup(stage: Stage): void;
    setData(): void;
    private setDataScales;
    private insertNaN;
    getComponent(sec: number): Component | null;
    setMeta(): void;
    valueFormat: (cData: any) => string;
    labelFormat: KeyGenerate;
    private setAlphaScale;
    private setDefaultAniTime;
    getCurrentData(sec: number, filter?: boolean): any[];
    protected getScalesBySec(sec: number): {
        x: ScaleLinear<number, number, never>;
        y: ScaleLinear<number, number, never>;
    };
    protected getAxis(sec: number, scales: {
        x: any;
        y: any;
    }): {
        yAxis: Component;
        xAxis: Component;
    };
    protected getAxisComponent(format: (v: number | {
        valueOf(): number;
    }) => string, scale0: ScaleLinear<number, number, never>, scale1: ScaleLinear<number, number, never>, pos: number, count: number, text: TextOptions, type: "x" | "y", sec: number, secRange: [number, number], scale: ScaleLinear<number, number, never>): Component;
    protected tickKeySecRange(sec: number): [number, number];
}
