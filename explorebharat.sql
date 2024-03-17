CREATE DATABASE explorebharat;
USE explorebharat;
create table users(
name char(50),
email char(100),
password char(40)
);
select *from users;
alter table users add column (Mobile_Number int,
Package_Name varchar(100),
Budget int);