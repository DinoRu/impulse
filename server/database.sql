CREATE DATABASE impulse;

CREATE TABLE meter(
    meter_id SERIAL PRIMARY KEY,
    imei STRING NOT NULL,
    pulse INTEGER NOT NULL,
    date TIMESTAMP NOT NULL
);