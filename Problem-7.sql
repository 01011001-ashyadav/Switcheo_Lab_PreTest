
-- CREATE TABLE balances (
--   id SERIAL PRIMARY KEY,
--   address VARCHAR(255),
--   denom VARCHAR(50),
--   amount NUMERIC,
--   block_height INT
-- );

-- CREATE TABLE trades (
--   id SERIAL PRIMARY KEY,
--   address VARCHAR(255),
--   denom VARCHAR(50),
--   amount NUMERIC,
--   block_height INT
-- );

-- INSERT INTO balances (address, denom, amount, block_height)
-- VALUES
--     ('0xabab..', 'usdc', 50000000000000, 733755),
--     ('0x99cc..', 'swth', -20000000, 733757),
--     ('0xabab..', 'usdc', -50000000000, 733855);


-- INSERT INTO trades (address, denom, amount, block_height)
-- VALUES
--     ('0xabab..', 'swth', 400000000000, 733756),
--     ('0x99cc..', 'usdc', 3500000000000, 733757),
--     ('0x67f3..', 'swth', 72000000000000, 733758);

SELECT b.address
FROM (
    SELECT address, SUM(
        CASE WHEN denom = 'usdc' THEN amount * 0.000001
             WHEN denom = 'swth' THEN amount * 0.00000005
             WHEN denom = 'tmz' THEN amount * 0.003
        END
    ) AS balance
    FROM balances
    GROUP BY address
    HAVING SUM(
        CASE WHEN denom = 'usdc' THEN amount * 0.000001
             WHEN denom = 'swth' THEN amount * 0.00000005
             WHEN denom = 'tmz' THEN amount * 0.003
        END
    ) >= 500
) AS b
JOIN trades AS t ON b.address = t.address
WHERE t.block_height > 730000;

