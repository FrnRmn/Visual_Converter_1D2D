// Update the matrix and vector structures
function update_build(row,col) {
    document.querySelector("#matrix_table > tbody").innerHTML = "";
    document.querySelector("#vector_table > tbody").innerHTML = "";

    // matrix 2D
    const building_block_riga = "<td class='entry'></td>"
    let riga = "<tr>"+building_block_riga.repeat(col)+"</tr>";

    for(i=0; i<row; i++){
        document.querySelector("#matrix_table > tbody").innerHTML += riga;
    }
    
    // vector 1D
    let array = "<tr>"+building_block_riga.repeat(row*col)+"</tr>";
    document.querySelector("#vector_table > tbody").innerHTML += array;

    // selectors
    document.querySelector("#sel2D").innerHTML = "2D: (" + (row-1) + ", " + (col-1) + ")";
    document.querySelector("#sel1D").innerHTML = "1D: [0-" + (row*col-1) + "]";

    //css matrix
    let size_w = 80 / row
    $("#matrix_table tr").height(size_w +"vmin")
    $("#vector_table tr").height("5vmin")

    
}

// Update
$("#update").click(function(){
    let r = $("#row").val();
    let c = $("#col").val();
    update_build(r,c);

})



// Shares the highligh color on both structures on click
function share_click() {
        const tbody = document.querySelector('#matrix_table tbody');
        tbody.addEventListener('click', function(e) {

            // extract row and col dimensions
            let r = $("#row").val();
            let c = $("#col").val();

            //restore width previous highlights
            let rest_wid = 80/r/c
            $('#vector_table .clicked').width(rest_wid+"vmin");

            // remove previous highlights
            $(".clicked").removeClass("clicked");

            // select clicked cell
            const cell = e.target.closest('td');
            if (!cell) {return;} // return if not clicked on a cell
            const row = cell.parentElement;
            col_idx = cell.cellIndex
            row_idx = row.rowIndex

            // convert on vector
            vector_idx = row_idx * c + col_idx

            // highlight on vector and matrix
            document.querySelector('#vector_table tbody').rows[0].cells[vector_idx].classList.add("clicked")
            document.querySelector('#matrix_table tbody').rows[row_idx].cells[col_idx].classList.add("clicked")

            // enter text in other inputs
            document.querySelector("#row_idx").value =""
            document.querySelector("#col_idx").value= ""
            document.querySelector("#len_idx").value= ""
            document.querySelector("#row_idx").placeholder=row_idx
            document.querySelector("#col_idx").placeholder=col_idx
            document.querySelector("#len_idx").placeholder=vector_idx

            //css vector (size_w / row) 
            if ((80/r/c) <= 2) {
                $('#vector_table .clicked').width("2vmin");
            }
        });

        const tbodyV = document.querySelector('#vector_table tbody');
        tbodyV.addEventListener('click', function(e) {
            // extract row and col dimensions
            let r = $("#row").val();
            let c = $("#col").val();

            //restore width previous highlights
            let rest_wid = 80/r/c
            $('#vector_table .clicked').width(rest_wid+"vmin");

            // remove previous highlights
            $(".clicked").removeClass("clicked");

            // select clicked cell
            const cell = e.target.closest('td');
            if (!cell) {return;} // return if not clicked on a cell
            const row = cell.parentElement;
            col_idx = cell.cellIndex;
            row_idx = row.rowIndex;

            // convert on matrix
            matrix_idx_r = Math.floor(col_idx / c);
            matrix_idx_c = col_idx % c;

            // highlight on vector and matrix
            document.querySelector('#vector_table tbody').rows[row_idx].cells[col_idx].classList.add("clicked");
            document.querySelector('#matrix_table tbody').rows[matrix_idx_r].cells[matrix_idx_c].classList.add("clicked");

            // enter text in other inputs
            document.querySelector("#row_idx").value =""
            document.querySelector("#col_idx").value= ""
            document.querySelector("#len_idx").value= ""
            document.querySelector("#row_idx").placeholder=matrix_idx_r
            document.querySelector("#col_idx").placeholder=matrix_idx_c
            document.querySelector("#len_idx").placeholder=col_idx

            //css vector (size_w / row) 
            if ((80/r/c) <= 2) {
                $('#vector_table .clicked').width("2vmin");
            }
        });
}
share_click()


