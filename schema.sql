create table Users (
    id serial primary key,
    LastName varchar(20),
    FirstName varchar(20),
    Email varchar(50),
    Age varchar(3),
    Height varchar(8),
    BodyWeight varchar(8),
    Gender varchar(6),
    Ethnicity varchar(30)
);

create table Medicine (
    MedId serial primary key,
    UserId foreign key references Users(id),
    AmtAvail varchar(15),
    LotNum varchar(100),
    ExpDate varchar(10)
);

create table Shot (
    ShotTime timestamp,
    MedId foreign key references Medicine(MedId),
    Notes varchar(500),
    ShotLocation varchar(30)
);