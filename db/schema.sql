DROP TABLE IF EXISTS drops;

CREATE TABLE drops (
  drop_id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR,
  drop VARCHAR(60) NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  created_at TIMESTAMP DEFAULT now()

);