function share_input() {
    document.querySelector('#len_idx').addEventListener('input', function(e){
        let len = e.target.value;
        
        // extract row and col dimensions
        let r = $("#row").val();
        let c = $("#col").val();

        //restore width previous highlights
        let rest_wid = 80/r/c
        $('#vector_table .clicked').width(rest_wid+"vmin");

        // remove previous highlights
        $(".clicked").removeClass("clicked");

        // convert on matrix
        matrix_idx_r = Math.floor(len / c);
        matrix_idx_c = len % c;

        // highlight on vector and matrix
        document.querySelector('#vector_table tbody').rows[0].cells[len].classList.add("clicked");
        document.querySelector('#matrix_table tbody').rows[matrix_idx_r].cells[matrix_idx_c].classList.add("clicked");

        // enter text in other inputs
        document.querySelector("#row_idx").value =""
        document.querySelector("#col_idx").value= ""
        document.querySelector("#row_idx").placeholder=matrix_idx_r
        document.querySelector("#col_idx").placeholder=matrix_idx_c

        //css vector (size_w / row) 
        if ((80/r/c) <= 2) {
            $('#vector_table .clicked').width("2vmin");
        }
    })


    document.querySelector("#row_idx").addEventListener('input', function(e_r){
        let row_ix = parseInt(e_r.target.value);
        let col_ix = 0
        if (document.getElementById("col_idx").value == "") {
            col_ix = parseInt(document.querySelector("#col_idx").placeholder);
            }
        else{
            col_ix = parseInt(document.querySelector("#col_idx").value);
            console.log(col_ix)
        }
        
        // extract row and col dimensions
        let r = $("#row").val();
        let c = $("#col").val();

        //restore width previous highlights
        let rest_wid = 80/r/c
        $('#vector_table .clicked').width(rest_wid+"vmin");

        // remove previous highlights
        $(".clicked").removeClass("clicked");       

        // convert on vector
        vector_idx = row_ix * c + col_ix;
        console.log(vector_idx)

        // highlight on vector and matrix
        document.querySelector('#vector_table tbody').rows[0].cells[vector_idx].classList.add("clicked");
        document.querySelector('#matrix_table tbody').rows[row_ix].cells[col_ix].classList.add("clicked");

        // enter text in other inputs
        document.querySelector("#len_idx").value = ""
        document.querySelector("#len_idx").placeholder=vector_idx;

        //css vector (size_w / row) 
        if ((80/r/c) <= 2) {
            $('#vector_table .clicked').width("2vmin");
        }
        })

    document.querySelector("#col_idx").addEventListener('input', function(e_c){
        let col_ix = parseInt(e_c.target.value);
        let row_ix = 0
       if(document.getElementById("row_idx").value == ""){
            row_ix = parseInt(document.querySelector("#row_idx").placeholder);
        }
       else{
            row_ix = parseInt(document.querySelector("#row_idx").value);
        }
        
        // extract row and col dimensions
        let r = $("#row").val();
        let c = $("#col").val();

        //restore width previous highlights
        let rest_wid = 80/r/c
        $('#vector_table .clicked').width(rest_wid+"vmin");

        // remove previous highlights
        $(".clicked").removeClass("clicked");

        // convert on vector
        vector_idx_2 = row_ix * c + col_ix;
        console.log(vector_idx_2)

        // highlight on vector and matrix
        document.querySelector('#vector_table tbody').rows[0].cells[vector_idx_2].classList.add("clicked");
        document.querySelector('#matrix_table tbody').rows[row_ix].cells[col_ix].classList.add("clicked");

        // enter text in other inputs
        document.querySelector("#len_idx").value =""
        document.querySelector("#len_idx").placeholder=vector_idx_2;

        //css vector (size_w / row) 
        if ((80/r/c) <= 2) {
            $('#vector_table .clicked').width("2vmin");
        }
        })
    
}
share_input()