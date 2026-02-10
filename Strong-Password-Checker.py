1class Solution(object):
2    def strongPasswordChecker(self, s):
3        """
4        :type s: str
5        :rtype: int
6        """
7        missing_type = 3
8        if any('a' <= c <= 'z' for c in s):
9            missing_type -= 1
10        if any('A' <= c <= 'Z' for c in s):
11            missing_type -= 1
12        if any(c.isdigit() for c in s):
13            missing_type -= 1
14
15        change = 0
16        one = two = 0
17        p = 2
18        while p < len(s):
19            if s[p] == s[p - 1] == s[p - 2]:
20                length = 2
21                while p < len(s) and s[p] == s[p - 1]:
22                    length += 1
23                    p += 1
24
25                change += length // 3
26                if length % 3 == 0:
27                    one += 1
28                elif length % 3 == 1:
29                    two += 1
30            else:
31                p += 1
32
33        if len(s) < 6:
34            return max(missing_type, 6 - len(s))
35        elif len(s) <= 20:
36            return max(missing_type, change)
37        else:
38            delete = len(s) - 20
39
40            change -= min(delete, one)
41            change -= min(max(delete - one, 0), two * 2) // 2
42            change -= max(delete - one - 2 * two, 0) // 3
43
44            return delete + max(missing_type, change)