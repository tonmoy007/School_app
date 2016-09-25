

<div flex-gt-sm layout-padding id="template">
    <div flex ng-repeat="form in form_sub_heading track by $index">
    <md-toolbar layout-padding class="rgba-blue">
            <h4>{{form}}</h4>
        </md-toolbar>
       <less-infrastructure ng-if="$index==0"></less-infrastructure>
        <annual-development ng-if="$index==1"></annual-development>
        <meeting-details ng-if="$index==2"></meeting-details>
        <result-details ng-if="$index==3"></result-details> 
    </div>
    

</div>