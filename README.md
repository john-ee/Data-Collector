# Data Collector

This project is a simple Node.JS program that collects data over MQTT and stores them in a MONgoDB collection.

## How to use

Set up your MQTT broker and your MongoDB in a ```config.json```.
The variables are :
* dbUser
* dbPwd
* dbName (either localhost, or anything else)
* mqttName (similar to previously)

## Sensor Simulator

A simple shell script simulates a sensor.
