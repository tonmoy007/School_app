<section class="">
    <md-content class='md-whiteframe-1dp bg-white' >
        <md-toolbar layout-padding>
            <h4>{{form_heading}}</h4>
        </md-toolbar>
       
        <div flex-gt-sm layout-padding id="template">
            <shikhon-poribesh ng-if="type=='shikhon_poribesh'"></shikhon-poribesh>
            <annual-development ng-if="type=='annual_development'"></annual-development>
            <meeting_details ng-if="type=='meeting_details'"></meeting_details>
            <result-details ng-if="type=='result_details'"></result-details>
        </div>
    </md-content>
</section>