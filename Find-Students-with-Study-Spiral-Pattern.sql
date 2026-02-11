1WITH ordered AS (
2    SELECT
3        ss.*,
4        LAG(session_date) OVER (
5            PARTITION BY student_id
6            ORDER BY session_date
7        ) AS prev_date
8    FROM study_sessions ss
9),
10
11marked AS (
12    SELECT
13        *,
14        CASE
15            WHEN prev_date IS NULL THEN 0
16            WHEN DATEDIFF(session_date, prev_date) <= 2 THEN 0
17            ELSE 1
18        END AS is_break
19    FROM ordered
20),
21
22segmented AS (
23    SELECT
24        *,
25        SUM(is_break) OVER (
26            PARTITION BY student_id
27            ORDER BY session_date
28        ) AS segment_id
29    FROM marked
30),
31
32segment_stats AS (
33    SELECT
34        student_id,
35        segment_id,
36        COUNT(*) AS session_cnt,
37        COUNT(DISTINCT subject) AS cycle_length,
38        SUM(hours_studied) AS total_study_hours
39    FROM segmented
40    GROUP BY student_id, segment_id
41),
42
43valid_segments AS (
44    SELECT *
45    FROM segment_stats
46    WHERE
47        cycle_length >= 3
48        AND session_cnt >= 2 * cycle_length
49)
50
51SELECT
52    v.student_id,
53    s.student_name,
54    s.major,
55    v.cycle_length,
56    v.total_study_hours
57FROM valid_segments v
58JOIN students s
59  ON v.student_id = s.student_id
60ORDER BY
61    v.cycle_length DESC,
62    v.total_study_hours DESC;