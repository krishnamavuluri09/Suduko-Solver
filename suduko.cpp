#include <bits/stdc++.h>
using namespace std;
class Verification
{
        public:
        bool NotValid(vector<vector<int>>& board,int digit,int row,int col)
    {
        for(int i=0;i<9;i++)
        {
            if(board[row][i]==digit&&i!=col ||board[i][col]==digit&&row!=i || board[3*(row/3)+i/3][3*(col/3)+i%3]==digit&&((3*(row/3)+i/3)!=row && (3*(col/3)+i%3)!=col)) return true;
        }
        return false;
    }
    bool isValidSudoku(vector<vector<int>>& board) {
        for(int i=0;i<9;i++)
        {
            for(int j=0;j<9;j++)
            {
               if(board[i][j]!=0)
                if(NotValid(board,board[i][j],i,j)) 
                {
                    return false;
                }
            }
        }
        return true;
    }

};
class ExploreAllPossibilites 
{
    public:

    bool SolveSudoku(vector<vector<int>>& board)  
    { 
        Verification obj;
        
        if(!obj.isValidSudoku(board)) return false;
        bool canSolvable=solve(board);
       
        return true;
    }
        bool solve(vector<vector<int>>& board)
    {
            for(int i=0;i<9;i++)
            {
                for(int j=0;j<9;j++)
                {
                    if(board[i][j]==0)
                    {

                        for(int digit=1;digit<=9;digit++)
                        {
                            
                            if(isValid(board,i,j,digit))
                            {
                               board[i][j]=digit;
                               if(solve(board)) return true;
                               else {
                                 board[i][j]=0;
                             }
                            }
                        }
                         return false;
                    }
                }
            }
            return true;
    }
    bool isValid(vector<vector<int>>& board,int row,int col,int digit)
    {
        for(int i=0;i<9;i++)
        {
            if(board[row][i]==digit || board[i][col]==digit) return false; 
        }
        for(int i=0;i<9;i++)
        {
           if(board[3*(row/3)+i/3][3*(col/3)+i%3]==digit ) return false; 

        }
        return true;
    }

    void printBoard (vector<vector<int>>&board) 
    {
        for(int i=0;i<9;i++)
        {
            for(int j=0;j<9;j++)
            {
                cout<<board[i][j]<<" ";
            }
            cout<<endl;
        }
    }
};


int main() {

        vector<vector<int>>board(9,vector<int>(9));
        
        for(int i=0;i<9;i++)
            for(int j=0;j<9;j++)
                cin>>board[i][j];
                
        ExploreAllPossibilites obj;
        
        if (obj.SolveSudoku(board) == true)  
            obj.printBoard(board);  
        else
            cout << "No solution exists For Given Board";  
        
        cout<<endl;
    
    
    return 0;
}
