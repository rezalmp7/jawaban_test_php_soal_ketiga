<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
    function __construct()
    {
        parent::__construct();

        $this->load->model("M_admin");
    }
	public function index()
	{
		$this->load->view('home');
	}
    public function all_karyawan()
    {
        $karyawan = $this->M_admin->select_all('karyawan')->result_array();

		$json_return = json_encode($karyawan);

		print_r($json_return);

		return $json_return;
    }
    public function tambah_karyawan()
    {
        $data = $this->input->post();
        // now I can get account and passwd by array index
        $nip = $data["nip"];
        $nama = $data["nama"];
        $divisi = $data["divisi"];

        $data = array(
            'nip' => $nip, 
            'nama' => $nama, 
            'divisi' => $divisi, 
        );

        $this->M_admin->insert_data('karyawan', $data);

        $karyawan = $this->M_admin->select_all('karyawan')->result_array();

		$json_return = json_encode($karyawan);

		print_r($json_return);

		return $json_return;
    }
    public function edit_karyawan()
    {
        $data = $this->input->post();
        // now I can get account and passwd by array index
        $id = $data['id'];
        $nip = $data["nip"];
        $nama = $data["nama"];
        $divisi = $data["divisi"];

        $where = array('id' => $id, );

        $set = array(
            'nip' => $nip, 
            'nama' => $nama, 
            'divisi' => $divisi, 
        );

        $this->M_admin->update_data('karyawan', $set, $where);

        $karyawan = $this->M_admin->select_all('karyawan')->result_array();

		$json_return = json_encode($karyawan);

		print_r($json_return);

		return $json_return;
    }
    public function hapus_karyawan()
    {
        $data = $this->input->post();
        // now I can get account and passwd by array index
        $id = $data['id'];

        $where = array('id' => $id, );

        $this->M_admin->delete_data('karyawan', $where);

        $karyawan = $this->M_admin->select_all('karyawan')->result_array();

		$json_return = json_encode($karyawan);

		print_r($json_return);

		return $json_return;
    }
}
