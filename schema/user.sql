CREATE DATABASE IF NOT EXISTS users;
USE users;

CREATE TABLE users (
  email VARCHAR(100) NOT NULL PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL UNIQUE,
  profile_image VARCHAR(50),
  max_score INT(11) DEFAULT 0,
  created_at TIMESTAMP DEFAULT current_timestamp(),
  updated_at TIMESTAMP DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  bg_color VARCHAR(10)
);
