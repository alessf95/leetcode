1class Solution:
2    def mergeKLists(self, lists: List[ListNode]) -> ListNode:
3        head = ListNode(None)
4        curr = head
5        h = []
6        for i in range(len(lists)):
7            if lists[i]:
8                heapq.heappush(h, (lists[i].val, i))
9                lists[i] = lists[i].next
10        
11        while h:
12            val, i = heapq.heappop(h)
13            curr.next = ListNode(val)
14            curr = curr.next
15            if lists[i]:
16                heapq.heappush(h, (lists[i].val, i))
17                lists[i] = lists[i].next
18        
19        return head.next