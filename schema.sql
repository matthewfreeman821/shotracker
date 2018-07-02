create table Users (
    id serial primary key,
    GithubId int not null unique, 
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
    MedName varchar(30),
    UserId int,
    foreign key (UserId) references Users(id)
    on delete cascade,
    AmtAvail varchar(15),
    LotNum varchar(100),
    ExpDate varchar(30)
);

create table Shot (
    ShotId serial primary key,
    ShotTime varchar(30),
    MedId int,
    foreign key (MedId) references Medicine(MedId)
    on delete cascade,
    Notes varchar(500),
    ShotLocation varchar(30)
);