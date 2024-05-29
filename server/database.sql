CREATE DATABASE impulse;

CREATE TABLE number(
    number_id SERIAL PRIMARY KEY,
    value INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL
);