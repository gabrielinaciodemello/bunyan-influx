import * as Influx from "influx";
import { Writable } from "stream";

const GetStream = (options: Influx.ISingleHostConfig): Promise<Writable> =>
  new Promise((resolve, reject) => {
    const influx = new Influx.InfluxDB(options);
    influx
      .getDatabaseNames()
      .then(names => {
        if (names.indexOf(options.database) === -1) {
          return influx.createDatabase(options.database);
        }
      })
      .then(() => {
        const stream = new Writable();
        stream._write = (entry, encoding, callback) => {
          const json = entry.toString("utf8");
          const jsonParse = JSON.parse(json);
          const fields = {};
          Object.keys(options.schema[0].fields).forEach(
            key => (fields[key] = jsonParse[key])
          );
          const tags = {};
          options.schema[0].tags.forEach(key => (tags[key] = jsonParse[key]));
          influx
            .writePoints([
              {
                fields,
                measurement: options.schema[0].measurement,
                tags
              }
            ])
            .then(() => callback())
            .catch(err => stream.emit("error", err));
        };
        resolve(stream);
      })
      .catch(reject);
  });

export default { GetStream, InfluxTypes: Influx.FieldType };
