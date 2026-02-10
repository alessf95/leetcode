1export function findMedianSortedArrays(
2  nums1: number[],
3  nums2: number[],
4): number {
5  const totalLength = nums1.length + nums2.length;
6  const needsAverage = totalLength % 2 === 0;
7
8  const targetIndex = Math.floor((totalLength - 1) / 2);
9
10  let i1 = 0;
11  let i2 = 0;
12
13  
14  let current = 0;
15
16  let previous = 0;
17
18  const maxIndex = targetIndex + (needsAverage ? 1 : 0);
19
20  runThroughLists: while (i1 + i2 <= maxIndex) {
21    previous = current;
22
23    const curr1 = nums1[i1];
24    const curr2 = nums2[i2];
25
26    const firstOutOfBounds = i1 >= nums1.length;
27    const secondOutOfBounds = i2 >= nums2.length;
28    if (firstOutOfBounds && secondOutOfBounds) break runThroughLists;
29
30    if (firstOutOfBounds) {
31      current = curr2;
32      i2++;
33      continue runThroughLists;
34    }
35    if (secondOutOfBounds) {
36      current = curr1;
37      i1++;
38      continue runThroughLists;
39    }
40
41    const firstIsSmaller = curr1 <= curr2;
42    if (firstIsSmaller) {
43      current = curr1;
44      i1++;
45    } else {
46      current = curr2;
47      i2++;
48    }
49  }
50
51  if (needsAverage) {
52    const average = (current + previous) / 2;
53    return average;
54  }
55
56  return current;
57}