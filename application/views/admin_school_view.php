<md-content class="no-overflow" layout-xs="column" layout="row" id="school_attendence">
   <md-card flex="100">
    <div  ng-cloak>
        <div flex layout="column">
        <md-card-title class="text-left" layout="row">
            <md-icon class=" md-avatar no-circle m-r-1 md-primary"  md-svg-icon="assets/img/accessories/school.svg"></md-icon>
            <h2>{{school_info.school_name}}</h2>
            <span flex></span>
        </md-card-title>
        <div flex class="school-description" layout-md-sm="row" layout-md-xs="column">
            <label layout-padding>EIIN নাম্বার : <strong>{{school_info.eiin_number}}</strong></label>
            <label layout-padding>ই-মেইল : <strong>{{school_info.email}}</strong></label>
            <label layout-padding>ধরন : <strong>{{school_info.type}}</strong></label>
            <label layout-padding>জেলা : <strong>{{school_info.zilla}}</strong></label>
            <label layout-padding>উপজেলা : <strong>{{school_info.upozilla}}</strong></label>
        </div>
        </div>
        <md-divider></md-divider>
        <div flex layout-padding ng-if="school_attendence.length">
            <h3>নিয়মিত উপস্থিতি</h3>
        </div>
        <div class="" flex layout="column" ng-repeat="(key,atttendence) in school_attendence track by $index">
        <md-toolbar class="md-hue-1 button"   data-toggle="collapse" data-target="#{{'collapse'+$index}}">
            <div class="md-toolbar-tools" >
                <h4 class=""><span>Attendence of <strong class="md-accent">{{atttendence[0].date}}</strong></span></h4>
                <span flex></span>
                <h4>Total Students <strong class="md-accent">{{atttendence[0].full_student}}</strong></h4>&nbsp;&nbsp;
                <h4>Attendence <strong class="md-accent">{{atttendence[0].total_present/atttendence[0].full_student*100|number:2}}%</strong></h4>
            </div>
            
        </md-toolbar>
        <md-divider ng-if="!$last"></md-divider>
        <div flex  id="collapse{{$index}}" class="collapse">
            <table class="table table-bordered table-striped table-responsive">
                
                <thead>
                    <tr>
                        <th>Class Name</th>
                        <th>Total Students</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Attendence (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="item in atttendence">
                        <td>{{item.class_name}}</td>
                        <td>{{item.total_student}}</td>
                        <td>{{item.present}}</td>
                        <td>{{item.total_student-item.present}}</td>
                        <td>{{item.present/item.total_student*100|number:2}}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
        

        
        
        </div>
        
        <div flex ng-if="irregular_student.length" layout-padding>
        <md-divider ></md-divider>
            <h4 >অনিয়মিত ছাত্র ছাত্রী</h4>
            <md-list >
                <md-list-item ng-repeat="item in irregular_student" class="md-2-line">
                <md-icon ng-class="md-avatar" md-svg-icon="assets/img/accessories/sleeping.svg"></md-icon>
                    <div class="md-list-item-text" layout="column">
                        <h5>{{item.student_name}}</h5>
                        <p>
                            <strong>Class :</strong> {{item.class_name}}<br>
                            <strong>Reason :</strong> {{item.reason}}
                        </p>
                    </div>
                </md-list-item>
            </md-list>
        </div>
            
    </div>
   </md-card>
    

</md-content>
