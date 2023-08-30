const puzzleBoard=document.getElementById("puzzle")
const solveButton=document.getElementById("solve-button")
const displaySolution=document.getElementById("solution")
const squares=81
var board=[]
for(let i=0;i<squares;i++)
  {
    const cell=document.createElement("input")
    cell.setAttribute("type","number")
    cell.setAttribute("min","1")
    cell.setAttribute("max","9")
      if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    cell.classList.add('odd-section')
  }
    puzzleBoard.append(cell)
  }
////////////////////////////////////////////////////////////////////////////
function isvalid(board,row,col,digit)
{
                 const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);

  
   for(let i=0;i<9;i++)
        {
            if(board[row][i]==digit&&i!=col ||board[i][col]==digit&&row!=i || board[startRow+Math.floor(i/3)][startCol+i%3]==digit&&startRow!=row && startCol!=col) return false;
        }
        return true;
}
////////////////////////////////////////////////////////////////////////////
function validateSuduko(board)
{
    for(let i=0;i<9;i++)
      {
        for(let j=0;j<9;j++)
          {
            if(board[i][j]!='.')
            {
                 if(!isvalid(board,i,j,String(board[i][j]))) return false;
            }
          }
      }
  return true;
}
////////////////////////////////////////////////////////////////////////////
function isSafe(board,row,col,number)
{
    for(let i=0;i<9;i++)
         {
             if(board[row][i]===number) return false;
         }
               const startRow = 3 * Math.floor(row / 3);
        const startCol = 3 * Math.floor(col / 3);

          for(let i=0;i<9;i++)
         {
             if(board[i][col]===number) return false;
             if(board[startRow+Math.floor(i/3)][startCol+i%3]===number) 
              return false;
         }

          return true;
}
///////////////////////////////////////////////////////////////////////////
function trySuduko(board)
{
 for(let i=0;i<9;i++)
      {
          for(let j=0;j<9;j++)
          {
              if(board[i][j]=='.')
              {
                //  var flag=false;
                  for(let number=1;number<=9;number++)
                  {
                 if(isSafe(board,i,j,String(number)))
            {
                  board[i][j]=String(number);
                  if(!trySuduko(board))
                  {
                      board[i][j]='.';
                      //flag=false;
                  }
                  else return true;
            }

              }                         return false;

          }
      }
}
      return true;

}
////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
const  getValues = () =>
  {
    for(let i=0,key=0;i<9;i++)
      {
          board[i]=[]
        for(let j=0;j<9;j++,key++){
       // console.log(puzzleBoard.children[key].value)
        if(puzzleBoard.children[key].value)
        {
           board[i].push(String(puzzleBoard.children[key].value))
        }
        else   board[i].push('.')
      }
      }
    ///
      var solvable=validateSuduko(board);
    if(!solvable)
    {
      
      alert("This is Not Valid Suduko Puzzle")
    }
    else{
      var solved=trySuduko(board)
      for(let i=0,key=0;i<9;i++)
        {
          for(let j=0;j<9;j++,key++)
          {
            puzzle.children[key].value=board[i][j]
          }
        }
      displaySolution.innerText="This is Your Required Valid Solution"
    }

  }

solveButton.addEventListener("click",getValues)
