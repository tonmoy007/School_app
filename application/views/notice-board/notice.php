

<md-content class='md-whiteframe-1dp bg-white' >
    <md-toolbar class="md-hue-2">
        
        <div class="md-toolbar-tools ">
        <h4>{{form_heading}}</h4>
        <div flex>
            
        </div>
        <add-notice ng-if="user.user_type=='admin'"></add-notice>
        
        </div>

    </md-toolbar>
   
    <div flex-gt-sm layout-padding id="template">
        <notice-lists></notice-lists>
    </div>
</md-content>
