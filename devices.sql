-- Table: public.devices

-- DROP TABLE IF EXISTS public.devices;

CREATE TABLE IF NOT EXISTS public.devices
(
    id integer NOT NULL DEFAULT nextval('devices_id_seq'::regclass),
    model character varying(255) COLLATE pg_catalog."default",
    vendor character varying(255) COLLATE pg_catalog."default",
    "osName" character varying(255) COLLATE pg_catalog."default",
    "osVersion" character varying(10) COLLATE pg_catalog."default",
    "browserName" character varying(255) COLLATE pg_catalog."default",
    "primaryHardwareType" character varying(50) COLLATE pg_catalog."default",
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    CONSTRAINT devices_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.devices
    OWNER to postgres;