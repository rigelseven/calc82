import data from './help.json' with { type: 'json' };
import LayoutEngine from './interface/layout.js';

export function findFunction(functionName) {
    let fn = data[functionName];
    return fn;
}