1function isMatch(s: string, p: string): boolean {
2    const _isMatch = _.memoize((ptrS:number, ptrP:number):boolean => {
3        if(ptrS >= s.length) {
4            if(ptrP<p.length && p[p.length - 1] !== '*') return false;
5            while(ptrP+1<p.length) {
6                if(p[ptrP+1]!=='*') return false;
7                ptrP+=2;
8            }
9            return true;
10        }
11        if(ptrP >= p.length) return false;
12     
13        const nextIsStar = ():boolean => ptrP+1 < p.length && p[ptrP+1] ==='*';
14        const currIsMatch = ():boolean => s[ptrS] === p[ptrP] || p[ptrP]==='.';
15        
16        if (!nextIsStar() && currIsMatch())
17            return _isMatch(ptrS+1, ptrP+1);
18        
19        if (nextIsStar() && currIsMatch())
20            return _isMatch(ptrS+1, ptrP) || _isMatch(ptrS, ptrP+2);
21
22        if (nextIsStar() && !currIsMatch()) 
23            return _isMatch(ptrS, ptrP+2);
24
25        return false;        
26    }, (...args)=>JSON.stringify(args))
27	return _isMatch(0,0)
28}