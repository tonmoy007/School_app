<md-content class='md-whiteframe-1dp bg-white' id="content">
        <md-toolbar layout-padding>
            
            <md-toolbar-tools layout="row">
            <h4>{{form_heading}}</h4>
            <!-- <span class="flex"></span>
                <md-button class="md-raised" aria-label="Print reports" ng-click="printDiv('content')">
                    <md-icon md-svg-src="assets/img/accessories/printer-tool.svg"></md-icon> &nbsp; প্রিন্ট করুন
                </md-button> -->
            </md-toolbar-tools>
        </md-toolbar>
       
        <div flex-gt-sm layout-padding id="template">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>প্রশ্ন</th>
                        <th>উত্তর</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="(key,data) in shikhon_poribesh.body track by $index" ng-if="key!='id'&&key!='created'&&key!='last_updated'&&key!='school_id'">
                        <td>{{shikhon_poribesh.head[key]}}</td>
                        <td>{{data}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </md-content>