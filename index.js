"use strict";

var child_process = require('child_process')
  , Service, Characteristic;



module.exports = function (homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-exec-switch", "ExecSwitch", ExecSwitch);
};



function ExecSwitch(log, config) {
    var service;

    if (!config.on) {
        throw new Error("No `on` config key set.");
    }

    if (!config.off) {
        throw new Error("No `off` config key set.");
    }

    if (!config.name) {
        throw new Error("No `name` config key set.");
    }

    if (config.type) {
        log("Configuring switch %s as %s.", config.name, config.type);
        service = new Service[config.type](config.name);
    }
    else {
        log("No switch type specified for %s, falling back to Switch.", config.name);
        service = new Service.Switch(config.name);
    }


    this.getServices = function () {
        return [service];
    };


    this._switch = function (newValue, callback) {
        var command = newValue ? config.on : config.off;

        log('Running set for %s -> %s', config.name, newValue);

        this._exec(command, function (error) {
            if (error) {
                callback("Command `" + command + "` exited with code: " + error.code);
            }
            else {
                callback();
            }
        });
    };


    this._status = function (callback) {
        if (config.status) {
            log('Running status command for %', config.name);

            this._exec(config.status, function (error) {
                callback(null, !!error);
            });
        }
        else {
            callback();
        }
    };


    this._exec = child_process.exec;


    service
        .getCharacteristic(Characteristic.On)
        .on('get', this._status.bind(this))
        .on('set', this._switch.bind(this));


    return this;
}

