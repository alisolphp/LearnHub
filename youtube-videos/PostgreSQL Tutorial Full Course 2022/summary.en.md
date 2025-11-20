# PostgreSQL Tutorial Full Course 2022

* **Platform**: YouTube
* **Channel/Creator**: Derek Banas
* **Duration**: 03:42:12
* **Release Date**: 2022
* **Video Link**: [https://www.youtube.com/watch?v=85pG_pDkITY](https://www.youtube.com/watch?v=85pG_pDkITY)

> **Disclaimer**: This is a personal summary and interpretation based on a YouTube video. It is not official material and not endorsed by the original creator. All rights remain with the respective creators.

*This document summarizes the key takeaways from the video. I highly recommend watching the full video for visual context and coding demonstrations.*

## Before You Get Started
- I summarize key points to help you learn and review quickly.
- Simply click on `Ask AI` links to dive into any topic you want.

## Why Choose Postgres
* **Summary**: Postgres is an object-relational database that's as fast as MySQL but sticks closer to SQL standards, handles concurrency well, avoids data corruption, and offers advanced data types with options for custom ones. It's ideal for extensibility, scalability, and data integrity.
* **Key Takeaway/Example**: Compared to MySQL, Postgres excels in complex scenarios like custom operators or index types.
* **Link for More Details**: [Ask AI: Why Choose Postgres](https://alisol.ir/?ai=Why%20Choose%20Postgres%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Database Basics
* **Summary**: Databases organize data into tables with rows and columns, like spreadsheets. Queries retrieve or modify data. Tables represent real-world entities, columns hold specific info, and primary keys ensure uniqueness. Design aims to minimize redundancy.
* **Key Takeaway/Example**: For a student table, columns might include ID (primary key), name, and address; rows represent individual students.
* **Link for More Details**: [Ask AI: Database Basics](https://alisol.ir/?ai=Database%20Basics%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Getting Started with PG Admin
* **Summary**: PG Admin works identically on Windows, Mac, and Linux (minor differences like an extra 'users' database on Mac/Linux). Log in with a password, create databases, and use the query tool for commands. Customize themes and font sizes.
* **Key Takeaway/Example**: Right-click databases to create a new one, e.g., 'sales_db', and open the query tool for running SQL.
* **Link for More Details**: [Ask AI: Getting Started with PG Admin](https://alisol.ir/?ai=Getting%20Started%20with%20PG%20Admin%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Creating Tables from Real-World Examples
* **Summary**: Base tables on invoices or real data. For a shoe store, create tables like customer (with fields like name, address), salesperson, product_type (e.g., business, casual), product (supplier, name), item (size, color, price), sales_order, and sales_item.
* **Key Takeaway/Example**: Use foreign keys to link tables, e.g., product references product_type.
```sql
CREATE TABLE customer (
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    -- ... other fields
    id SERIAL PRIMARY KEY
);
```
* **Link for More Details**: [Ask AI: Creating Tables from Real-World Examples](https://alisol.ir/?ai=Creating%20Tables%20from%20Real-World%20Examples%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Data Types in Postgres
* **Summary**: Postgres supports character (char, varchar, text), numeric (serial, int, float, decimal), boolean (true/false), date/time (date, time, timestamp, interval), and others like currency, JSON, arrays. Custom types possible via enums.
* **Key Takeaway/Example**: Serial auto-increments for IDs; dates store as YYYY-MM-DD regardless of input format.
```sql
CREATE TYPE sex_type AS ENUM ('M', 'F');
```
* **Link for More Details**: [Ask AI: Data Types in Postgres](https://alisol.ir/?ai=Data%20Types%20in%20Postgres%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Inserting and Viewing Data
* **Summary**: Use INSERT INTO to add rows, optionally specifying columns. View data via SELECT * or right-click in PG Admin. Use CURRENT_TIMESTAMP for auto-dates.
* **Key Takeaway/Example**: Insert multiple rows at once; serial handles IDs automatically.
```sql
INSERT INTO customer (first_name, last_name, ...) VALUES ('Christopher', 'Jones', ...);
```
* **Link for More Details**: [Ask AI: Inserting and Viewing Data](https://alisol.ir/?ai=Inserting%20and%20Viewing%20Data%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Altering Tables and Structures
* **Summary**: Use ALTER TABLE to add/modify/drop columns, rename tables, or change types. TRUNCATE clears data; DROP removes tables. Create indexes for faster queries.
* **Key Takeaway/Example**: Fix data type issues, like changing zip from smallint to int for larger values.
```sql
ALTER TABLE customer ALTER COLUMN zip TYPE INTEGER;
```
* **Link for More Details**: [Ask AI: Altering Tables and Structures](https://alisol.ir/?ai=Altering%20Tables%20and%20Structures%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Table Relationships and Foreign Keys
* **Summary**: Link tables via foreign keys to maintain relationships, e.g., sales_order references customer and salesperson. Reduces redundancy and ensures integrity.
* **Key Takeaway/Example**: Product table has foreign key to product_type ID.
* **Link for More Details**: [Ask AI: Table Relationships and Foreign Keys](https://alisol.ir/?ai=Table%20Relationships%20and%20Foreign%20Keys%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Advanced Queries and Joins
* **Summary**: Use SELECT with WHERE, ORDER BY, LIMIT. Joins combine tables; aggregates like COUNT, SUM. Subqueries and views simplify complex ops.
* **Key Takeaway/Example**: Get top 10 expensive products with JOIN on product and item.
```sql
SELECT product.name, product.supplier, item.price FROM product INNER JOIN item ON product.id = item.product_id ORDER BY item.price DESC LIMIT 10;
```
* **Link for More Details**: [Ask AI: Advanced Queries and Joins](https://alisol.ir/?ai=Advanced%20Queries%20and%20Joins%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Functions in PL/pgSQL
* **Summary**: Create functions for reusable logic, like summing orders or checking conditions. Use loops, conditionals (IF/CASE), arrays.
* **Key Takeaway/Example**: Function to check monthly orders with IF-ELSE.
```sql
CREATE FUNCTION check_month_orders(month INT) RETURNS VARCHAR AS $$ DECLARE total_orders INT; BEGIN SELECT COUNT(purchase_order_number) INTO total_orders FROM sales_order WHERE EXTRACT(MONTH FROM time_order_taken) = month; IF total_orders > 5 THEN RETURN CONCAT(total_orders, ' orders doing good'); ELSE RETURN CONCAT(total_orders, ' orders doing bad'); END IF; END; $$ LANGUAGE plpgsql;
```
* **Link for More Details**: [Ask AI: Functions in PL/pgSQL](https://alisol.ir/?ai=Functions%20in%20PL%2FpgSQL%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Stored Procedures
* **Summary**: Procedures handle transactions and updates, unlike functions. Use INOUT for returns; call with CALL or EXECUTE.
* **Key Takeaway/Example**: Procedure to update past due balances.
```sql
CREATE PROCEDURE pr_debt_paid(past_due_id INT, payment_amount NUMERIC) AS $$ BEGIN UPDATE past_due SET balance = balance - payment_amount WHERE id = past_due_id; COMMIT; END; $$ LANGUAGE plpgsql;
```
* **Link for More Details**: [Ask AI: Stored Procedures](https://alisol.ir/?ai=Stored%20Procedures%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Triggers
* **Summary**: Triggers auto-run on events like INSERT/UPDATE/DELETE. Before/after timing; row/statement level. Useful for auditing, validation.
* **Key Takeaway/Example**: Trigger logs distributor name changes.
```sql
CREATE TRIGGER tr_name_changed BEFORE UPDATE ON distributor FOR EACH ROW EXECUTE PROCEDURE log_distributor_name_change();
```
* **Link for More Details**: [Ask AI: Triggers](https://alisol.ir/?ai=Triggers%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Cursors
* **Summary**: Cursors iterate through rows for processing. Declare, open, fetch, close. Useful in functions for row-by-row ops.
* **Key Takeaway/Example**: Function to list customers by state using cursor.
```sql
CREATE FUNCTION get_customers_by_state(c_state VARCHAR) RETURNS TEXT AS $$ DECLARE customer_names TEXT := ''; cust RECORD; customer_by_state CURSOR (p_state VARCHAR) FOR SELECT first_name, last_name, state FROM customer WHERE state = p_state; BEGIN OPEN customer_by_state(c_state); LOOP FETCH customer_by_state INTO cust; EXIT WHEN NOT FOUND; customer_names := customer_names || cust.first_name || ' ' || cust.last_name || ', '; END LOOP; CLOSE customer_by_state; RETURN customer_names; END; $$ LANGUAGE plpgsql;
```
* **Link for More Details**: [Ask AI: Cursors](https://alisol.ir/?ai=Cursors%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

## Installation Guide
* **Summary**: Download from postgresql.org, select OS/version. Install with defaults, set password and port (5432). Avoid Stack Builder. Launch PG Admin post-install.
* **Key Takeaway/Example**: Next through wizard; set superuser password during setup.
* **Link for More Details**: [Ask AI: Installation Guide](https://alisol.ir/?ai=Installation%20Guide%7CDerek%20Banas%7CPostgreSQL%20Tutorial%20Full%20Course%202022)

---
**About the summarizer**

I'm *Ali Sol*, a Backend Developer. Learn more:
- Website: [alisol.ir](https://alisol.ir)
- LinkedIn: [linkedin.com/in/alisolphp](https://www.linkedin.com/in/alisolphp)
