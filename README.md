# bunyan-influx
A Bunyan stream for saving logs into InfluxDB


import bunyanInflux from 'bunyan-influx'
import * as bunyan from "bunyan";

const stream = await bunyanInflux.GetStream({
                            database: "applog",
                            host: "localhost",
                            schema: [
                            {
                                fields: {
                                    json: bunyanInflux.InfluxTypes.STRING
                                },
                                measurement: "logs",
                                tags: ["level"]
                            }
                            ]
                        })

bunyan.createLogger({
          name: "my-applog",
          stream: stream
        });