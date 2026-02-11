1WITH
2  cte_invalid_ip AS (
3    SELECT log_id, ip
4    FROM logs
5    WHERE NOT regexp_like(ip, "^(?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:[.](?:[1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$")
6  ),
7  cte_invalid_ip_count AS (
8    SELECT ip, count(log_id) 'invalid_count'
9    FROM cte_invalid_ip
10    GROUP BY ip
11  )
12SELECT ip, invalid_count
13FROM cte_invalid_ip_count
14ORDER BY invalid_count DESC, ip DESC;