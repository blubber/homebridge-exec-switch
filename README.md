# Homebridge Exec Switch

A Switch for HomeKit that executes shell scripts to toggle the
switch's power state and optionally retrieve its status.


# Instrallation

`$ npm install -g homebridge-exec-switch`


# Configuration

The following configuration options are available.

Key | Req? | Default | Description
--- | ---- | ------- | -----------
`accessory` | yes |   | Must be set to `ExecSwitch`.
`nane` | yes |   | The name of the switch
`type` | no | `Switch` | The Service type of the accessory, must be a member of `homebridge.hap.Service` and must implement `Characteristic.On` (e.g.: `LightBulb`, `Switch`)
`on` | yes |   | The command to execute to turn on the switch.
`off` | yes |   | The command to execute to turn off the switch.
`status` | no |   | The command to execute to retrieve the current state of the switch.

## Example

This example assumes you have the `switch-on`, `switch-off` and `status` executables in your
current working directory.

```
{
    "accessory": "ExecSwitch",
    "name": "Light",
    "type": "LightBulb",
    "on": "./switch-on",
    "off": "./switch-off",
    "status": "./status"
}
```


# Semantics

The `on` and `off` command will register as successfully executed when they return a `0` exit code.
The `status` command is slightly different, its exit code should be `0` if the switch is currently
turned on, ofhterwise it should return a non-zero exit code.
