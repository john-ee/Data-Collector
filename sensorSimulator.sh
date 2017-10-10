#!/bin/bash

while [[ true ]]; do
  temp=$[( RANDOM % 25 ) + 1]
  mosquitto_pub -h localhost -t $1 -m $temp -u $2 -P $3
  sleep 2
done
