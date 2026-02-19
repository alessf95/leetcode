1class Solution {
2    public int numDistinct(String s, String t) {
3        int[][]arr=new int[s.length()][t.length()];
4        for(int[]row:arr)Arrays.fill(row,-1);
5        return helper(s,t,arr,s.length()-1,t.length()-1);
6    }
7
8    private static int helper(String str1, String str2, int[][] dp, int i, int j) {
9        if(j<0)return 1;
10        if(i<0)return 0;
11        if(dp[i][j]!=-1)return dp[i][j];
12        if(str1.charAt(i)==str2.charAt(j)){
13            return dp[i][j]=helper(str1,str2,dp,i-1,j-1)+helper(str1,str2,dp,i-1,j);
14        }
15        return dp[i][j]=helper(str1,str2,dp,i-1,j);
16    }
17}