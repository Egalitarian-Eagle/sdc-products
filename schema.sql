-- DROP DATABASE test;
CREATE DATABASE test;

CREATE TABLE products (
  product_id integer PRIMARY KEY,
  name varchar(100),
  slogan TEXT,
  description TEXT,
  category varchar(200),
  default_price varchar(10)
);

CREATE TABLE features (
  feature_id integer PRIMARY KEY,
  product_id integer REFERENCES products(product_id),
  feature varchar(80),
  value varchar(80)
);

-- isDefault in the old api is referenced as 'default?'
CREATE TABLE styles (
  style_id integer PRIMARY KEY,
  product_id integer REFERENCES products (product_id),
  name varchar(80),
  sale_price varchar(10),
  original_price varchar(10),
  isDefault boolean
);


CREATE TABLE photos (
  id integer PRIMARY KEY,
  style_id integer REFERENCES styles (style_id),
  thumbnail_url TEXT,
  url TEXT
);

CREATE TABLE skus (
  sku_id integer PRIMARY KEY,
  style_id integer REFERENCES styles (style_id),
  size varchar(10),
  quantity integer
);

CREATE TABLE related (
  id integer PRIMARY KEY,
  product_id integer REFERENCES products(product_id),
  realted_id integer
);

COPY products FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/product.csv' CSV HEADER;
COPY features FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/features.csv' CSV HEADER;
COPY styles FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/styles.csv' CSV HEADER;
COPY photos FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/photos.csv' CSV HEADER;
COPY skus FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/skus.csv' CSV HEADER;
COPY related FROM '/home/alan_fong/hackreactor/SDC/sdc-products/csv/related.csv' CSV HEADER;