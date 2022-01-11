

$(document).ready(function () {
    show_all_karyawan();
});

$("#tambah_data_karyawan").on("click", function () {
    var nip = $("#tambah_data .input_nip").val();
    var nama = $("#tambah_data .input_nama").val();
    var divisi = $("#tambah_data .input_divisi").val();

    if(nip == "" || nama == "" || divisi == "")
    {
        alert("data harus terisi semua");
    }
    else
    {
        $.ajax({
            url: "home/tambah_karyawan",
            type: "POST",
            dataType: "json",
            data: { "nip": nip, "nama": nama, "divisi": divisi },
            success: function (data) {
                show_all_karyawan();
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
    $('#modal_tambah_data').modal('hide')
});

$("#edit_data_karyawan").on("click", function () {
    var id = $("#edit_data .input_id").val();
    var nip = $("#edit_data .input_nip").val();
    var nama = $("#edit_data .input_nama").val();
    var divisi = $("#edit_data .input_divisi").val();

    console.log(id);
    console.log(nip);
    console.log(nama);
    console.log(divisi);

    if (nip == "" || nama == "" || divisi == "") {
        alert("data harus terisi semua");
    }
    else {
        $.ajax({
            url: "home/edit_karyawan",
            type: "POST",
            dataType: "json",
            data: { "id": id, "nip": nip, "nama": nama, "divisi": divisi },
            success: function (data) {
                show_all_karyawan();
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
    $('#modal_edit_data').modal('hide')
});

function hapus_data(e) {
    var id = e;
    $.ajax({
        url: "home/hapus_karyawan",
        type: "POST",
        dataType: "json",
        data: { "id": id},
        success: function (data) {
            show_all_karyawan();
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function show_all_karyawan() {
    $('#tbody_table').html("");
    $.ajax({
        url: "home/all_karyawan",
        type: "GET",
        dataType: "json",
        success: function (data) {

            var row = "";
            for (var i = 0; i < data.length; i++) {
                row = row + ('<tr><td>' + data[i].nip + '</td><td>' + data[i].nama + '</td><td>' + data[i].divisi + '</td><td><button type="button" class="btn btn-sm btn-warning mr-1" data-toggle="modal" data-target="#modal_edit_data" data-id="' + data[i].id + '" data-nip="' + data[i].nip + '" data-nama="' + data[i].nama + '" data-divisi="' + data[i].divisi + '">Edit</button><button class="btn btn-danger btn-sm" onClick="hapus_data(' + data[i].id + ')">Hapus</button>');
            }
            $('#tbody_table').prepend(row);
        },
        error: function (data) {
            console.log(data);
        }
    });
}