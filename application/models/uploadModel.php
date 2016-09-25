<?php

if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

class UploadModel extends CI_Model
    {

    protected $path_img_upload_folder;
    protected $path_img_thumb_upload_folder;
    protected $path_url_img_upload_folder;
    protected $path_url_img_thumb_upload_folder;
    protected $delete_img_url;

    function __construct()
        {
        
        parent::__construct();
        
        
        $this->load->library('ion_auth');
        $this->load->helper(array('url','html','form'));
        $user=$this->ion_auth->user()->row();
//Set relative Path with CI Constant
//          
        
        $this->setPath_img_upload_folder("assets/uploads/".$user->id."/");
        $this->setPath_img_thumb_upload_folder("assets/uploads/".$user->id."/"."thumb/");

        
//Delete img url
        $this->setDelete_img_url(base_url() . 'upload/deleteImage/');
 

//Set url img with Base_url()
        $this->setPath_url_img_upload_folder(base_url() . "assets/uploads/".$user->id."/");
        $this->setPath_url_img_thumb_upload_folder(base_url() ."assets/uploads/".$user->id."/"."thumb/");
         }

  


function upload_data($id,$path=null,$name=null,$table_name=null) {


//         $name = $_FILES['file']['name'];
//         $name = strtr($name, 'ÀÁÂÃÄÅÇÈÉÊËÌÍÎÏÒÓÔÕÖÙÚÛÜÝàáâãäåçèéêëìíîïðòóôõöùúûüýÿ', 'AAAAAACEEEEIIIIOOOOOUUUUYaaaaaaceeeeiiiioooooouuuuyy');

// // remplacer les caracteres autres que lettres, chiffres et point par _

//          $name = preg_replace('/([^.a-z0-9]+)/i', '_', $name);
        

        
        
    if(!empty($id)){
        
        if($path==null){
            $path = $this->getPath_img_upload_folder().'/';
        }
        

        if(!is_dir($path)) //create the folder if it's not already exists
        {
          mkdir($path,0755,TRUE);
          mkdir($path.'thumb',0755,TRUE);
        } 

        //Your upload directory, see CI user guide
        
        $config['upload_path'] =  $path;
        $config['allowed_types']= 'gif|jpg|png|pdf|doc|docx|txt';
        
        $config['max_size'] = '8000000';
        $config['encrypt_name'] = TRUE;

       //Load the upload library
        $this->load->library('upload', $config);
        $upload=$this->do_upload($name);
        if($upload['success']){
            $data = $this->upload->data();
            // echo json_encode($id);
            if(!empty($id)&&$table_name!=null&&$name!=null){

                $this->db->where('id', $id);
                $this->db->update($table_name,  array($name => $this->db->escape_like_str($data['file_name']) ));
                

            }

        

                $config['new_image'] = $path.'thumb/';
                $config['image_library'] = 'gd2';
                $config['source_image'] = $path.''.$data['file_name'];
                $config['create_thumb'] = FALSE;
                $config['maintain_ratio'] = TRUE;
                $config['width'] = 220;
                $config['height'] = 180;
                
                $config['allowed_types']= 'gif|jpg|png';
                $this->load->library('image_lib', $config);
                $this->image_lib->resize();

            
           

            //Get info 
            
            $info['name'] = $data['file_name'];
            $info['size'] = $data['file_size'];
            $info['type'] = $data['file_type'];
            $info['url'] = $path.$data['file_name'];
            $info['thumb_url'] = $path.'thumb/' . $data['file_name']; //I set this to original file since I did not create thumbs.  change to thumbnail directory if you do = $upload_path_url .'/thumbs' .$name
            
            $info['success']=true;
            return $info;

        }else{
            return $upload;
        }




    }
}
//Function for the upload : return true/false
public function do_upload($str) {
    // echo $str;
        if (!$this->upload->do_upload($str)) {
            $error = array('error' => $this->upload->display_errors(),'success'=>false);

            return $error;
        } else {
            //$data = array('upload_data' => $this->upload->data());
            $data=array('success'=>true);
            return $data;
        }
     }

public function getPath_img_upload_folder() {
        return $this->path_img_upload_folder;
    }

public function setPath_img_upload_folder($path_img_upload_folder) {
        $this->path_img_upload_folder = $path_img_upload_folder;
    }

public function getPath_img_thumb_upload_folder() {
        return $this->path_img_thumb_upload_folder;
    }

public function setPath_img_thumb_upload_folder($path_img_thumb_upload_folder) {
        $this->path_img_thumb_upload_folder = $path_img_thumb_upload_folder;
    }

public function getPath_url_img_upload_folder() {
        return $this->path_url_img_upload_folder;
    }

public function setPath_url_img_upload_folder($path_url_img_upload_folder) {
        $this->path_url_img_upload_folder = $path_url_img_upload_folder;
    }

public function getPath_url_img_thumb_upload_folder() {
        return $this->path_url_img_thumb_upload_folder;
    }

public function setPath_url_img_thumb_upload_folder($path_url_img_thumb_upload_folder) {
        $this->path_url_img_thumb_upload_folder = $path_url_img_thumb_upload_folder;
    }

public function getDelete_img_url() {
        return $this->delete_img_url;
    }

public function setDelete_img_url($delete_img_url) {
        $this->delete_img_url = $delete_img_url;
    }
public function getallFiles($path){
    $this->load->helper('file');
    $files=get_filenames($path);
    return $files;
}






































    }
