#!/usr/bin/env bash

if [[ "$1" == "--reset" ]]
then
    rm app.db
fi

go run main.go migrate