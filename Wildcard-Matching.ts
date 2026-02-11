1function isMatch(s: string, p: string): boolean {
2
3    p = p.replace(/\*+/g, '*');
4    let dp = new Array(s.length + 1).fill(null).map(el => new Array(p.length + 1).fill(null));
5
6    let isGood = false;
7    let recursive = (sIdx: number, pIdx: number) => {
8        if (dp[sIdx][pIdx] === false) return;
9        if (isGood) return;
10
11        dp[sIdx][pIdx] = false;
12
13        if (sIdx === s.length && pIdx === p.length) {
14            isGood = true;
15            return;
16        }
17
18        let sChar = s[sIdx];
19        let pChar = p[pIdx];
20
21        if (sIdx < s.length && (sChar === pChar || pChar === '?')) {
22            recursive(sIdx + 1, pIdx + 1);
23        } else if (pChar === '*') {
24            recursive(sIdx, pIdx + 1)
25            if (sIdx < s.length) {
26                recursive(sIdx + 1, pIdx)
27            }
28
29        }
30    }
31
32    recursive(0, 0)
33
34    return isGood;
35};