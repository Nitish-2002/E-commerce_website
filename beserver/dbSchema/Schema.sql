


USE DEMO

-- COMMENTS

-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    username character varying ,
    password character varying ,
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 10000000 CACHE 1 )
)




-- Table: public.Categories

-- DROP TABLE IF EXISTS public."Categories";

CREATE TABLE IF NOT EXISTS public."Categories"
(
    "categoryId"     INTEGER NOT NULL  ,
    "categoryName"   CHARACTER varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT "Categories_pkey" PRIMARY KEY ("categoryId")
);






--- Table: public.posts

-- DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
( 
    "PostId" serial NOT NULl,
    "Title" character varying(255) COLLATE pg_catalog."default",
    "Description" character varying(255) COLLATE pg_catalog."default",
    "Address" character varying(255) COLLATE pg_catalog."default",
    date timestamp with time zone NOT NULL,
    "Price" integer,
    "Status" character varying(255) COLLATE pg_catalog."default",
    "UserId" integer NOT NULL,
    "Views" integer DEFAULT 0,
    "Category" character varying(255) COLLATE pg_catalog."default",
    "FileName" character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY ("PostId")
)

