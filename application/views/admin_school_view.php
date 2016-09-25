<md-content class="md-padding" layout-xs="column" layout="row">
   <md-card flex="100">
    <md-list  ng-cloak>
        <md-subheader class="md-no-sticky"><md-icon class="md-fab md-mini md-primary" flex="25"  md-svg-icon="assets/img/accessories/school.svg"></md-icon>&nbsp;&nbsp;{{school_info.school_name}}</md-subheader>
        <md-list-item flex>
            <span flex="20"><strong>Class Name</strong></span>
            <span flex="20"><strong>Total Students</strong></span>
            <span flex="20"><strong>Present</strong></span>
            <span flex="20"><strong>Absent</strong></span>
            <span flex="20"><strong>Date</strong></span>
        </md-list-item>
        <md-list-item flex ng-repeat="item in school_attendence">
            
                <span flex="20">{{item.class_name}}</span>
                <span flex="20">{{item.total_student}}</span>
                <span flex="20">{{item.present}}</span>
                <span flex="20">{{item.total_student-item.present}}</span>
                <span flex="20">{{item.date}}</span>
            
        </md-list-item>
    </md-list>
   </md-card>
    

</md-content>
