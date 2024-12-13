import {defineConfig, type Format, type Options} from 'tsup';
import { umdWrapper } from 'esbuild-plugin-umd-wrapper';

const defaultOutExtension: NonNullable<Options["outExtension"]> = ({
    format,
    pkgType
}) => {
    let jsExtension = ".js";
    let dtsExtension = ".d.ts";
    const isModule = pkgType === "module";
    if (isModule && format === "cjs") {
        jsExtension = ".cjs";
        dtsExtension = ".d.cts";
    }
    if (!isModule && format === "esm") {
        jsExtension = ".mjs";
        dtsExtension = ".d.mts";
    }
    if (format === "iife") {
        jsExtension = ".global.js";
    }
    return {
        js: jsExtension,
    };
}

export default defineConfig(() => {
    const format = ['cjs', 'esm', 'iife', 'umd'] as Options["format"];
    return {
        entry: ['src/index.ts'],
        format: format,
        outExtension(params) {
            if(params.format as Format === 'umd' as Format) {
                return {
                    js: '.umd.js',
                    dts: ".d.umd"
                };
            }
            return defaultOutExtension(params);
        },
        dts: true,
        esbuildPlugins: [
            umdWrapper({
                libraryName: 'TSLib',
            })
        ],
        splitting: false,
        sourcemap: true,
        clean: true,
    }
})