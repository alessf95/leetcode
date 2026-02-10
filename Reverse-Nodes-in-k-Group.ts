1function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
2    if (!head) return null;
3    
4    const dummy = new ListNode();
5    dummy.next = head;
6    let groupPrev = dummy;
7    
8    const reverseLinkedList = (startNode: ListNode): [ListNode, ListNode] => {
9        let prevNode: ListNode | null = null;
10        let currentNode: ListNode | null = startNode;
11        const originalStart = startNode;
12        
13        while (currentNode) {
14            const nextTemp = currentNode.next;
15            currentNode.next = prevNode;
16            prevNode = currentNode;
17            currentNode = nextTemp;
18        }
19        
20        return [prevNode!, originalStart];  
21    };
22    
23    const getKthNode = (currentNode: ListNode | null): ListNode | null => {
24        let count = k;
25        while (currentNode && count > 0) {
26            currentNode = currentNode.next;
27            count--;
28        }
29        return currentNode;
30    };
31    
32    while (true) {
33        const kthNode = getKthNode(groupPrev);
34        if (!kthNode) break;  
35        
36        const nextGroupStart = kthNode.next;
37        
38        kthNode.next = null;
39        
40        const [newGroupHead, newGroupTail] = reverseLinkedList(groupPrev.next!);
41        
42        groupPrev.next = newGroupHead;
43        newGroupTail.next = nextGroupStart;
44        
45        groupPrev = newGroupTail;
46    }
47    
48    return dummy.next;
49}