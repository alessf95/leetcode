1const sm = (a) => a.reduce(((x, y) => x + y), 0);
2let a, n, tsum;
3
4const splitArraySameAverage = (A) => {
5    a = A, n = a.length, tsum = sm(a);
6    a.sort((x, y) => x - y);
7    let ok = false;
8    for (let i = 1; i * 2 <= n; i++) {
9        if (tsum * i % n == 0) {
10            ok = true;
11            break;
12        }
13    }
14    if (!ok) return false;
15    for (let i = 1; i * 2 <= n; i++) {
16        if (tsum * i % n == 0) {
17            if (dfs(0, i, tsum * i / n)) return true;
18        }
19    }
20    return false;
21};
22
23const dfs = (startIdx, cnt, cur) => {
24    if (cnt == 0) return cur == 0;
25    if (a[startIdx] * cnt > cur) return false;
26    for (let i = startIdx; i < n - cnt + 1; i++) {
27        if (i > startIdx && a[i] == a[i - 1]) continue;
28        if (dfs(i + 1, cnt - 1, cur - a[i])) return true;
29    }
30    return false;
31};