1class Solution(object):
2    def findMaximizedCapital(self, k, w, profits, capital):
3        """
4        :type k: int
5        :type w: int
6        :type profits: List[int]
7        :type capital: List[int]
8        :rtype: int
9        """
10        projects = sorted(zip(capital, profits))
11
12        pq = []
13        i = 0
14        for _ in range(k):
15            while i < len(projects) and projects[i][0] <= w:
16                heapq.heappush(pq, -projects[i][1])
17                i += 1
18            if not pq:
19                break
20            w -= heapq.heappop(pq)
21
22        return w