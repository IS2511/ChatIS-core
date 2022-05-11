
declare type ColorNumberType = 'rgb24' | 'argb32' | 'rgba32';

declare type ColorRGB24 = number | {
    r: number
    g: number
    b: number
};

declare type ColorARGB32 = number | {
    a: number
    r: number
    g: number
    b: number
};
declare type ColorRGBA32 = ColorARGB32;

declare type ColorAny = ColorRGB24 | ColorARGB32 | ColorRGBA32;

export default class Color {
    // argb32
    data: number = 0xff000000;

    constructor(color: ColorAny) {

    }

    numberToColor() {
        const color = 0xff123456

        const a = color >>> 24;         // 0xff
        const r = color >>> 16 & 0xff;  // 0x12
        const g = color >>> 8 & 0xff;   // 0x34
        const b = color & 0xff;         // 0x56
    }

    toCssHex() {
        return `#${(this.data & 0x00ffffff).toString(16)}${(this.data >>> 24)?.toString(16)}`;
    }
    toCssRgba() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }

    get a() { return this.data >>> 24; }
    get r() { return this.data >>> 16 & 0xff; }
    get g() { return this.data >>> 8 & 0xff; }
    get b() { return this.data & 0xff; }
}
