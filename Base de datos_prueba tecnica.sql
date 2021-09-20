--
-- PostgreSQL database dump
--

-- Dumped from database version 11.10 (Debian 11.10-1.pgdg90+1)
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id character varying NOT NULL,
    description character varying(30) NOT NULL,
    name character varying(30) NOT NULL,
    price numeric NOT NULL
);


--
-- Name: products_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 111111111111
    CACHE 1;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id character varying NOT NULL,
    name character varying(30) NOT NULL
);


--
-- Name: sales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sales (
    id character varying NOT NULL,
    qty numeric NOT NULL,
    sale_at timestamp with time zone NOT NULL,
    users_id character varying NOT NULL,
    products_id character varying NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id character varying NOT NULL,
    document character varying(20) NOT NULL,
    name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    roles_id character varying
);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products (id, description, name, price) VALUES
	('1', 'test', 'tv', 100000),
	('ffa70bc3-c99c-4bf6-9323-fe1bf71f289e', 'test', 'Nevera', 100000),
	('07ea0de0-7a75-469f-9c02-ef2ad8cbf4e9', 'test', 'Nevera', 100000),
	('9fee0b27-9d43-4495-9a69-1acaf1aa6074', 'test', 'Nevera', 100000),
	('9a5ea0a3-218f-4287-8650-1dc7bcbf1400', 'test', 'celular', 50);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.roles (id, name) VALUES
	('4fdf8dbd-fadd-4ef7-a142-d14daf50b6ce', 'admin'),
	('17c90ae4-2a0e-47b5-94ec-9d0bfd9ab772', 'client'),
	('16d01cc0-e6e6-4790-95eb-28775315b929', 'staff');


--
-- Data for Name: sales; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sales (id, qty, sale_at, users_id, products_id) VALUES
	('f8780d0f-dc74-4506-b2c6-1f5cf8081a82', 5, '2021-08-20 06:16:59.349+00', 'd3586075-7202-41d9-a8e2-02409be1bbe8', 'ffa70bc3-c99c-4bf6-9323-fe1bf71f289e'),
	('583fc9c9-05bd-47d4-9b23-95f6538687d3', 10, '2021-09-20 05:24:30.468+00', 'd3586075-7202-41d9-a8e2-02409be1bbe8', '9fee0b27-9d43-4495-9a69-1acaf1aa6074'),
	('3a71ae0b-20cb-4a71-b323-88e89c60f44c', 1, '2021-09-20 07:20:39.299+00', 'd3586075-7202-41d9-a8e2-02409be1bbe8', '9a5ea0a3-218f-4287-8650-1dc7bcbf1400');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users (id, document, name, last_name, roles_id) VALUES
	('d3586075-7202-41d9-a8e2-02409be1bbe8', '1024589987', 'sebastian', 'cardenas', NULL);


--
-- Name: products_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_seq', 1, false);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: index_users_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_users_id ON public.sales USING btree (users_id);


--
-- Name: sales lnk_products_sales; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT lnk_products_sales FOREIGN KEY (products_id) REFERENCES public.products(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users lnk_roles_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT lnk_roles_users FOREIGN KEY (roles_id) REFERENCES public.roles(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: sales lnk_users_sales; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT lnk_users_sales FOREIGN KEY (users_id) REFERENCES public.users(id) MATCH FULL ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

