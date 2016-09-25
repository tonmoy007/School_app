
<md-content class="md-padding" layout-xs="column" layout="row">
    
    <all-classes></all-classes>
    <irregular-students></irregular-students>

</md-content>
<div class="alert alert-info text-center" ng-if="classes[0].present">
        Todays Attendence is submitted
    </div>
<div class="alert alert-info text-center" ng-if="!classes[0].present">
    Todays Attendence is not submitted please submit todays attendence
</div>
<side-nav-right></side-nav-right>