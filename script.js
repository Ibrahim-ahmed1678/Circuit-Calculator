/*//#####################
RREF functions
*///#####################

//TODO: Fix division bug in calculate RREF 

var choice = "";

function generateMatrix() {

  let numrows = document.getElementById("row").value;
  let numcols = document.getElementById("col").value;
  //console.log("matrix generated");
  const matrix = document.getElementById("matrix");
  const table = document.createElement("table");
  var tbdy = document.createElement('tbody');

  matrix.innerHTML = "";

  for (let i = 0; i < numrows; i++) {
    var row = document.createElement("tr");
    for (let j = 0; j < numcols; j++) {
      var col = document.createElement("td");
      var datawrapper = document.createElement("div");
      //Datawrapper so that the input can be placed in the center of the UI
      datawrapper.classList.add("datawrapper");
      //Creates inputs
      var input = document.createElement("input");
      var variable = document.createElement("label");
      //styling 
      input.type = "text";
      input.style.width = "60px";
      //make new function for this 
      input.id = `cell-${i}-${j}`;
      if (j < numcols - 1) {
        variable.innerHTML = choice + (j + 1);
      }


      datawrapper.appendChild(input);
      datawrapper.appendChild(variable);
      col.appendChild(datawrapper);
      row.appendChild(col);
    }

    tbdy.appendChild(row)
  }
  table.appendChild(tbdy);

  matrix.appendChild(table);
}

function getMatrixInputs(numrows, numcols) {

  let matrix = [];
  for (let i = 0; i < numrows; i++) {
    let row = [];
    for (let j = 0; j < numcols; j++) {
      //converts string input to floating point value  
      let value = parseFraction(document.getElementById(`cell-${i}-${j}`).value);
//console.log(value); 
      //pushes zero if value is undefined to the row array 
      row.push(parseFloat(isNaN(value) ? 0 : value));
    }
    matrix.push(row);
  }
 // console.log("Function ran")

  return matrix;
}

//function to convert fraction char '/' to decimal value
function parseFraction(num) {
  let parts = num.split("/");

  if (parts.length === 2) {
    let numerator = parseFloat(isNaN(parts[0]) ? 0 : parts[0]);
    let denominator = parseFloat(isNaN(parts[1]) ? 0 : parts[1]);
    if (denominator === 0 && numerator === 0) {
      denominator = 1;
    }
    if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
      return numerator / denominator;
    }
  }
  // console.log(numerator / denominator)
  return num; // Invalid input
}

//TODO: Make seperate function for swap onlying doing if zero at diagonal
//TODO: Make seperate funciton to find divisor for neatness 
//TODO: Make seperate for elementary row operations 

function calculateRref() {
    //Fetch Input values
    let rows = parseInt(document.getElementById("row").value);
    let cols = parseInt(document.getElementById("col").value);
    let mat = getMatrixInputs(rows, cols);

  // Start with the first leading column
    let leadIndex = 0;
  //let errormsg = document.getElementById("error");

/*Testing for input validation  
for(let s = 0; s < rows; s++){
    console.log(mat[s] + "\n");  
    for(let m = 0; m < cols; m++) {
        console.log(typeof mat[s][m]);
    }

}
*/

  for (let r = 0; r < rows; r++) {
     if (leadIndex >= cols) {
        break;
    }

    let pivotRow = r;
    //go to the next non zero row
  //  console.log(mat[pivotRow][leadIndex]); 
  while (mat[pivotRow][leadIndex] === 0) {
    pivotRow++;
    if (pivotRow === rows) {
        pivotRow = r;
        leadIndex++;
        if (leadIndex === cols) {
            leadIndex--;
            break;
        }
    }
}
  
      //  console.log(pivotVal);
      //  console.log(leadIndex);
        
    //console.log(mat[pivotVal][leadIndex]); 
    //swap to first non zero matrix 
    //make into another function for neatness
     swapRows(mat, pivotRow, r);

    
    //divisor to use for row operations 
    let pivotVal = mat[r][leadIndex];
    //  console.log(d);
    divideRow(mat, pivotVal, r, cols);
    //Row operations to make rref
     rowOperation(mat, leadIndex, pivotVal, r, rows, cols); 
     diagonal++;
    }
  //display the rref matrix
  displayResult(mat);
}
/*function checkDiagZero(matrix, i, numrows, diagonal, numcols){
    while (matrix[i][diagonal] === 0) {
        //    i = (i < numrows)
            i++;
          //  console.log(i);
          //  console.log(diagonal);
            
            //console.log(matrix[i][diagonal]); 
            if (i === numrows) {
              i = r;
              diagonal++;
              if (numcols === diagonal) {
                diagonal--;
                break;
              }
            }
    }
}
  */

function swapRows(mat, r, pivotRow){
      [mat[pivotRow], mat[r]] = [mat[r], mat[pivotRow]];
}

function divideRow(mat, pivotVal, r,cols){
    //divide whole row to get 1 in the diagonal position 

      for (let c = 0; c < cols; c++) {
        //      if(mat[r][0] === 1){
         //  break; 
      //   }
       //  else{
          
          // mat[r][j] = (isNaN(mat[r][c] / pivotVal) ? 0 : mat[r][c] / pivotVal);
          // matrix[r][j] /= d; 

      // }
      //   mat[r][c] =(isNaN(mat[r][c]/pivotVal) ? 0: mat[r][c]/pivotVal);                
       mat[r][c] /= pivotVal;
      }
          
}
function rowOperation(mat, leadIndex, r, rows, cols){
 for (let otherRow = 0; otherRow < rows; otherRow++) {
          if (otherRow !== r) {
              const scale = mat[otherRow][leadIndex];
              for (let c = 0; c < cols; c++) {
                  mat[otherRow][c] -= scale * mat[r][c];
              }
          }
     }
}

function displayResult(mat) {
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous results

  let table = document.createElement("table");
  //loops through any array, executing a provided function once for each array element in ascending index order
  matrix.forEach(row => {
    let tr = document.createElement("tr");
    row.forEach(value => {
      let td = document.createElement("td");
      td.innerHTML = value.toFixed(2);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  resultDiv.appendChild(table);

  getFinalAnswers(matrix);

}


function getFinalAnswers(matrix) {
  const numcols = document.getElementById("col").value

  let finalAnswersDiv = document.getElementById("final-answers");
  finalAnswersDiv.innerHTML = ""; // Clear previous results
  for (let i = 0; i < matrix.length; i++) {
    let answer = document.createElement("p");
    answer.innerHTML = choice + (i + 1) + " = " + matrix[i][numcols - 1].toFixed(2);
    finalAnswersDiv.appendChild(answer);
  }
}
function refreshButton() {

  let refresh = document.createElement("BUTTON");
  let refreshButton = document.getElementById("refresh");
  refreshButton.innerHTML = ""; //clear previous button
  refresh.textContent = "Refresh";
  refresh.addEventListener("click", clearPage);
  refreshButton.appendChild(refresh);
}
function clearPage() {
  document.getElementById("matrix").innerHTML = "";
  document.getElementById("result").innerHTML = "";
  document.getElementById("final-answers").innerHTML = "";
  document.getElementById("refresh").innerHTML = "";
}

//opens prompt after button node/mesh is clicked
/*function openPrompt(){
  let prompt = document.getElementById("prompt");
  let inputdiv = document.getElementById("userinput")
  let input = document.createElement("input");
  
  prompt.innerHtml = "Number of" + choice + "s:";
  input.type = "number"; 
  inputdiv.appendChild(input);
  
}
*/