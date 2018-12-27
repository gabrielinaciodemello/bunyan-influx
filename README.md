# bunyan-influx
A Bunyan stream for saving logs into InfluxDB

```
import bunyanInflux from "bunyan-influx";
import * as bunyan from "bunyan";

const stream = await bunyanInflux.GetStream({
                        database: "applog",
                        host: "localhost",
                        schema: [
                        {
                            fields: {
                                jsonString: bunyanInflux.InfluxTypes.STRING
                            },
                            measurement: "logs",
                            tags: ["level"]
                        }
                        ]
                    });

const log = bunyan.createLogger({
  name: "my-applog",
  stream: stream
});

log.info({ jsonString: JSON.stringify({ message: "My json string" }) });

```