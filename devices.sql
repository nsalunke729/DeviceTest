CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255),
    vendor VARCHAR(255),
    os_name VARCHAR(255),
    os_version VARCHAR(10),
    browser_name VARCHAR(255),
    primary_hardware_type VARCHAR(50)
);
