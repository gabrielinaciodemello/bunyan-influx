/// <reference types="node" />
import * as Influx from "influx";
import { Writable } from "stream";
declare const _default: {
    GetStream: (options: Influx.ISingleHostConfig) => Promise<Writable>;
    InfluxTypes: typeof Influx.FieldType;
};
export default _default;
