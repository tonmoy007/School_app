<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Converter extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();

    }


    function BanToNum($data){
        
    $search_array= array("১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০");
    $replace_array= array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
    $en_number = str_replace($search_array, $replace_array, $data);;
        // echo json_encode($arr);
        // if($val==''&&is_int((int)$data)){
        //     return $data;
        // }
        
        return (int)$en_number;


    }


 function NumToBan($data){
    
    $search_array= array("1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
    $replace_array= array("১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯", "০");
    $bn_number = str_replace($search_array, $replace_array, $data);;
        
        
        return $bn_number;


    }











}