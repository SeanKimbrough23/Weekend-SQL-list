CREATE TABLE "to-do" (
"id" SERIAL PRIMARY KEY,
"day" date,
"task" VARCHAR (600),
"complete" VARCHAR (5)
);

INSERT INTO "to-do" ("day","task","complete")
VALUES('03/17/2023','vaccum the house','Y'),
('03/18/2023','wash wife car','N'),
('03/19/2023','fold laundry','Y');

