1class Solution:
2    def palindromePairs(self, words: List[str]) -> List[List[int]]:
3        def is_palindrome(string):
4            return string == string[::-1]
5
6        words = {word: i for i, word in enumerate(words)}
7
8        palins = []
9        for word, idx in words.items():
10            for i in range(len(word) + 1):
11                prefix = word[:i]
12                suffix = word[i:]
13
14                if is_palindrome(prefix):
15                    rev = suffix[::-1]
16                    if rev != word and rev in words:
17                        palins.append([words[rev], idx])
18
19                if i != len(word) and is_palindrome(suffix):
20                    rev = prefix[::-1]
21                    if rev != word and rev in words:
22                        palins.append([idx, words[rev]])
23
24        return palins