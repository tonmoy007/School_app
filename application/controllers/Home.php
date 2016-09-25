<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

    /**
     * Index Page for this controller.
     *
     * Maps to the following URL
     *      http://example.com/index.php/welcome
     *  - or -
     *      http://example.com/index.php/welcome/index
     *  - or -
     * Since this controller is set as the default controller in
     * config/routes.php, it's displayed at http://example.com/
     *
     * So any other public methods not prefixed with an underscore will
     * map to /index.php/welcome/<method_name>
     * @see https://codeigniter.com/user_guide/general/urls.html
     */
    public function __construct(){
        parent::__construct();
        $this->load->library('ion_auth');
        $this->load->model('school_model');
        
        }
    public function index()
    {

        if($this->ion_auth->logged_in()){
            if($this->ion_auth->is_admin()){

                $this->load->view('admin_header');
                $this->load->view('home');
                $this->load->view('footer');

            }else{
                $this->load->view('header');
                $this->load->view('home');
                $this->load->view('footer');
            }
        }else{
            $this->load->view('home/header');
            $this->load->view('home/main_home');
            $this->load->view('home/footer');
        }
    }
    
    function getTemplate($template,$folder=null){
        if($folder!=null){
            $template=$folder.'/'.$template;
        }
        return $this->load->view($template);
    }
    public function getUser(){
       if($this->ion_auth->logged_in()){
        $user=$this->ion_auth->user()->row();
        
        if($this->ion_auth->is_admin()){
            $user_type='admin';
            $school_name='Administrator';
        }else{
            $user_type='user';
            $school_name=$user->school_name;
        }
        $response['user']=array(
            'school_name'=>$school_name,
            'id'=>$user->id,
            'address'=>$user->address,
            'username'=>$user->username,
            'user_type'=>$user_type,
            'type'=>$user->type,
            'eiin_number'=>$user->eiin_number
            );

        $response['success']=true;
        
        echo json_encode($response);
       
       }else{
        $user['logged_in']=false;
        $response['user']=null;
        $response['success']=true;
        echo json_encode($response);
       }
    }
    function getAllClasses(){

        if($this->ion_auth->logged_in()){
            $user=$this->ion_auth->user()->row();
            $response['classes']=$this->school_model->getAllClasses($user->id);
            $response['success']=true;
            echo json_encode($response);

        }
    }
    function addClass(){
        if($this->ion_auth->logged_in()){
            $user=$this->ion_auth->user()->row();
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $msg=$this->school_model->addClass($user->id,$request);
            if($msg){
                $response['success']=true;
                $response['id']=$this->db->insert_id();
                echo json_encode($response);
            }else{
                $response['success']=false;
                echo json_encode($response);
            }
        }
    }
    function editClass(){
        if($this->ion_auth->logged_in()){
            $user=$this->ion_auth->user()->row();
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $msg=$this->school_model->editClass($user->id,$request);
            if($msg){
                $response['success']=true;
                echo json_encode($response);
            }else{
                $response['success']=false;
                echo json_encode($response);
            }
        }
    }

    function submitAttendence(){
        if($this->ion_auth->logged_in()){
            $user=$this->ion_auth->user()->row();
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $msg=$this->school_model->submitAttendence($user->id,$request);
            if($msg){
                $response['success']=true;
                echo json_encode($response);
            }else{
                $response['success']=false;
                echo json_encode($response);
            }
        }
    }


    function addIrregularStudent(){
        if($this->ion_auth->logged_in()){
            
            $user=$this->ion_auth->user()->row();
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            
            $msg=$this->school_model->addIrregularStudent($user->id,$request);
            if($msg){
                $response['success']=true;
                $response['id']=$this->db->insert_id();
                echo json_encode($response);
            }else{
                $response['success']=false;
                echo json_encode($response);
            }
        }
    }
    function getAllIRStudents(){

        if($this->ion_auth->logged_in()){
            $user=$this->ion_auth->user()->row();
            $response['students']=$this->school_model->getAllIRStudents($user->id);
            $response['success']=true;
            echo json_encode($response);
        }

    }

    function getAllSchools(){
        if($this->ion_auth->is_admin()){
            $response['schools']=$this->school_model->getAllSchools();
            $response['success']=true;
            echo json_encode($response);
        }
    }


    function getSchoolAttendence(){
        $id=$this->input->get('id');
        if($this->ion_auth->is_admin()&&$id!=null){
            $response['attendance']=$this->school_model->getSchoolAttendence($id);
            $response['school_info']=$this->school_model->getUserInfo($id);
            $response['success']=true;
            echo json_encode($response);
        }

    }

    function addSchool(){
        if($this->ion_auth->is_admin()){
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $msg=$this->school_model->addSchool($request);
            if($msg){
                $response['success']=true;
                $response['id']=$this->db->insert_id();
                echo json_encode($response);
            }else{
                $response['success']=false;
                echo json_encode($response);
            }
             
        }
    }

    function submitReport($type=null){
        
        if($this->ion_auth->logged_in()&&$type!=null){

            $user=$this->ion_auth->user()->row();
            $postdata = file_get_contents("php://input");
            $request = json_decode($postdata);
            $type='report_'.$type;
            $data=array();
            foreach($request as $key=>$value){
                $data[$key]=$value;
            }
            $data['school_id']=$user->id;
            $msg=$this->school_model->submit_report($type,$data);
            if($msg){
                $response['id']=$this->db->insert_id();
                $response['success']=true;
                $response['msg']='Report is successfully submitted !!';
                echo json_encode($response);
            }else{

                $response['success']=false;
                $response['msg']='Report is not submitted correctly !!';
            }
        }
    }

    function getInfrastructure_data(){

        if($this->ion_auth->logged_in()&&$this->ion_auth->is_admin()){
            $response=array();
            $info['no_wall_count']=array('text'=>'সীমানা প্রাচীর নেই এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_shikhon_poribesh','wall','নাই'));
            $info['no_toilet_count']=array('text'=>'শিক্ষার্থীদের টয়লেট নেই এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_shikhon_poribesh','toilet','ব্যবস্থা নেই'));
            $info['no_safe_drinking_water_count']=array('text'=>'শিক্ষার্থীদের নিরাপদ পানীয় জলের ব্যবস্থা নেই এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_shikhon_poribesh','safe_drinking_water','ব্যবস্থা নেই'));
            $info['no_class_teacher']=array('text'=>'পর্যাপ্ত শ্রেণীশিক্ষক নেই এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_shikhon_poribesh','class_teacher','নাই'));
            $response['info']=$info;
            $response['success']=true;
            echo json_encode($response);
        }

    }

    function getAnnualInfo(){
        if($this->ion_auth->logged_in()&&$this->ion_auth->is_admin()){
            $response=array();
            $info['annual_5th'][]=array('text'=>'পঞ্চবার্ষিক উন্নয়ন পরিকল্পনা করে এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_annual_development','fifth_annual_dev','হ্যাঁ'));
            $info['annual_5th'][]=array('text'=>'পঞ্চবার্ষিক উন্নয়ন পরিকল্পনা করেনা এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_annual_development','fifth_annual_dev','না'));
            $info['annual'][]=array('text'=>'বার্ষিক উন্নয়ন পরিকল্পনা করে এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_annual_development','annual_dev','হ্যাঁ'));
            $info['annual'][]=array('text'=>'বার্ষিক উন্নয়ন পরিকল্পনা করেনা এরুপ প্রতিষ্ঠানের সংখ্যা','data'=>$this->school_model->getCount('report_annual_development','annual_dev','না'));
            $response['info']=$info;
            $response['success']=true;
            echo json_encode($response);
        }
    }

    function getMeetingInfo(){
        if($this->ion_auth->logged_in()&&$this->ion_auth->is_admin()){
            $table='report_meeting_details';
            $response=array();
            $info['header'][]='সভা';
            $info['header'][]='সভা অনুষ্ঠিত হয়েছে এরুপ প্রতিষ্ঠানের সংখ্যা';
            $info['header'][]='রেজিস্টার সংরক্ষঙ্কারী প্রতিষ্ঠানের সংখ্যা';
            $info['header'][]='রেজিস্টার সংরক্ষণ করেনা এরুপ প্রতিষ্ঠানের সংখ্যা';
            $info['header'][]='এসএমসির সমস্যা সংক্রান্ত প্রতিষ্ঠানের সংখ্যা';

            $info['body'][0][]='পূর্ণ শিক্ষক সভা';
            $info['body'][0][]=$this->school_model->getCount($table,'full_teacher_meeting','হ্যাঁ');
            $info['body'][0][]=$this->school_model->getCount($table,'ftm_register','হ্যাঁ');
            $info['body'][0][]=$this->school_model->getCount($table,'ftm_register','না');

            $info['body'][1][]='বিষয় ভিত্তিক সভা';
            $info['body'][1][]=$this->school_model->getCount($table,'subjective_meeting','হ্যাঁ');
            $info['body'][1][]=$this->school_model->getCount($table,'sm_register','হ্যাঁ');
            $info['body'][1][]=$this->school_model->getCount($table,'sm_register','না');

            $info['body'][2][]='এসএমসি সভা';
            $info['body'][2][]=$this->school_model->getCount($table,'smc_meeting','হ্যাঁ');
            $info['body'][2][]=$this->school_model->getCount($table,'smc_register','হ্যাঁ');
            $info['body'][2][]=$this->school_model->getCount($table,'smc_register','না');
            $info['body'][2][]=$this->school_model->getCommentCount();

            $info['body'][3][]='পিটিএ সভা';
            $info['body'][3][]=$this->school_model->getCount($table,'pta_meeting','হ্যাঁ');
            $info['body'][3][]=$this->school_model->getCount($table,'pta_register','হ্যাঁ');
            $info['body'][3][]=$this->school_model->getCount($table,'pta_register','না');
            $response['info']=$info;
            $response['success']=true;
            echo json_encode($response);  
        }
    }

    function getResultDetails(){
        if($this->ion_auth->logged_in()&&$this->ion_auth->is_admin()){
            $response=array();
            $info['header'][]='পরিক্ষার নাম';
            $info['header'][]='অংশগ্রহণকারী শিক্ষার্থীর সংখ্যা';
            $info['header'][]='কৃতকার্য শিক্ষার্থীর সংখ্যা';
            $info['header'][]='পাসের হার (%)';

            
            $participant_jsc=$this->school_model->getExamData('jsc_participants');
            $pass_jsc=$this->school_model->getExamData('jsc_pass_students');
            $participant_ssc=$this->school_model->getExamData('ssc_participants');
            $pass_ssc=$this->school_model->getExamData('ssc_pass_students');
            
            $info['body'][0][]='জে.এস.সি./ জে.ডি.সি.';
            $info['body'][0][]=$participant_jsc;
            $info['body'][0][]=$pass_jsc;
            $info['body'][0][]=$this->school_model->getPercentage($pass_jsc,$participant_jsc);


            $info['body'][1][]='এস.এস.সি./ দাখিল';
            $info['body'][1][]=$participant_ssc;
            $info['body'][1][]=$pass_ssc;
            $info['body'][1][]=$this->school_model->getPercentage($pass_ssc,$participant_ssc);
            
            $response['info']=$info;
            echo json_encode($response);
        }

    }

    function addNotice(){
        if($this->ion_auth->logged_in()&&$this->ion_auth->is_admin()){
            $this->load->model('uploadModel');
            $request = $this->input->post();
            $user=$this->ion_auth->user()->row();
            // echo json_encode($request);
            $data['notice_title']=$request['title'];
            $data['created']=date('Y-m-d H:i:s');
            $data['user_id']=$user->id;
            $path='uploads/notices/';
            $table_name='notices';
            $file_name='notice_file';
            $id=$this->school_model->insertNotice($data);

            if($id){
                $file=array();
                $file_info=$this->uploadModel->upload_data($id,$path,$file_name,$table_name);
               
                if($file_info['success'])
                    $file['success']=true;
                    $file['notices']=$this->school_model->getAllNotice();
                echo json_encode($file);
            }else{
                $file['success']=false;
                echo json_encode($file);
            }

        }
    }

    function getAllNotice(){

        $response['notices']=$this->school_model->getAllNotice();
        echo json_encode($response);
    }

    function getReport($type){
        if($this->ion_auth->logged_in()){
            $user=$this->ion_auth->user()->row();
            $table='report_'.$type;
            $report=$this->school_model->getReport($table,$user->id);
            echo json_encode($report);
        }
    }

    function getAttendence(){
        if($this->ion_auth->logged_in()){
            $attendence=$this->school_model->getTotalAttendence();
            echo json_encode($attendence);
        }

    }













}
