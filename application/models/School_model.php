<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class School_model extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();

    }
    function getAllClasses($user_id,$index=0){
        $this->db->select('*');
        if($user_id!=null)$this->db->where('user_id',$user_id);
        $this->db->from('class');
        $this->db->limit(5,$index);
        $query=$this->db->get();
        $i=0;
        $data=array();
        foreach($query->result_array() as $row){
            $data[]=$row;
            $present=$this->getAttendence($row['id']);
            $data[$i]['present']=$present['present'];
            $i++;
        }
        return $data;
    }
    function getClassName($id){
        $query=$this->db->select('class_name')->where('id',$id)->from('class')->get();
        $data;
        foreach($query->result_array() as $row){
            $data=$row['class_name'];
        }
        return $data;
    }
    function addClass($user_id,$request){
        $data=array(
            'class_name'=>$request->class_name,
            'total_student'=>$request->total_student,
            'section'=>$request->section,
            'user_id'=>$user_id
            );
        if($this->db->insert('class',$data)){
            return true;
        }else{
            return false;
        }
    }
    function editClass($user_id,$request){
        $data=array(
            'class_name'=>$request->class_name,
            'total_student'=>$request->total_student,
            'section'=>$request->section,
            );
        $this->db->where('id',$request->id);
        if($this->db->update('class',$data)){
            return true;
        }else{
            return false;
        }
    }
    function submitAttendence($user_id,$request){
        // var_dump($request);
        foreach($request as $row){

            $data=array(
                    'class_id'=>$row->id,
                    'present'=>$row->present,
                    'date'=>date('Y-m-d'),
                    'time'=>time()
                    );
            $present=$this->getAttendence($row->id);
            if($present){
                $this->db->where('id',$present['id']);
                $this->db->update('attendance',$data);
            }else{
                if($this->db->insert('attendance',$data)){
                continue;
                }else{
                    return false;
                }
            }
        }
        return true;
    }


    function addIrregularStudent($user_id,$request){

        $data=array(
                'student_name'=>$request->student_name,
                'd_from'=>$request->d_from,
                'd_to'=>$request->d_to,
                'reason'=>$request->reason,
                'class_id'=>$request->class_id,
                'user_id'=>$user_id
            );
        if($this->db->insert('irregular_student',$data)){
            return true;
        }else{
            return false;
        }

    }

    function getAllIRStudents($user_id=null,$index=0,$length=5){
        $this->db->select('*');
        $this->db->from('irregular_student');
        
        if($user_id!=null)
            $this->db->where('user_id',$user_id);

        if($length!=null)
            $this->db->limit(5,$index);
            $query=$this->db->get();
            $data=array();
        foreach($query->result_array() as $row){
            $row['class_name']=$this->getClassName($row['class_id']);
            $data[]=$row;

        }
        
        if($length!=null){
            $response['students']=$data;
            $response['total']=$query->num_rows();
        }

        return $data;

    }

    function getAllSchools($index=0){
        $this->db->select('users.eiin_number,users.school_name,users.address,users.phone,users.id,users.zilla,users.upozilla,users.management,users.email,users.type,users.website');
        $this->db->from('users');
        $this->db->join('users_groups','users.id=users_groups.user_id');
        $this->db->where('users_groups.group_id',3);
        $this->db->limit(5,$index);
        $query=$this->db->get();
        $data=array();
        foreach($query->result_array() as $row){
            $data[]=$row;
        }
        return $data;
    }

    function getAttendence($class_id,$today=true){
        $date=new DateTime();
        
        $this->db->select('present,id');
        $arg=array();
        

        
        if($today){
            $arg=array('class_id'=>$class_id,'date'=>$date->format('Y-m-d'));
        }else{
            $arg=array('class_id'=>$class_id);
        }
        $this->db->where($arg);
        $this->db->from('attendance');
        $query=$this->db->get();
        $data=array();
        if($query->num_rows()>0){
            foreach($query->result_array() as $row){
                $data[]=$row;
            }
        }else{
            $data[0]=false;
        }
        if($today){
            return $data[0];
        }else{
            return $data;   
        }
    }

    function getSchoolAttendence($user_id){
        $this->db->select('class.class_name,class.total_student,attendance.class_id,attendance.present,attendance.date,attendance.time');
        $this->db->from('attendance');
        $this->db->join('class','class.id=attendance.class_id');
        $this->db->where('class.user_id',$user_id);
        $this->db->order_by('attendance.updated','desc');
        $query=$this->db->get();
        $data=array();
        $date='';
        $index=0;
        $total=0;
        $present=0;
        if($query->num_rows()>0){
            foreach($query->result_array() as $row){
                if($date=='')$date=$row['date'];
                if($date==$row['date']){
                    $total+=(int)$row['total_student'];
                    $present+=(int)$row['present'];
                    $data[$index][]=$row;
                }else{
                    $data[$index][0]['total_present']=$present;
                    $data[$index][0]['full_student']=$total;
                    $index++;
                    $date=$row['date'];
                    $data[$index][]=$row;
                    $total=(int)$row['total_student'];
                    $present=(int)$row['present'];
                }
            }

                $data[$index][0]['total_present']=$present;
                $data[$index][0]['full_student']=$total;

            return $data;
        }else{
            return false;
        }
    }

    function getUserInfo($user_id){
        $this->db->select('username,school_name,address,phone,id,zilla,upozilla,type,management,eiin_number,email,website');
        $this->db->from('users');
        $this->db->where('id',$user_id);
        $query=$this->db->get();
        $data=array();
        foreach($query->result_array() as $row){
            $data[]=$row;
        }
        return $data[0];

    }
    function addSchool($request){

        if(empty($request->eiin_number)||empty($request->school_name)||empty($request->password)||empty($request->email)){
            $response['msg']='Invalid form data';
            $response['succsess']=false;
            return $response;
        }
        else{
            $eiin_number=$request->eiin_number;
            $password=$request->password;
            $email=$request->email;
            $additional_data=array(
                'school_name'=>$request->school_name,
                'zilla'=>(!empty($request->zilla))?$request->zilla:'',
                'upozilla'=>(!empty($request->upozilla))?$request->upozilla:'',
                'phone'=>(!empty($request->phone))?$request->phone:'',
                'address'=>(!empty($request->address))?$request->address:'',
                'management'=>(!empty($request->management))?$request->management:'',
                'type'=>(!empty($request->type))?$request->type:'',
                'website'=>(!empty($request->website))?$request->website:'',
                );
            if($this->ion_auth->register($eiin_number,$password,$email,$additional_data)){

                
                return true;
            }else{

                return fasle;
            }
        }
    }


    function submit_report($type,$request){
        $request['created']=date('Y-m-d H:i:s');
        
        if($this->db->insert($type,$request)){
            return true;
        }else{
            return false;
        }

    }


    function getCount($from,$of,$value){
        
        $count=$this->db->select('*')
                ->from($from)
                ->where($of,$value)->group_by('school_id')->get()->num_rows();
        return  $count;
    }
    function getCommentCount(){
        $count=$this->db->query('SELECT * FROM report_meeting_details WHERE smc_comments IS NOT NULL GROUP BY school_id')->num_rows();
        return $count;
    }
    function getExamData($type){
        

            $this->load->model('converter');  
            
            $total=$this->getTotal($type);
            
            return $this->converter->NumToBan($total);


    }

    function getTotal($type){
         
         $this->load->model('converter');
         $query=$this->db->select($type)
                    ->from('report_result_details')
                    ->group_by('school_id')->get();
            $total=0;
            foreach($query->result_array() as $row){
                $total+=$this->converter->BanToNum($row[$type]);
            }
        return $total;

    }

    function getPercentage($pass,$total){
        $this->load->model('converter');
        $in_pass=$this->converter->BanToNum($pass);
        $in_total=$this->converter->BanToNum($total);

        $parcent=(double)($in_pass/$in_total)*100;
        $ret=number_format($parcent, 2, '.', '');
        return $this->converter->NumToBan($ret);

    }

    function insertNotice($data){

        if($this->db->insert('notices',$data)){
            $id=$this->db->insert_id();
            return $id;
        }else{
            return false;
        }

    }
    function getAllNotice(){
        $notices=$this->db->select('*')
            ->from('notices')->order_by('created','desc')->get();
        $i=0;
        $path='uploads/notices/';
        $response=array();
        foreach($notices->result_array() as $row){
            if(file_exists($path.$row['notice_file'])){
                $row['notice_file']=pathinfo($path.$row['notice_file']);
            }else{
                $row['notice_file']=false;
            }
            
            $exp_date=date_create($row['created']);
            $row['created']=$exp_date->format('l jS M, Y');

            $now_date=date_create(date('Y-m-d H:i:s'));

            $diff=date_diff($exp_date,$now_date);
            $day=$diff->days;
            $row['diff']=$diff;
            if($day<1){
                $row['new']=true;
            }
            $response[]=$row;
        }
        return $response;
    }

    function getReport($table,$userid){
        $query=$this->db->select('*')->from($table)->where('school_id',$userid)->get();
        $question_array=$this->getQuestionArray();
        $data=array();
        foreach($query->result_array() as $row){
            $data['body']=$row;
        }
        foreach($data['body'] as $key=>$value){
            if($key!='created'&&$key!='last_updated'&&$key!='id'&&$key!='school_id'){
                $data['head'][$key]=$question_array[$key];
            };
            
        }
        return $data;

    }

    function getQuestionArray(){
        $query=$this->db->select('*')->from('reports_questions')->get();
        $data=array();
        foreach($query->result_array() as $row){
            $data[$row['question_patt']]=$row['question'];
        }
        return $data;
    }

    function getTotalAttendence(){

        $schools=$this->getAllSchools();
        $totslStudents=0;
        $present=0;
        foreach($schools as $row){
            
            $classes=$this->getAllClasses($row['id']);
              foreach($classes as $class){
                $totslStudents+=(int)$class['total_student'];
                $present+=(int)$class['present'];
              }
        }

        return array('total'=>$totslStudents,'present'=>$present);

    }













   



}