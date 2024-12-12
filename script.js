/*//#####################
RREF functions
*///#####################

//TODO: Fix division bug in calculate RREF 

var choice = "";

function generateMatrix() {

  let numrows = document.getElementById("row").value;
  let numcols = document.getElementById("col").value;
  console.log("matrix generated");
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
  console.log("Function ran")

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

//TODO: Make seperate function for swap onlying doing if zero at lead

function calculateRref() {
  let numrows = document.getElementById("row").value;
  let numcols = document.getElementById("col").value;
  let matrix = getMatrixInputs(numrows, numcols);
  //let errormsg = document.getElementById("error");

/*//Testing for input validation  
for(let s = 0; s < numrows; s++){
    console.log(matrix[s] + "\n");  
    for(let m = 0; m < numcols; m++) {
        console.log(typeof matrix[s][m]);
    }

}
*/
  let lead = 0;
  for (let r = 0; r < numrows; r++) {
    if (numcols <= lead) {
      break;
    }
    let i = r;
    //go to the next non zero row
  //  console.log(matrix[i][lead]); 
    while (matrix[i][lead] === 0) {
      i++;
      //console.log(matrix[i][lead]); 
      if (i === numrows) {
        i = r;
        lead++;
        if (numcols === lead) {
          lead--;
          break;
        }
      }
    }
    //swap to first non zero matrix 
    //make into another function for neatness
     let temp = matrix[i];
     matrix[i] = matrix[r];
     matrix[r] = temp;
    //divisor to use for row operations 
    let d = matrix[r][lead];
  //  console.log(d);
    //divide whole row to get 1 in the lead position 
    for (let j = 0; j < numcols; j++) {
     if(matrix[r][0] === 1){
        break; 
      }
      else{
        matrix[r][j] /= d;
     //   console.log(matrix[r][j] /= d); 
      }
         
      //   matrix[r][j] =(isNaN(matrix[r][j]/d) ? 0: matrix[r][j]/d);
      
    //Row operations to make rref
    for (let i = 0; i < numrows; i++) {
      if (i !== r) {
        d = matrix[i][lead];
            for (let j = 0; j < numcols; j++) {
                 matrix[i][j] -= d * matrix[r][j];
              //   console.log(matrix[i][j] -= d * matrix[r][j]); 
             }
        } 
    }
    lead++;
  }
  //display the rref matrix
  displayResult(matrix);
}
function displayResult(matrix) {
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