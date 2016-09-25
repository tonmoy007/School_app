<section class="">
    <md-content class='md-whiteframe-1dp bg-white' id="content">
        <md-toolbar layout-padding>
            
            <md-toolbar-tools layout="row">
            <h4>{{form_heading}}</h4>
            <span class="flex"></span>
                <md-button class="md-raised" aria-label="Print reports" ng-click="printDiv('content')">
                    <md-icon md-svg-src="assets/img/accessories/printer-tool.svg"></md-icon> &nbsp; প্রিন্ট করুন
                </md-button>
            </md-toolbar-tools>
        </md-toolbar>
       
        <div flex-gt-sm layout-padding id="template">
            <less-infrastructure ng-if="type=='infrastructure_data'"></less-infrastructure>
            <annual-development ng-if="type=='annual_development'"></annual-development>
            <meeting-details ng-if="type=='meeting_details'"></meeting-details>
            <result-details ng-if="type=='result_details'"></result-details>
            <total-info ng-if="type=='total_details'"></total-info>
        </div>
    </md-content>
</section>